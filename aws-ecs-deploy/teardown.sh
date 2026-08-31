#!/usr/bin/env bash
# =============================================================================
# teardown.sh
# Deletes ALL AWS resources created by secrets-setup.sh, efs-setup.sh,
# alb-setup.sh, and deploy.sh for the QFF app.
#
# Usage:
#   export AWS_REGION=ap-south-1
#   export VPC_ID=vpc-xxxx          # needed to look up security groups by VPC
#   bash teardown.sh
#
# All deletions are best-effort: each block prints a warning on failure and
# continues, so the script cleans up as much as possible even if a resource
# was already deleted or never created.
# =============================================================================
set -uo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
APP_NAME="${APP_NAME:-qff}"
CLUSTER_NAME="${CLUSTER_NAME:-${APP_NAME}-cluster}"

echo ""
echo "======================================================"
echo "  QFF Teardown — region: $AWS_REGION"
echo "======================================================"

# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------
warn() { echo "    [WARN] $*"; }

# ---------------------------------------------------------------------------
# Step 1: Scale down and delete ECS service
# ---------------------------------------------------------------------------
echo ""
echo "==> [1/9] Deleting ECS service..."
SERVICE_STATUS=$(aws ecs describe-services \
  --cluster "$CLUSTER_NAME" \
  --services "${APP_NAME}-service" \
  --region "$AWS_REGION" \
  --query 'services[0].status' --output text 2>/dev/null || echo "MISSING")

if [[ "$SERVICE_STATUS" == "ACTIVE" ]]; then
  aws ecs update-service \
    --cluster "$CLUSTER_NAME" \
    --service "${APP_NAME}-service" \
    --desired-count 0 \
    --region "$AWS_REGION" > /dev/null
  echo "    Scaled service to 0. Waiting for tasks to drain..."
  aws ecs wait services-stable \
    --cluster "$CLUSTER_NAME" \
    --services "${APP_NAME}-service" \
    --region "$AWS_REGION" || warn "Wait timed out; proceeding anyway."
  aws ecs delete-service \
    --cluster "$CLUSTER_NAME" \
    --service "${APP_NAME}-service" \
    --force \
    --region "$AWS_REGION" > /dev/null
  echo "    Deleted service: ${APP_NAME}-service"
else
  echo "    Service not found or already deleted."
fi

# ---------------------------------------------------------------------------
# Step 2: Delete ECS cluster
# ---------------------------------------------------------------------------
echo ""
echo "==> [2/9] Deleting ECS cluster..."
aws ecs delete-cluster \
  --cluster "$CLUSTER_NAME" \
  --region "$AWS_REGION" > /dev/null 2>&1 \
  && echo "    Deleted cluster: $CLUSTER_NAME" \
  || warn "Cluster $CLUSTER_NAME not found or already deleted."

# ---------------------------------------------------------------------------
# Step 3: Deregister all ECS task definition revisions
# ---------------------------------------------------------------------------
echo ""
echo "==> [3/9] Deregistering ECS task definitions..."
TASK_DEF_ARNS=$(aws ecs list-task-definitions \
  --family-prefix "${APP_NAME}" \
  --region "$AWS_REGION" \
  --query 'taskDefinitionArns[]' --output text 2>/dev/null || true)

if [[ -n "$TASK_DEF_ARNS" ]]; then
  for ARN in $TASK_DEF_ARNS; do
    aws ecs deregister-task-definition \
      --task-definition "$ARN" \
      --region "$AWS_REGION" > /dev/null \
      && echo "    Deregistered: $ARN" \
      || warn "Failed to deregister $ARN"
  done
else
  echo "    No task definitions found."
fi

# ---------------------------------------------------------------------------
# Step 4: Delete ECR repositories (and all images)
# ---------------------------------------------------------------------------
echo ""
echo "==> [4/9] Deleting ECR repositories..."
for REPO_NAME in "${APP_NAME}-backend" "${APP_NAME}-frontend"; do
  aws ecr delete-repository \
    --repository-name "$REPO_NAME" \
    --force \
    --region "$AWS_REGION" > /dev/null 2>&1 \
    && echo "    Deleted ECR repo: $REPO_NAME" \
    || warn "ECR repo $REPO_NAME not found or already deleted."
done

# ---------------------------------------------------------------------------
# Step 5: Delete IAM roles
# ---------------------------------------------------------------------------
echo ""
echo "==> [5/9] Deleting IAM roles..."

# Execution role
EXEC_ROLE_NAME="${APP_NAME}-ecs-execution-role"
if aws iam get-role --role-name "$EXEC_ROLE_NAME" > /dev/null 2>&1; then
  # Detach managed policies
  MANAGED=$(aws iam list-attached-role-policies \
    --role-name "$EXEC_ROLE_NAME" \
    --query 'AttachedPolicies[].PolicyArn' --output text 2>/dev/null || true)
  for POLICY_ARN in $MANAGED; do
    aws iam detach-role-policy \
      --role-name "$EXEC_ROLE_NAME" \
      --policy-arn "$POLICY_ARN" > /dev/null
  done
  # Delete inline policies
  INLINE=$(aws iam list-role-policies \
    --role-name "$EXEC_ROLE_NAME" \
    --query 'PolicyNames[]' --output text 2>/dev/null || true)
  for POLICY_NAME in $INLINE; do
    aws iam delete-role-policy \
      --role-name "$EXEC_ROLE_NAME" \
      --policy-name "$POLICY_NAME" > /dev/null
  done
  aws iam delete-role --role-name "$EXEC_ROLE_NAME" > /dev/null
  echo "    Deleted IAM role: $EXEC_ROLE_NAME"
else
  echo "    Role $EXEC_ROLE_NAME not found."
fi

# Task role
TASK_ROLE_NAME="${APP_NAME}-ecs-task-role"
if aws iam get-role --role-name "$TASK_ROLE_NAME" > /dev/null 2>&1; then
  INLINE=$(aws iam list-role-policies \
    --role-name "$TASK_ROLE_NAME" \
    --query 'PolicyNames[]' --output text 2>/dev/null || true)
  for POLICY_NAME in $INLINE; do
    aws iam delete-role-policy \
      --role-name "$TASK_ROLE_NAME" \
      --policy-name "$POLICY_NAME" > /dev/null
  done
  aws iam delete-role --role-name "$TASK_ROLE_NAME" > /dev/null
  echo "    Deleted IAM role: $TASK_ROLE_NAME"
else
  echo "    Role $TASK_ROLE_NAME not found."
fi

# ---------------------------------------------------------------------------
# Step 6: Delete ALB, listeners, and target groups
# ---------------------------------------------------------------------------
echo ""
echo "==> [6/9] Deleting ALB, listeners, and target groups..."
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names "${APP_NAME}-alb" \
  --region "$AWS_REGION" \
  --query 'LoadBalancers[0].LoadBalancerArn' --output text 2>/dev/null || true)

if [[ -n "$ALB_ARN" && "$ALB_ARN" != "None" ]]; then
  # Delete all listeners (which deletes their rules too)
  LISTENER_ARNS=$(aws elbv2 describe-listeners \
    --load-balancer-arn "$ALB_ARN" \
    --region "$AWS_REGION" \
    --query 'Listeners[].ListenerArn' --output text 2>/dev/null || true)
  for L_ARN in $LISTENER_ARNS; do
    aws elbv2 delete-listener --listener-arn "$L_ARN" --region "$AWS_REGION" > /dev/null
    echo "    Deleted listener: $L_ARN"
  done
  aws elbv2 delete-load-balancer \
    --load-balancer-arn "$ALB_ARN" \
    --region "$AWS_REGION" > /dev/null
  echo "    Deleted ALB: $ALB_ARN"
  echo "    Waiting for ALB to be deleted..."
  aws elbv2 wait load-balancers-deleted \
    --load-balancer-arns "$ALB_ARN" \
    --region "$AWS_REGION" || warn "Wait timed out."
else
  echo "    ALB ${APP_NAME}-alb not found."
fi

for TG_NAME in "${APP_NAME}-frontend-tg" "${APP_NAME}-backend-tg"; do
  TG_ARN=$(aws elbv2 describe-target-groups \
    --names "$TG_NAME" \
    --region "$AWS_REGION" \
    --query 'TargetGroups[0].TargetGroupArn' --output text 2>/dev/null || true)
  if [[ -n "$TG_ARN" && "$TG_ARN" != "None" ]]; then
    aws elbv2 delete-target-group \
      --target-group-arn "$TG_ARN" \
      --region "$AWS_REGION" > /dev/null
    echo "    Deleted target group: $TG_NAME"
  else
    warn "Target group $TG_NAME not found."
  fi
done

# ---------------------------------------------------------------------------
# Step 7: Delete EFS access points, mount targets, and filesystem
# ---------------------------------------------------------------------------
echo ""
echo "==> [7/9] Deleting EFS resources..."
EFS_ID=$(aws efs describe-file-systems \
  --region "$AWS_REGION" \
  --query "FileSystems[?Tags[?Key=='App' && Value=='${APP_NAME}']].FileSystemId | [0]" \
  --output text 2>/dev/null || true)

if [[ -n "$EFS_ID" && "$EFS_ID" != "None" ]]; then
  # Delete access points
  ACCESS_POINT_IDS=$(aws efs describe-access-points \
    --file-system-id "$EFS_ID" \
    --region "$AWS_REGION" \
    --query 'AccessPoints[].AccessPointId' --output text 2>/dev/null || true)
  for AP_ID in $ACCESS_POINT_IDS; do
    aws efs delete-access-point \
      --access-point-id "$AP_ID" \
      --region "$AWS_REGION" > /dev/null
    echo "    Deleted EFS access point: $AP_ID"
  done

  # Delete mount targets
  MT_IDS=$(aws efs describe-mount-targets \
    --file-system-id "$EFS_ID" \
    --region "$AWS_REGION" \
    --query 'MountTargets[].MountTargetId' --output text 2>/dev/null || true)
  for MT_ID in $MT_IDS; do
    aws efs delete-mount-target \
      --mount-target-id "$MT_ID" \
      --region "$AWS_REGION" > /dev/null
    echo "    Deleted mount target: $MT_ID"
  done

  # Wait for mount targets to be deleted before deleting the filesystem
  echo "    Waiting for mount targets to be deleted..."
  sleep 30

  aws efs delete-file-system \
    --file-system-id "$EFS_ID" \
    --region "$AWS_REGION" > /dev/null
  echo "    Deleted EFS filesystem: $EFS_ID"
else
  echo "    No EFS filesystem found for app: $APP_NAME"
fi

# ---------------------------------------------------------------------------
# Step 8: Delete Security Groups (ALB SG, ECS SG, EFS SG)
# ---------------------------------------------------------------------------
echo ""
echo "==> [8/9] Deleting security groups..."
for SG_NAME in "${APP_NAME}-alb-sg" "${APP_NAME}-ecs-sg" "${APP_NAME}-efs-sg"; do
  SG_ID=$(aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=${SG_NAME}" \
    --region "$AWS_REGION" \
    --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || true)
  if [[ -n "$SG_ID" && "$SG_ID" != "None" ]]; then
    # Remove all inbound rules first (required if rules reference other SGs)
    RULES=$(aws ec2 describe-security-groups \
      --group-ids "$SG_ID" \
      --region "$AWS_REGION" \
      --query 'SecurityGroups[0].IpPermissions' --output json 2>/dev/null || echo "[]")
    if [[ "$RULES" != "[]" && "$RULES" != "null" ]]; then
      aws ec2 revoke-security-group-ingress \
        --group-id "$SG_ID" \
        --ip-permissions "$RULES" \
        --region "$AWS_REGION" > /dev/null 2>&1 || true
    fi
    aws ec2 delete-security-group \
      --group-id "$SG_ID" \
      --region "$AWS_REGION" > /dev/null 2>&1 \
      && echo "    Deleted security group: $SG_NAME ($SG_ID)" \
      || warn "Could not delete $SG_NAME — may still have dependencies."
  else
    echo "    Security group $SG_NAME not found."
  fi
done

# ---------------------------------------------------------------------------
# Step 9: Delete Secrets Manager secrets
# ---------------------------------------------------------------------------
echo ""
echo "==> [9/9] Deleting Secrets Manager secrets..."
for SECRET_NAME in \
  "${APP_NAME}/admin_username" \
  "${APP_NAME}/admin_password_hash" \
  "${APP_NAME}/jwt_secret_key"; do
  aws secretsmanager delete-secret \
    --secret-id "$SECRET_NAME" \
    --force-delete-without-recovery \
    --region "$AWS_REGION" > /dev/null 2>&1 \
    && echo "    Deleted secret: $SECRET_NAME" \
    || warn "Secret $SECRET_NAME not found or already deleted."
done

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
echo "======================================================"
echo "  Teardown complete for app: $APP_NAME"
echo "======================================================"
echo ""
echo "  NOTE: CloudWatch log groups are retained by default."
echo "  To delete them manually:"
echo "    aws logs delete-log-group --log-group-name /ecs/${APP_NAME} --region $AWS_REGION"
echo ""
