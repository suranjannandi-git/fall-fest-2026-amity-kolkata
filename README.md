# Qiskit Fall Fest 2026 - Event Website

A modern, full-stack web application for managing Qiskit Fall Fest 2026 event registrations.

## 🚀 Overview

This project provides a complete event management solution with:
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: FastAPI with Python 3.12
- **Storage**: CSV-based registration storage
- **Deployment**: Docker Compose for easy deployment

## 📋 Features

### Public Features
- 🏠 Event information and highlights
- 📚 Quantum computing learning resources
- 👥 Speaker profiles and sessions
- 🤝 Team and supporter information
- 📝 Online registration with validation
- 📱 Fully responsive design

### Admin Features
- 🔐 Secure authentication (JWT)
- 📊 Registration dashboard
- 🔍 Search and filter registrations
- ✏️ Update registration status
- 📥 Export registrations to CSV
- 📈 Real-time statistics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.12
- **Authentication**: JWT (PyJWT)
- **Validation**: Pydantic
- **Storage**: CSV files

## 📁 Project Structure

```
event-site/
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # React components
│   ├── lib/              # Utilities and API client
│   ├── public/           # Static assets
│   └── Dockerfile        # Frontend container
├── backend/              # FastAPI backend application
│   ├── app/              # Application code
│   │   ├── api/         # API routes
│   │   ├── core/        # Core functionality
│   │   ├── services/    # Business logic
│   │   └── tests/       # Test files
│   └── Dockerfile        # Backend container
├── data/                 # Registration data (CSV)
│   └── registrations.csv
├── docker-compose.yml    # Docker orchestration
├── spec.md              # Project specification
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (recommended)
  - OR -
- **Node.js 18+** and **Python 3.12+** (for local development)

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-site
   ```

2. **Configure environment variables**:
   ```bash
   # Create .env file in project root
   cat > .env << EOF
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET_KEY=your-secret-key-change-in-production
   EOF
   ```

3. **Start the application**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run the backend**:
   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will be available at http://localhost:8000

#### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local if needed
   ```

4. **Run the frontend**:
   ```bash
   npm run dev
   ```

   Frontend will be available at http://localhost:3000

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Project Specification](./spec.md)

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_USERNAME` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password | `changeme` |
| `JWT_SECRET_KEY` | JWT signing key | (required) |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry | `30` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Type Checking

```bash
cd frontend
npx tsc --noEmit
```

## 📊 API Endpoints

### Public Endpoints

- `POST /api/v1/registrations` - Create registration
- `GET /api/v1/registrations/{id}` - Get registration by ID

### Admin Endpoints (Requires Authentication)

- `POST /api/v1/admin/login` - Admin login
- `GET /api/v1/admin/registrations` - List all registrations
- `PATCH /api/v1/admin/registrations/{id}` - Update registration
- `GET /api/v1/admin/registrations/export` - Export CSV

### Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🗄️ Data Storage

Registrations are stored in CSV format at `data/registrations.csv` with the following fields:

- registration_id
- name
- email
- phone
- organization
- city
- country
- participant_type
- area_of_interest
- experience_level
- qiskit_experience
- expectations
- referral_source
- consent_data_processing
- consent_communications
- status
- registered_at

## 🔒 Security

- JWT-based authentication for admin access
- Password hashing with bcrypt
- Input validation on both client and server
- Rate limiting on registration endpoint
- CORS configuration
- Environment-based secrets

## 🚢 Deployment

### Production Deployment

1. **Update environment variables** with secure values
2. **Build and deploy** using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

3. **Set up reverse proxy** (nginx/traefik) for HTTPS
4. **Configure domain** and SSL certificates
5. **Set up backups** for the `data` directory

### Scaling Considerations

- Use a proper database (PostgreSQL) for production
- Implement Redis for rate limiting
- Add CDN for static assets
- Use container orchestration (Kubernetes) for high availability

## 🐛 Troubleshooting

### Backend Issues

**Port already in use**:
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Module not found**:
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Build errors**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**API connection errors**:
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured in backend

### Docker Issues

**Container won't start**:
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild containers
docker-compose down
docker-compose up --build
```

## 📝 Development Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes** and test locally

3. **Run tests**:
   ```bash
   # Backend
   cd backend && pytest
   
   # Frontend
   cd frontend && npm run lint
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

5. **Create pull request**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

This project is part of Qiskit Fall Fest 2026.

## 👥 Team

Organized by passionate quantum computing enthusiasts and students.

## 📧 Contact

For questions or support:
- Email: team@qiskitfallfest.org
- Website: [Event Website]

## 🙏 Acknowledgments

- IBM Quantum for Qiskit
- All speakers and supporters
- The quantum computing community

---

Built with ❤️ for the quantum computing community
