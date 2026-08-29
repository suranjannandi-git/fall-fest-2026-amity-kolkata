# Deployment Report — Qiskit Fall Fest 2026 (Amity Kolkata)

**Deployed on:** 2026-08-29  
**Deployed by:** suranjan (IAM user `arn:aws:iam::085391664415:user/suranjan`)  
**AWS Account:** `085391664415`  
**Region:** `ap-south-1` (Mumbai)

---

## 🌐 Live URLs

| Service | URL | Status |
|---|---|---|
| **Frontend** | http://qff-alb-839920049.ap-south-1.elb.amazonaws.com | ✅ HTTP 200 |
| **Backend API** | http://qff-alb-839920049.ap-south-1.elb.amazonaws.com/api/v1 | ✅ Healthy |
| **API Health** | http://qff-alb-839920049.ap-south-1.elb.amazonaws.com/health | ✅ `{"status":"ok"}` |
| **API Docs** | http://qff-alb-839920049.ap-south-1.elb.amazonaws.com/docs | ✅ Accessible |

**Admin credentials:**
- Username: `admin`
- Password: ``

> ⚠️ **Keep this file private** — do not commit to a public repository.

---

## 🏗️ Infrastructure Summary

### ECS

| Resource | Value |
|---|---|
| Cluster | `qff-cluster` |
| Service | `qff-service` |
| Task Definition | `qff-app:1` |
| Launch Type | Fargate |
| CPU Architecture | ARM64 (linux/arm64) |
| CPU / Memory | 1024 vCPU units / 2048 MB |
| Desired Count | 1 |
| Running Count | 1 |
| Task ARN (latest) | `arn:aws:ecs:ap-south-1:085391664415:task/qff-cluster/5953423423be46ee9c0d1a2d4f0aa45e` |

### ECR — Container Images

| Image | URI | Tag |
|---|---|---|
| Backend (FastAPI) | `085391664415.dkr.ecr.ap-south-1.amazonaws.com/qff-backend` | `378af46` / `latest` |
| Frontend (Next.js) | `085391664415.dkr.ecr.ap-south-1.amazonaws.com/qff-frontend` | `378af46` / `latest` |

> Image tag `378af46` = git commit short SHA at time of deployment.

### Application Load Balancer

| Resource | Value |
|---|---|
| ALB Name | `qff-alb` |
| ALB ARN | `arn:aws:elasticloadbalancing:ap-south-1:085391664415:loadbalancer/app/qff-alb/f156cfb5ec4d17f4` |
| DNS Name | `qff-alb-839920049.ap-south-1.elb.amazonaws.com` |
| Scheme | internet-facing |
| Listener | HTTP port 80 |

**Routing rules:**

| Priority | Path Pattern | Target |
|---|---|---|
| 10 | `/api/*` | `qff-backend-tg` (port 8000) |
| 20 | `/docs`, `/health`, `/openapi.json`, `/redoc` | `qff-backend-tg` (port 8000) |
| default | `/*` | `qff-frontend-tg` (port 3000) |

### Target Groups

| Name | ARN | Health |
|---|---|---|
| `qff-frontend-tg` | `arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-frontend-tg/56a0f6242f8b1a78` | ✅ healthy (172.31.22.111:3000) |
| `qff-backend-tg` | `arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-backend-tg/56a66ed9aeab0cb3` | ✅ healthy (172.31.22.111:8000) |

### EFS — Persistent Storage

| Resource | Value |
|---|---|
| File System ID | `fs-06240fdd11c0181ef` |
| Access Point ID | `fsap-0235817576df4b4e8` |
| Mount Path (container) | `/app/data` |
| Data file | `/app/data/registrations.csv` |
| EFS Security Group | `sg-0222b98ef2108ba16` |
| Mount Targets | `fsmt-07dc1d2d345a57eb8` (ap-south-1a), `fsmt-02bd748e8bedceb07` (ap-south-1c), `fsmt-04d35edb159cfdcc1` (ap-south-1b) |

### Security Groups

| Name | ID | Purpose |
|---|---|---|
| `qff-alb-sg` | `sg-0d558699132d6c1b8` | ALB — allows inbound TCP 80 + 443 from 0.0.0.0/0 |
| `qff-ecs-sg` | `sg-0450ff26f20cb515b` | ECS tasks — allows 3000/8000 from ALB SG only |
| `qff-efs-sg` | `sg-0222b98ef2108ba16` | EFS mount targets — allows TCP 2049 from ECS SG only |

### VPC & Networking

| Resource | Value |
|---|---|
| VPC | `vpc-0f04fd957cce44888` (172.31.0.0/16 — default VPC) |
| Subnets used | `subnet-0323a6c9266d3d314` (ap-south-1a), `subnet-06eb2f29a516d1bc9` (ap-south-1c), `subnet-079efd1d997e2e5d5` (ap-south-1b) |
| Public IP assigned | Yes (Fargate tasks get public IPs for ECR/internet access) |

### IAM Roles

| Role | ARN | Purpose |
|---|---|---|
| `qff-ecs-execution-role` | `arn:aws:iam::085391664415:role/qff-ecs-execution-role` | Pull images from ECR, read Secrets Manager, write CloudWatch Logs |
| `qff-ecs-task-role` | `arn:aws:iam::085391664415:role/qff-ecs-task-role` | Mount EFS (ClientMount + ClientWrite) |

### Secrets Manager

| Secret Name | ARN | Description |
|---|---|---|
| `qff/admin_username` | `arn:aws:secretsmanager:ap-south-1:085391664415:secret:qff/admin_username-BNZSua` | Admin login username |
| `qff/admin_password_hash` | `arn:aws:secretsmanager:ap-south-1:085391664415:secret:qff/admin_password_hash-LZIG1n` | bcrypt hash of admin password |
| `qff/jwt_secret_key` | `arn:aws:secretsmanager:ap-south-1:085391664415:secret:qff/jwt_secret_key-VpefId` | JWT signing key (auto-generated 64-char hex) |

### CloudWatch Logs

| Log Group | Stream Prefix |
|---|---|
| `/ecs/qff/backend` | `backend/` |
| `/ecs/qff/frontend` | `frontend/` |

---

## 🔧 Issues Encountered & Resolved

| # | Issue | Resolution |
|---|---|---|
| 1 | QEMU segfault building `linux/amd64` Node.js image on Apple Silicon | Switched both images to `linux/arm64` (native on M-series Mac); added `cpuArchitecture: ARM64` to task definition |
| 2 | ALB listener rules not created (AWS CLI version rejected `--output none`) | Re-ran rule creation commands without `--output none` flag |
| 3 | ECS tasks failing: `AccessDeniedException: logs:CreateLogGroup` | Added `CloudWatchLogsAccess` inline policy to execution role; forced new deployment |

---

## 🔁 How to Redeploy

After any code change, run from the repo root:

```bash
bash aws-ecs-deploy/deploy.sh
```

The script will:
1. Build new `linux/arm64` images tagged with the current git SHA
2. Push to ECR
3. Register a new task definition revision
4. Force a rolling deployment on the ECS service

**Required env vars before re-running:**
```bash
export AWS_REGION=ap-south-1
export VPC_ID=vpc-0f04fd957cce44888
export SUBNET_IDS=subnet-0323a6c9266d3d314,subnet-06eb2f29a516d1bc9,subnet-079efd1d997e2e5d5
export ECS_SG_ID=sg-0450ff26f20cb515b
export EFS_ID=fs-06240fdd11c0181ef
export ACCESS_POINT_ID=fsap-0235817576df4b4e8
export ALB_DNS=qff-alb-839920049.ap-south-1.elb.amazonaws.com
export FRONTEND_TG_ARN=arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-frontend-tg/56a0f6242f8b1a78
export BACKEND_TG_ARN=arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-backend-tg/56a66ed9aeab0cb3
```

---

## 📋 Useful AWS Console Links

- [ECS Cluster](https://ap-south-1.console.aws.amazon.com/ecs/v2/clusters/qff-cluster/services)
- [ECR Repositories](https://ap-south-1.console.aws.amazon.com/ecr/repositories?region=ap-south-1)
- [ALB](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#LoadBalancers:search=qff-alb)
- [EFS](https://ap-south-1.console.aws.amazon.com/efs/home?region=ap-south-1#/file-systems/fs-06240fdd11c0181ef)
- [Secrets Manager](https://ap-south-1.console.aws.amazon.com/secretsmanager/listsecrets?region=ap-south-1)
- [CloudWatch Logs — Backend](https://ap-south-1.console.aws.amazon.com/cloudwatch/home?region=ap-south-1#logsV2:log-groups/log-group/%2Fecs%2Fqff%2Fbackend)
- [CloudWatch Logs — Frontend](https://ap-south-1.console.aws.amazon.com/cloudwatch/home?region=ap-south-1#logsV2:log-groups/log-group/%2Fecs%2Fqff%2Ffrontend)

---

## 🧹 Teardown Commands

```bash
# Scale down and delete service
aws ecs update-service --cluster qff-cluster --service qff-service --desired-count 0 --region ap-south-1
aws ecs delete-service  --cluster qff-cluster --service qff-service --region ap-south-1

# Delete cluster
aws ecs delete-cluster --cluster qff-cluster --region ap-south-1

# Delete ALB
aws elbv2 delete-load-balancer \
  --load-balancer-arn arn:aws:elasticloadbalancing:ap-south-1:085391664415:loadbalancer/app/qff-alb/f156cfb5ec4d17f4 \
  --region ap-south-1

# Delete target groups
aws elbv2 delete-target-group --target-group-arn arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-frontend-tg/56a0f6242f8b1a78 --region ap-south-1
aws elbv2 delete-target-group --target-group-arn arn:aws:elasticloadbalancing:ap-south-1:085391664415:targetgroup/qff-backend-tg/56a66ed9aeab0cb3 --region ap-south-1

# Delete EFS (wait for mount targets to delete first)
aws efs delete-access-point --access-point-id fsap-0235817576df4b4e8 --region ap-south-1
aws efs delete-mount-target --mount-target-id fsmt-07dc1d2d345a57eb8 --region ap-south-1
aws efs delete-mount-target --mount-target-id fsmt-02bd748e8bedceb07 --region ap-south-1
aws efs delete-mount-target --mount-target-id fsmt-04d35edb159cfdcc1 --region ap-south-1
aws efs delete-file-system  --file-system-id  fs-06240fdd11c0181ef  --region ap-south-1

# Delete ECR repositories
aws ecr delete-repository --repository-name qff-backend  --force --region ap-south-1
aws ecr delete-repository --repository-name qff-frontend --force --region ap-south-1

# Delete secrets
aws secretsmanager delete-secret --secret-id qff/admin_username      --force-delete-without-recovery --region ap-south-1
aws secretsmanager delete-secret --secret-id qff/admin_password_hash --force-delete-without-recovery --region ap-south-1
aws secretsmanager delete-secret --secret-id qff/jwt_secret_key      --force-delete-without-recovery --region ap-south-1

# Delete IAM roles
aws iam delete-role-policy --role-name qff-ecs-execution-role --policy-name SecretsAccess
aws iam delete-role-policy --role-name qff-ecs-execution-role --policy-name CloudWatchLogsAccess
aws iam detach-role-policy --role-name qff-ecs-execution-role --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
aws iam delete-role        --role-name qff-ecs-execution-role
aws iam delete-role-policy --role-name qff-ecs-task-role --policy-name EFSAccess
aws iam delete-role        --role-name qff-ecs-task-role

# Delete security groups (after ALB and ECS tasks are fully terminated)
aws ec2 delete-security-group --group-id sg-0222b98ef2108ba16 --region ap-south-1
aws ec2 delete-security-group --group-id sg-0450ff26f20cb515b --region ap-south-1
aws ec2 delete-security-group --group-id sg-0d558699132d6c1b8 --region ap-south-1
```
