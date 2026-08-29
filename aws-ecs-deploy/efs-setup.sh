#!/usr/bin/env bash
# =============================================================================
# efs-setup.sh
# Creates an EFS filesystem + mount targets for the backend /app/data volume.
# Run this ONCE before deploying. Outputs the EFS_ID to use in deploy.sh.
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# CONFIGURE THESE — must match your VPC/subnet setup
# ---------------------------------------------------------------------------
AWS_REGION="${AWS_REGION:-ap-south-1}"
APP_NAME="${APP_NAME:-qff}"
VPC_ID="${VPC_ID:-}"               # e.g. vpc-0abc123
SUBNET_IDS="${SUBNET_IDS:-}"       # comma-separated, e.g. subnet-aaa,subnet-bbb
ECS_SG_ID="${ECS_SG_ID:-}"         # Security group used by your ECS tasks

# ---------------------------------------------------------------------------
# Validate required inputs
# ---------------------------------------------------------------------------
if [[ -z "$VPC_ID" || -z "$SUBNET_IDS" || -z "$ECS_SG_ID" ]]; then
  echo "ERROR: Set VPC_ID, SUBNET_IDS, and ECS_SG_ID before running."
  echo "  export VPC_ID=vpc-xxxx"
  echo "  export SUBNET_IDS=subnet-aaa,subnet-bbb"
  echo "  export ECS_SG_ID=sg-xxxx"
  exit 1
fi

# ---------------------------------------------------------------------------
# Create a dedicated security group for EFS mount targets
# ---------------------------------------------------------------------------
echo "==> Creating EFS security group..."
EFS_SG_ID=$(aws ec2 create-security-group \
  --group-name "${APP_NAME}-efs-sg" \
  --description "Allow NFS from ECS tasks for ${APP_NAME}" \
  --vpc-id "$VPC_ID" \
  --region "$AWS_REGION" \
  --query 'GroupId' --output text)
echo "    EFS SG: $EFS_SG_ID"

# Allow NFS (port 2049) inbound from ECS task security group
aws ec2 authorize-security-group-ingress \
  --group-id "$EFS_SG_ID" \
  --protocol tcp \
  --port 2049 \
  --source-group "$ECS_SG_ID" \
  --region "$AWS_REGION"

# ---------------------------------------------------------------------------
# Create EFS filesystem
# ---------------------------------------------------------------------------
echo "==> Creating EFS filesystem..."
EFS_ID=$(aws efs create-file-system \
  --creation-token "${APP_NAME}-data-$(date +%s)" \
  --performance-mode generalPurpose \
  --throughput-mode bursting \
  --encrypted \
  --tags Key=Name,Value="${APP_NAME}-data" Key=App,Value="$APP_NAME" \
  --region "$AWS_REGION" \
  --query 'FileSystemId' --output text)
echo "    EFS ID: $EFS_ID"

# Wait for the filesystem to become available
echo "==> Waiting for EFS to become available..."
aws efs wait file-system-available \
  --region "$AWS_REGION" \
  --file-system-id "$EFS_ID" || true
sleep 10

# ---------------------------------------------------------------------------
# Create a mount target in each subnet
# ---------------------------------------------------------------------------
IFS=',' read -ra SUBNETS <<< "$SUBNET_IDS"
for SUBNET in "${SUBNETS[@]}"; do
  SUBNET=$(echo "$SUBNET" | tr -d ' ')
  echo "==> Creating mount target in subnet: $SUBNET"
  aws efs create-mount-target \
    --file-system-id "$EFS_ID" \
    --subnet-id "$SUBNET" \
    --security-groups "$EFS_SG_ID" \
    --region "$AWS_REGION" || echo "    (mount target may already exist)"
done

# ---------------------------------------------------------------------------
# Create an EFS Access Point scoped to /data
# ---------------------------------------------------------------------------
echo "==> Creating EFS access point..."
ACCESS_POINT_ID=$(aws efs create-access-point \
  --file-system-id "$EFS_ID" \
  --posix-user Uid=1000,Gid=1000 \
  --root-directory "Path=/data,CreationInfo={OwnerUid=1000,OwnerGid=1000,Permissions=755}" \
  --tags Key=Name,Value="${APP_NAME}-data-ap" \
  --region "$AWS_REGION" \
  --query 'AccessPointId' --output text)
echo "    Access Point ID: $ACCESS_POINT_ID"

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
echo ""
echo "======================================================"
echo "  EFS setup complete. Save these values:"
echo "======================================================"
echo "  EFS_ID=$EFS_ID"
echo "  ACCESS_POINT_ID=$ACCESS_POINT_ID"
echo "  EFS_SG_ID=$EFS_SG_ID"
echo ""
echo "  Set them as env vars before running deploy.sh:"
echo "  export EFS_ID=$EFS_ID"
echo "  export ACCESS_POINT_ID=$ACCESS_POINT_ID"
echo "======================================================"
