#!/usr/bin/env bash
# =============================================================================
# secrets-setup.sh
# Creates all required secrets in AWS Secrets Manager.
# Run this ONCE before deploying. Re-run to rotate values.
# =============================================================================
set -euo pipefail

# ---------------------------------------------------------------------------
# CONFIGURE THESE
# ---------------------------------------------------------------------------
AWS_REGION="${AWS_REGION:-ap-south-1}"
APP_NAME="${APP_NAME:-qff}"

# ---------------------------------------------------------------------------
# Generate secure defaults (override via env vars if desired)
# ---------------------------------------------------------------------------
ADMIN_USERNAME="${ADMIN_USERNAME:-admin}"

echo "==> Hashing admin password with bcrypt..."
echo "    Enter a password when prompted, or set ADMIN_PASSWORD env var."
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"
if [[ -z "$ADMIN_PASSWORD" ]]; then
  read -rsp "Admin password: " ADMIN_PASSWORD
  echo
fi

# Generate bcrypt hash using Python (already available if backend was run locally)
ADMIN_PASSWORD_HASH=$(python3 -c "import bcrypt, sys; pw=sys.argv[1].encode(); print(bcrypt.hashpw(pw, bcrypt.gensalt()).decode())" "$ADMIN_PASSWORD")

JWT_SECRET_KEY="${JWT_SECRET_KEY:-$(openssl rand -hex 32)}"

# ---------------------------------------------------------------------------
# Helper: create or update a secret
# ---------------------------------------------------------------------------
put_secret() {
  local name="$1"
  local value="$2"
  local desc="$3"

  if aws secretsmanager describe-secret --secret-id "$name" --region "$AWS_REGION" &>/dev/null; then
    echo "==> Updating secret: $name"
    aws secretsmanager put-secret-value \
      --secret-id "$name" \
      --secret-string "$value" \
      --region "$AWS_REGION"
  else
    echo "==> Creating secret: $name"
    aws secretsmanager create-secret \
      --name "$name" \
      --description "$desc" \
      --secret-string "$value" \
      --region "$AWS_REGION"
  fi
}

# ---------------------------------------------------------------------------
# Create secrets
# ---------------------------------------------------------------------------
put_secret "${APP_NAME}/admin_username"        "$ADMIN_USERNAME"        "QFF admin username"
put_secret "${APP_NAME}/admin_password_hash"   "$ADMIN_PASSWORD_HASH"   "QFF admin bcrypt password hash"
put_secret "${APP_NAME}/jwt_secret_key"        "$JWT_SECRET_KEY"        "QFF JWT signing key"

echo ""
echo "==> Done. Secret ARNs:"
aws secretsmanager list-secrets \
  --region "$AWS_REGION" \
  --query "SecretList[?starts_with(Name, '${APP_NAME}/')].{Name:Name,ARN:ARN}" \
  --output table
