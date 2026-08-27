# Backend

Simple FastAPI backend for Qiskit Fall Fest 2026 registrations.

## Features

- CSV-based registration storage
- Duplicate email prevention
- JWT-based admin authentication
- Admin registration listing, filtering, status updates, and CSV export
- Basic in-memory rate limiting
- OpenAPI docs at `/docs` and `/redoc`

## Run locally

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
```

## How `.env` works

The backend reads admin settings from the `backend/.env` file.

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Create `.env` from the example file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` in any editor. For example:
   ```bash
   nano .env
   ```

4. You will see values like this:
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=
   JWT_SECRET_KEY=change-me
   JWT_ALGORITHM=HS256
   JWT_EXPIRE_MINUTES=120
   REGISTRATION_RATE_LIMIT=5
   REGISTRATION_RATE_WINDOW_SECONDS=3600
   ```

## Change admin username

If you want the admin username to be `Admin`, change this line:

```env
ADMIN_USERNAME=Admin
```

You can use any username you want.

## Change admin password

You cannot store the password directly in `.env`.
The backend stores a **bcrypt password hash**, not plain text.

So this will **not** work:

```env
ADMIN_PASSWORD_HASH=mypassword
```

You must generate a bcrypt hash for your password first.

### Example: set password to ``

Run this command inside the activated virtual environment:

```bash
python -c "import bcrypt; print(bcrypt.hashpw(b'Admin@123', bcrypt.gensalt()).decode())"
```

It will print something like:

```text
$2b$12$abc123examplehashedvaluehere
```

Copy that full output and put it into `.env`:

```env
ADMIN_PASSWORD_HASH=$2b$12$abc123examplehashedvaluehere
```

## Full example `.env`

If you want:

- username: `Admin`
- password: ``

Then your `.env` should look like this:

```env
ADMIN_USERNAME=Admin
ADMIN_PASSWORD_HASH=PASTE_BCRYPT_HASH_HERE
JWT_SECRET_KEY=replace-this-with-a-long-random-secret
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=120
REGISTRATION_RATE_LIMIT=5
REGISTRATION_RATE_WINDOW_SECONDS=3600
```

## Recommended JWT secret

Set a better JWT secret instead of `change-me`.

Example:

```env
JWT_SECRET_KEY=my-super-secret-key-for-local-dev
```

For real deployment, use a long random secret.

## Save and restart the server

After editing `.env`, save the file and restart uvicorn:

```bash
python -m uvicorn app.main:app --reload
```

## Login with your admin credentials

If your `.env` contains:

```env
ADMIN_USERNAME=Admin
```

and you generated the hash from password:

```text
Admin@123
```

then login with:

- username: `Admin`
- password: ``

## Get bearer token

Use the login API:

`POST /api/v1/admin/login`

Example:

```bash
curl -X POST "http://127.0.0.1:8000/api/v1/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"Admin","password":""}'
```

Response:

```json
{
  "access_token": "YOUR_TOKEN_HERE",
  "token_type": "bearer"
}
```

## Use token in Swagger docs

Open:

- `http://127.0.0.1:8000/docs`

Click **Authorize**.

Usually you can paste:

```text
Bearer YOUR_TOKEN_HERE
```

If Swagger expects only the token, paste just:

```text
YOUR_TOKEN_HERE
```

## Default admin login

If you do not change `.env`, the default login is:

- Username: `admin`
- Password: `password`

## API endpoints

- `POST /api/v1/registrations`
- `GET /api/v1/registrations/{registration_id}`
- `POST /api/v1/admin/login`
- `GET /api/v1/admin/registrations`
- `GET /api/v1/admin/registrations/export`
- `PATCH /api/v1/admin/registrations/{registration_id}`

## Tests

```bash
cd backend
pytest
```