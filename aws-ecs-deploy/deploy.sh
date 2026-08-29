#!/usr/bin/env bash
# =============================================================================
# deploy.sh
# Full ECS Fargate deployment for the QFF app.
# Prerequisites (run once in order before this script):
#   1. secrets-setup.sh
#   2. efs-setup.sh      → provides EFS_ID, ACCESS_POINT_ID
#   3. alb-setup.sh      → provides ALB_DNS, FRONTEND_TG_ARN, BACKEND_TG_ARN,
#                          ALB_SG_ID, ECS_SG_ID
#
# Usage:
#   export AWS_REGION=ap-south-1
#   export VPC_ID=vpc-xxxx
#   export SUBNET_IDS=subnet-aaa,subnet-bbb
#   export EFS_ID=fs-xxxx
#   export ACCESS_POINT_ID=fsap-xxxx
#   export ALB_DNS=qff-alb-123456.ap-south-1.elb.amazonaws.com
#   export FRONTEND_TG_ARN=arn:aws:elasticloadbalancing:...
#   export BACKEND_TG_ARN=arn:aws:elasticloadbalancing:...
#   export ECS_SG_ID=sg-xxxx
#   bash deploy.sh
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# CONFIGURE THESE (or export before calling the script)
# ---------------------------------------------------------------------------
AWS_REGION="${AWS_REGION:-ap-south-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
APP_NAME="${APP_NAME:-qff}"
CLUSTER_NAME="${CLUSTER_NAME:-${APP_NAME}-cluster}"

# Networking (set by alb-setup.sh / efs-setup.sh)
VPC_ID="${VPC_ID:-}"
SUBNET_IDS="${SUBNET_IDS:-}"
ECS_SG_ID="${ECS_SG_ID:-}"
EFS_ID="${EFS_ID:-}"
ACCESS_POINT_ID="${ACCESS_POINT_ID:-}"
ALB_DNS="${ALB_DNS:-}"
FRONTEND_TG_ARN="${FRONTEND_TG_ARN:-}"
BACKEND_TG_ARN="${BACKEND_TG_ARN:-}"

# Image tags
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || echo latest)}"

# ---------------------------------------------------------------------------
# Validate required inputs
# ---------------------------------------------------------------------------
REQUIRED_VARS=(VPC_ID SUBNET_IDS ECS_SG_ID EFS_ID ACCESS_POINT_ID ALB_DNS FRONTEND_TG_ARN BACKEND_TG_ARN)
for VAR in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!VAR:-}" ]]; then
    echo "ERROR: Required variable $VAR is not set."
    echo "       Run efs-setup.sh and alb-setup.sh first, then export their outputs."
    exit 1
  fi
done

ECR_BASE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
BACKEND_REPO="${ECR_BASE}/${APP_NAME}-backend"
FRONTEND_REPO="${ECR_BASE}/${APP_NAME}-frontend"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# ---------------------------------------------------------------------------
# Step 1: Authenticate Docker to ECR
# ---------------------------------------------------------------------------
echo ""
echo "==> [1/9] Authenticating Docker to ECR..."
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$ECR_BASE"

# ---------------------------------------------------------------------------
# Step 2: Create ECR repositories (idempotent)
# ---------------------------------------------------------------------------
echo ""
echo "==> [2/9] Creating ECR repositories (if not exist)..."
for REPO_NAME in "${APP_NAME}-backend" "${APP_NAME}-frontend"; do
  aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$AWS_REGION" &>/dev/null \
    || aws ecr create-repository \
         --repository-name "$REPO_NAME" \
         --image-scanning-configuration scanOnPush=true \
         --region "$AWS_REGION"
  echo "    $REPO_NAME — ready"
done

# ---------------------------------------------------------------------------
# Step 3: Build and push backend image
# ---------------------------------------------------------------------------
echo ""
echo "==> [3/9] Building and pushing backend image..."
docker build \
  --platform linux/amd64 \
  -t "${BACKEND_REPO}:${IMAGE_TAG}" \
  -t "${BACKEND_REPO}:latest" \
  "${REPO_ROOT}/backend"

docker push "${BACKEND_REPO}:${IMAGE_TAG}"
docker push "${BACKEND_REPO}:latest"
echo "    Pushed: ${BACKEND_REPO}:${IMAGE_TAG}"

# ---------------------------------------------------------------------------
# Step 4: Build and push frontend image
# NEXT_PUBLIC_API_URL is a build-time env var — must point to the ALB DNS
# ---------------------------------------------------------------------------
echo ""
echo "==> [4/9] Building and pushing frontend image..."
echo "    NEXT_PUBLIC_API_URL=http://${ALB_DNS}"

docker build \
  --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_API_URL="http://${ALB_DNS}" \
  -t "${FRONTEND_REPO}:${IMAGE_TAG}" \
  -t "${FRONTEND_REPO}:latest" \
  "${REPO_ROOT}/frontend"

docker push "${FRONTEND_REPO}:${IMAGE_TAG}"
docker push "${FRONTEND_REPO}:latest"
echo "    Pushed: ${FRONTEND_REPO}:${IMAGE_TAG}"

# ---------------------------------------------------------------------------
# Step 5: Create IAM roles for ECS
# ---------------------------------------------------------------------------
echo ""
echo "==> [5/9] Setting up IAM roles..."

# -- Execution Role (allows ECS to pull images and read secrets) --
EXEC_ROLE_NAME="${APP_NAME}-ecs-execution-role"
EXEC_ROLE_ARN=$(aws iam get-role --role-name "$EXEC_ROLE_NAME" \
  --query 'Role.Arn' --output text 2>/dev/null || true)

if [[ -z "$EXEC_ROLE_ARN" ]]; then
  EXEC_ROLE_ARN=$(aws iam create-role \
    --role-name "$EXEC_ROLE_NAME" \
    --assume-role-policy-document '{
      "Version":"2012-10-17",
      "Statement":[{
        "Effect":"Allow",
        "Principal":{"Service":"ecs-tasks.amazonaws.com"},
        "Action":"sts:AssumeRole"
      }]
    }' \
    --query 'Role.Arn' --output text)
  aws iam attach-role-policy \
    --role-name "$EXEC_ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  # Allow reading Secrets Manager secrets
  aws iam put-role-policy \
    --role-name "$EXEC_ROLE_NAME" \
    --policy-name "SecretsAccess" \
    --policy-document "{
      \"Version\":\"2012-10-17\",
      \"Statement\":[{
        \"Effect\":\"Allow\",
        \"Action\":[\"secretsmanager:GetSecretValue\"],
        \"Resource\":\"arn:aws:secretsmanager:${AWS_REGION}:${AWS_ACCOUNT_ID}:secret:${APP_NAME}/*\"
      }]
    }"
  echo "    Created execution role: $EXEC_ROLE_ARN"
else
  echo "    Using existing execution role: $EXEC_ROLE_ARN"
fi

# -- Task Role (allows the running container to access EFS) --
TASK_ROLE_NAME="${APP_NAME}-ecs-task-role"
TASK_ROLE_ARN=$(aws iam get-role --role-name "$TASK_ROLE_NAME" \
  --query 'Role.Arn' --output text 2>/dev/null || true)

if [[ -z "$TASK_ROLE_ARN" ]]; then
  TASK_ROLE_ARN=$(aws iam create-role \
    --role-name "$TASK_ROLE_NAME" \
    --assume-role-policy-document '{
      "Version":"2012-10-17",
      "Statement":[{
        "Effect":"Allow",
        "Principal":{"Service":"ecs-tasks.amazonaws.com"},
        "Action":"sts:AssumeRole"
      }]
    }' \
    --query 'Role.Arn' --output text)
  aws iam put-role-policy \
    --role-name "$TASK_ROLE_NAME" \
    --policy-name "EFSAccess" \
    --policy-document "{
      \"Version\":\"2012-10-17\",
      \"Statement\":[{
        \"Effect\":\"Allow\",
        \"Action\":[
          \"elasticfilesystem:ClientMount\",
          \"elasticfilesystem:ClientWrite\",
          \"elasticfilesystem:DescribeMountTargets\"
        ],
        \"Resource\":\"arn:aws:elasticfilesystem:${AWS_REGION}:${AWS_ACCOUNT_ID}:file-system/${EFS_ID}\"
      }]
    }"
  echo "    Created task role: $TASK_ROLE_ARN"
else
  echo "    Using existing task role: $TASK_ROLE_ARN"
fi

# ---------------------------------------------------------------------------
# Step 6: Render and register ECS task definition
# ---------------------------------------------------------------------------
echo ""
echo "==> [6/9] Registering ECS task definition..."

# Resolve Secrets Manager ARN prefix
SECRET_BASE_ARN="arn:aws:secretsmanager:${AWS_REGION}:${AWS_ACCOUNT_ID}:secret:${APP_NAME}"

sed \
  -e "s|EXECUTION_ROLE_ARN_PLACEHOLDER|${EXEC_ROLE_ARN}|g" \
  -e "s|TASK_ROLE_ARN_PLACEHOLDER|${TASK_ROLE_ARN}|g" \
  -e "s|EFS_ID_PLACEHOLDER|${EFS_ID}|g" \
  -e "s|ACCESS_POINT_ID_PLACEHOLDER|${ACCESS_POINT_ID}|g" \
  -e "s|BACKEND_IMAGE_URI_PLACEHOLDER|${BACKEND_REPO}:${IMAGE_TAG}|g" \
  -e "s|FRONTEND_IMAGE_URI_PLACEHOLDER|${FRONTEND_REPO}:${IMAGE_TAG}|g" \
  -e "s|ALB_URL_PLACEHOLDER|http://${ALB_DNS}|g" \
  -e "s|SECRETS_ARN_PLACEHOLDER|${SECRET_BASE_ARN}|g" \
  -e "s|AWS_REGION_PLACEHOLDER|${AWS_REGION}|g" \
  "${SCRIPT_DIR}/ecs-task-definition.json" > /tmp/qff-task-def-rendered.json

TASK_DEF_ARN=$(aws ecs register-task-definition \
  --cli-input-json file:///tmp/qff-task-def-rendered.json \
  --region "$AWS_REGION" \
  --query 'taskDefinition.taskDefinitionArn' --output text)
echo "    Task definition: $TASK_DEF_ARN"

# ---------------------------------------------------------------------------
# Step 7: Create ECS cluster
# ---------------------------------------------------------------------------
echo ""
echo "==> [7/9] Creating ECS cluster (if not exists)..."
aws ecs create-cluster \
  --cluster-name "$CLUSTER_NAME" \
  --capacity-providers FARGATE FARGATE_SPOT \
  --region "$AWS_REGION" \
  --tags key=App,value="$APP_NAME" \
  2>/dev/null || true
echo "    Cluster: $CLUSTER_NAME"

# ---------------------------------------------------------------------------
# Step 8: Create or update ECS service
# ---------------------------------------------------------------------------
echo ""
echo "==> [8/9] Creating / updating ECS service..."
IFS=',' read -ra SUBNET_ARRAY <<< "$SUBNET_IDS"
SUBNET_LIST=$(printf '"%s",' "${SUBNET_ARRAY[@]}")
SUBNET_LIST="[${SUBNET_LIST%,}]"

SERVICE_EXISTS=$(aws ecs describe-services \
  --cluster "$CLUSTER_NAME" \
  --services "${APP_NAME}-service" \
  --region "$AWS_REGION" \
  --query 'services[0].status' --output text 2>/dev/null || echo "MISSING")

NETWORK_CONFIG="{
  \"awsvpcConfiguration\": {
    \"subnets\": ${SUBNET_LIST},
    \"securityGroups\": [\"${ECS_SG_ID}\"],
    \"assignPublicIp\": \"ENABLED\"
  }
}"

if [[ "$SERVICE_EXISTS" == "ACTIVE" ]]; then
  echo "    Updating existing service..."
  aws ecs update-service \
    --cluster "$CLUSTER_NAME" \
    --service "${APP_NAME}-service" \
    --task-definition "$TASK_DEF_ARN" \
    --force-new-deployment \
    --region "$AWS_REGION"
else
  echo "    Creating new service..."
  aws ecs create-service \
    --cluster "$CLUSTER_NAME" \
    --service-name "${APP_NAME}-service" \
    --task-definition "$TASK_DEF_ARN" \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "$NETWORK_CONFIG" \
    --load-balancers \
      "targetGroupArn=${FRONTEND_TG_ARN},containerName=frontend,containerPort=3000" \
      "targetGroupArn=${BACKEND_TG_ARN},containerName=backend,containerPort=8000" \
    --health-check-grace-period-seconds 120 \
    --region "$AWS_REGION" \
    --tags key=App,value="$APP_NAME"
fi

# ---------------------------------------------------------------------------
# Step 9: Wait for service to stabilise
# ---------------------------------------------------------------------------
echo ""
echo "==> [9/9] Waiting for ECS service to stabilise (this takes ~3-5 min)..."
aws ecs wait services-stable \
  --cluster "$CLUSTER_NAME" \
  --services "${APP_NAME}-service" \
  --region "$AWS_REGION"

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
echo ""
echo "======================================================"
echo "  Deployment complete!"
echo "======================================================"
echo ""
echo "  Frontend : http://${ALB_DNS}"
echo "  Backend  : http://${ALB_DNS}/api/v1"
echo "  API Docs : http://${ALB_DNS}/docs"
echo ""
echo "  ECS Cluster  : $CLUSTER_NAME"
echo "  Task Def     : $TASK_DEF_ARN"
echo "  Image Tag    : $IMAGE_TAG"
echo "======================================================"
