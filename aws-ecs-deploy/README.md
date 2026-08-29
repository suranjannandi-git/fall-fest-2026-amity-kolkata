# ECS Fargate Deployment — QFF App

Deploy the Qiskit Fall Fest app (FastAPI backend + Next.js frontend) to AWS ECS Fargate with:
- **ALB** (Application Load Balancer) as the single public entry point
- **EFS** (Elastic File System) for persistent CSV registration data
- **ECR** (Elastic Container Registry) to store Docker images
- **Secrets Manager** for credentials

---

## Architecture

```
Internet
    │  port 80
    ▼
┌─────────────────────────────────┐
│  Application Load Balancer       │
│  • /api/*, /docs, /health  ───► backend TG  (port 8000)
│  • /*  (default)           ───► frontend TG (port 3000)
└─────────────────────────────────┘
              │
    ┌─────────────────┐
    │  ECS Fargate     │
    │  Task (1 task)   │
    │  ┌────────────┐  │
    │  │  backend   │  │◄── EFS /app/data (registrations.csv)
    │  │  :8000     │  │◄── Secrets Manager (admin creds, JWT key)
    │  └────────────┘  │
    │  ┌────────────┐  │
    │  │  frontend  │  │
    │  │  :3000     │  │
    │  └────────────┘  │
    └─────────────────┘
```

> Both containers run in the **same Fargate task** (sidecar pattern), so the frontend
> can reach the backend at `http://localhost:8000` internally at runtime,
> while the browser uses the ALB URL (built into the frontend image).

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| AWS CLI | ≥ 2.x | [docs.aws.amazon.com/cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| Docker | ≥ 24 | [docs.docker.com](https://docs.docker.com/get-docker/) |
| Python 3 + bcrypt | 3.10+ | `pip install bcrypt` |
| jq (optional) | any | for pretty-printing AWS CLI output |

Authenticate the AWS CLI before starting:

```bash
aws configure
# or
aws sso login
```

Confirm your identity:

```bash
aws sts get-caller-identity
```

---

## Step-by-Step Deployment

### Step 0 — Gather VPC/Subnet Info

You need a **VPC with at least two public subnets** (in different AZs) for the ALB.
To find your default VPC and subnets:

```bash
# Default VPC
aws ec2 describe-vpcs \
  --filters "Name=isDefault,Values=true" \
  --query 'Vpcs[0].VpcId' --output text

# Public subnets in the default VPC (replace vpc-xxxx)
aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=vpc-xxxx" \
  --query 'Subnets[*].[SubnetId,AvailabilityZone,MapPublicIpOnLaunch]' \
  --output table
```

Export them for all scripts to use:

```bash
export AWS_REGION=ap-south-1          # change to your region
export APP_NAME=qff
export VPC_ID=vpc-xxxx
export SUBNET_IDS=subnet-aaa,subnet-bbb   # at least 2 for ALB
```

---

### Step 1 — Create Secrets in AWS Secrets Manager

```bash
cd aws-ecs-deploy
chmod +x secrets-setup.sh
bash secrets-setup.sh
```

You will be prompted for an admin password. The script:
- Hashes the password with bcrypt (same algorithm your app uses)
- Generates a random 64-character JWT secret
- Stores both under `qff/` prefix in Secrets Manager

---

### Step 2 — Create EFS Filesystem

First, run the ALB/ECS security group setup to get the `ECS_SG_ID` (Step 3 below
also outputs this). If this is your first run, create a temporary placeholder SG
or run alb-setup.sh first and come back to update EFS.

> **Recommended order**: Run `alb-setup.sh` first → it outputs `ECS_SG_ID` →
> then run `efs-setup.sh` with that value.

```bash
export ECS_SG_ID=sg-xxxx    # from alb-setup.sh output

chmod +x efs-setup.sh
bash efs-setup.sh
```

Save the output:

```bash
export EFS_ID=fs-xxxx
export ACCESS_POINT_ID=fsap-xxxx
```

---

### Step 3 — Create ALB + Security Groups

```bash
chmod +x alb-setup.sh
bash alb-setup.sh
```

Save the output:

```bash
export ALB_DNS=qff-alb-123456789.ap-south-1.elb.amazonaws.com
export FRONTEND_TG_ARN=arn:aws:elasticloadbalancing:...frontend-tg...
export BACKEND_TG_ARN=arn:aws:elasticloadbalancing:...backend-tg...
export ALB_SG_ID=sg-xxxx
export ECS_SG_ID=sg-yyyy
```

---

### Step 4 — Run the Main Deployment

With all variables exported:

```bash
chmod +x deploy.sh
bash deploy.sh
```

This script will:
1. Log Docker into ECR
2. Create ECR repositories
3. Build & push the **backend** image (linux/amd64)
4. Build & push the **frontend** image — `NEXT_PUBLIC_API_URL` is baked in at build time
5. Create IAM execution + task roles with least-privilege policies
6. Render and register the ECS task definition
7. Create the ECS cluster
8. Create (or update) the ECS service with ALB integration
9. Wait for the service to stabilise

When it completes you will see:

```
======================================================
  Deployment complete!
======================================================

  Frontend : http://<ALB_DNS>
  Backend  : http://<ALB_DNS>/api/v1
  API Docs : http://<ALB_DNS>/docs
```

---

## Re-deploying (after code changes)

Simply re-run `deploy.sh`. It will:
- Build new images with a new tag (`git rev-parse --short HEAD`)
- Register a new task definition revision
- Trigger a rolling deployment (`--force-new-deployment`)

```bash
bash aws-ecs-deploy/deploy.sh
```

---

## Files in this directory

| File | Purpose |
|------|---------|
| `secrets-setup.sh` | Create/rotate secrets in AWS Secrets Manager |
| `efs-setup.sh` | Create EFS filesystem + access point for data persistence |
| `alb-setup.sh` | Create ALB, target groups, listener rules, security groups |
| `deploy.sh` | Main script: build images, push to ECR, register task def, deploy service |
| `ecs-task-definition.json` | Task definition template (placeholders replaced by deploy.sh) |

---

## Environment Variables Reference

### Backend container (set in task definition)

| Variable | Source | Description |
|----------|--------|-------------|
| `ADMIN_USERNAME` | Secrets Manager | Admin login username |
| `ADMIN_PASSWORD_HASH` | Secrets Manager | bcrypt hash of admin password |
| `JWT_SECRET_KEY` | Secrets Manager | JWT signing key |
| `JWT_ALGORITHM` | Task def env | `HS256` |
| `JWT_EXPIRE_MINUTES` | Task def env | Token TTL in minutes |
| `DATA_DIR` | Task def env | `/app/data` (EFS mount point) |
| `CORS_ORIGINS` | Task def env | ALB URL (set automatically by deploy.sh) |

### Frontend image (build-time `--build-arg`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ALB base URL, baked into the Next.js bundle at build time |

> ⚠️ If you change the ALB DNS (e.g., add a custom domain), you must **rebuild and
> redeploy the frontend image** because `NEXT_PUBLIC_API_URL` is a build-time constant.

---

## Cleanup / Teardown

To remove all AWS resources:

```bash
# 1. Delete ECS service (scale to 0 first)
aws ecs update-service --cluster qff-cluster --service qff-service --desired-count 0 --region $AWS_REGION
aws ecs delete-service  --cluster qff-cluster --service qff-service --region $AWS_REGION

# 2. Delete cluster
aws ecs delete-cluster --cluster qff-cluster --region $AWS_REGION

# 3. Delete ALB + target groups
aws elbv2 delete-load-balancer --load-balancer-arn $ALB_ARN --region $AWS_REGION

# 4. Delete EFS
aws efs delete-access-point --access-point-id $ACCESS_POINT_ID --region $AWS_REGION
aws efs delete-file-system  --file-system-id  $EFS_ID          --region $AWS_REGION

# 5. Delete ECR images / repos
aws ecr delete-repository --repository-name qff-backend  --force --region $AWS_REGION
aws ecr delete-repository --repository-name qff-frontend --force --region $AWS_REGION

# 6. Delete secrets
aws secretsmanager delete-secret --secret-id qff/admin_username        --force-delete-without-recovery --region $AWS_REGION
aws secretsmanager delete-secret --secret-id qff/admin_password_hash   --force-delete-without-recovery --region $AWS_REGION
aws secretsmanager delete-secret --secret-id qff/jwt_secret_key        --force-delete-without-recovery --region $AWS_REGION
```

---

## Troubleshooting

### Tasks keep stopping / failing health checks

```bash
# Check service events
aws ecs describe-services \
  --cluster qff-cluster --services qff-service \
  --region $AWS_REGION \
  --query 'services[0].events[:5]'

# View container logs
aws logs tail /ecs/qff/backend  --follow --region $AWS_REGION
aws logs tail /ecs/qff/frontend --follow --region $AWS_REGION
```

### Frontend shows "Network Error" when calling API

- The `NEXT_PUBLIC_API_URL` was likely built with `localhost`. Rebuild with the correct `ALB_DNS`:
  ```bash
  bash aws-ecs-deploy/deploy.sh   # deploy.sh always passes --build-arg NEXT_PUBLIC_API_URL
  ```

### EFS mount fails / container can't write data

- Confirm the EFS mount target exists in the same subnets as the ECS tasks
- Confirm the ECS task security group allows outbound TCP 2049 (NFS) to the EFS SG
- Check the task role has `elasticfilesystem:ClientMount` and `ClientWrite` permissions

### "No space left on device" on EFS

EFS is elastic by default — it scales automatically. This error usually means the access
point path `/data` has wrong permissions. Re-run `efs-setup.sh` to recreate the access point.
