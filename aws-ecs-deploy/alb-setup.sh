#!/usr/bin/env bash
# =============================================================================
# alb-setup.sh
# Creates an Application Load Balancer with two target groups:
#   - Frontend (port 3000) — default rule on port 80
#   - Backend  (port 8000) — path-prefix /api/* and /docs /health
# Run this ONCE before deploy.sh. Outputs ALB_ARN, ALB_DNS, TG ARNs.
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# CONFIGURE THESE
# ---------------------------------------------------------------------------
AWS_REGION="${AWS_REGION:-ap-south-1}"
APP_NAME="${APP_NAME:-qff}"
VPC_ID="${VPC_ID:-}"
SUBNET_IDS="${SUBNET_IDS:-}"       # public subnets, comma-separated

# ---------------------------------------------------------------------------
# Validate
# ---------------------------------------------------------------------------
if [[ -z "$VPC_ID" || -z "$SUBNET_IDS" ]]; then
  echo "ERROR: Set VPC_ID and SUBNET_IDS before running."
  exit 1
fi

IFS=',' read -ra SUBNET_ARRAY <<< "$SUBNET_IDS"

# ---------------------------------------------------------------------------
# Security group for ALB (public HTTP/HTTPS)
# ---------------------------------------------------------------------------
echo "==> Creating ALB security group..."
ALB_SG_ID=$(aws ec2 create-security-group \
  --group-name "${APP_NAME}-alb-sg" \
  --description "Public HTTP/HTTPS for ${APP_NAME} ALB" \
  --vpc-id "$VPC_ID" \
  --region "$AWS_REGION" \
  --query 'GroupId' --output text)
echo "    ALB SG: $ALB_SG_ID"

aws ec2 authorize-security-group-ingress \
  --group-id "$ALB_SG_ID" \
  --protocol tcp --port 80 \
  --cidr 0.0.0.0/0 \
  --region "$AWS_REGION"

aws ec2 authorize-security-group-ingress \
  --group-id "$ALB_SG_ID" \
  --protocol tcp --port 443 \
  --cidr 0.0.0.0/0 \
  --region "$AWS_REGION"

# ---------------------------------------------------------------------------
# Security group for ECS tasks (accepts traffic only from ALB)
# ---------------------------------------------------------------------------
echo "==> Creating ECS tasks security group..."
ECS_SG_ID=$(aws ec2 create-security-group \
  --group-name "${APP_NAME}-ecs-sg" \
  --description "ECS tasks for ${APP_NAME}" \
  --vpc-id "$VPC_ID" \
  --region "$AWS_REGION" \
  --query 'GroupId' --output text)
echo "    ECS SG: $ECS_SG_ID"

# Allow frontend port from ALB
aws ec2 authorize-security-group-ingress \
  --group-id "$ECS_SG_ID" \
  --protocol tcp --port 3000 \
  --source-group "$ALB_SG_ID" \
  --region "$AWS_REGION"

# Allow backend port from ALB
aws ec2 authorize-security-group-ingress \
  --group-id "$ECS_SG_ID" \
  --protocol tcp --port 8000 \
  --source-group "$ALB_SG_ID" \
  --region "$AWS_REGION"

# Allow backend port from within VPC (frontend container → backend container via ALB internal DNS)
aws ec2 authorize-security-group-ingress \
  --group-id "$ECS_SG_ID" \
  --protocol tcp --port 8000 \
  --source-group "$ECS_SG_ID" \
  --region "$AWS_REGION"

# ---------------------------------------------------------------------------
# Create ALB
# ---------------------------------------------------------------------------
echo "==> Creating Application Load Balancer..."
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name "${APP_NAME}-alb" \
  --subnets "${SUBNET_ARRAY[@]}" \
  --security-groups "$ALB_SG_ID" \
  --scheme internet-facing \
  --type application \
  --ip-address-type ipv4 \
  --tags Key=App,Value="$APP_NAME" \
  --region "$AWS_REGION" \
  --query 'LoadBalancers[0].LoadBalancerArn' --output text)
echo "    ALB ARN: $ALB_ARN"

ALB_DNS=$(aws elbv2 describe-load-balancers \
  --load-balancer-arns "$ALB_ARN" \
  --region "$AWS_REGION" \
  --query 'LoadBalancers[0].DNSName' --output text)
echo "    ALB DNS: $ALB_DNS"

# ---------------------------------------------------------------------------
# Target groups
# ---------------------------------------------------------------------------
echo "==> Creating frontend target group (port 3000)..."
FRONTEND_TG_ARN=$(aws elbv2 create-target-group \
  --name "${APP_NAME}-frontend-tg" \
  --protocol HTTP \
  --port 3000 \
  --vpc-id "$VPC_ID" \
  --target-type ip \
  --health-check-protocol HTTP \
  --health-check-path "/" \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 10 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3 \
  --region "$AWS_REGION" \
  --query 'TargetGroups[0].TargetGroupArn' --output text)
echo "    Frontend TG: $FRONTEND_TG_ARN"

echo "==> Creating backend target group (port 8000)..."
BACKEND_TG_ARN=$(aws elbv2 create-target-group \
  --name "${APP_NAME}-backend-tg" \
  --protocol HTTP \
  --port 8000 \
  --vpc-id "$VPC_ID" \
  --target-type ip \
  --health-check-protocol HTTP \
  --health-check-path "/health" \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 10 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3 \
  --region "$AWS_REGION" \
  --query 'TargetGroups[0].TargetGroupArn' --output text)
echo "    Backend TG: $BACKEND_TG_ARN"

# ---------------------------------------------------------------------------
# Listener on port 80
# Default: forward to frontend
# Rule: /api/*, /docs, /health, /openapi.json → forward to backend
# ---------------------------------------------------------------------------
echo "==> Creating HTTP listener (port 80)..."
LISTENER_ARN=$(aws elbv2 create-listener \
  --load-balancer-arn "$ALB_ARN" \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn="$FRONTEND_TG_ARN" \
  --region "$AWS_REGION" \
  --query 'Listeners[0].ListenerArn' --output text)
echo "    Listener ARN: $LISTENER_ARN"

echo "==> Adding backend routing rules..."
# Route /api/* to backend
aws elbv2 create-rule \
  --listener-arn "$LISTENER_ARN" \
  --priority 10 \
  --conditions '[{"Field":"path-pattern","Values":["/api/*"]}]' \
  --actions "Type=forward,TargetGroupArn=${BACKEND_TG_ARN}" \
  --region "$AWS_REGION"

# Route /docs, /health, /openapi.json to backend
aws elbv2 create-rule \
  --listener-arn "$LISTENER_ARN" \
  --priority 20 \
  --conditions '[{"Field":"path-pattern","Values":["/docs","/health","/openapi.json","/redoc"]}]' \
  --actions "Type=forward,TargetGroupArn=${BACKEND_TG_ARN}" \
  --region "$AWS_REGION"

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
echo ""
echo "======================================================"
echo "  ALB setup complete. Save these values:"
echo "======================================================"
echo "  ALB_ARN=$ALB_ARN"
echo "  ALB_DNS=$ALB_DNS"
echo "  FRONTEND_TG_ARN=$FRONTEND_TG_ARN"
echo "  BACKEND_TG_ARN=$BACKEND_TG_ARN"
echo "  ALB_SG_ID=$ALB_SG_ID"
echo "  ECS_SG_ID=$ECS_SG_ID"
echo ""
echo "  Set them as env vars before running deploy.sh:"
echo "  export ALB_DNS=$ALB_DNS"
echo "  export FRONTEND_TG_ARN=$FRONTEND_TG_ARN"
echo "  export BACKEND_TG_ARN=$BACKEND_TG_ARN"
echo "  export ALB_SG_ID=$ALB_SG_ID"
echo "  export ECS_SG_ID=$ECS_SG_ID"
echo "======================================================"
