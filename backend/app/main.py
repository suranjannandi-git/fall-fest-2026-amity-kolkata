from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.admin import router as admin_router
from app.api.v1.registrations import router as registrations_router
from app.core.config import settings
from app.services.storage import ensure_storage_ready


@asynccontextmanager
async def lifespan(_: FastAPI):
    ensure_storage_ready()
    yield


app = FastAPI(
    title="Qiskit Fall Fest 2026 Backend",
    version="0.1.0",
    description="Simple FastAPI backend for event registrations and admin management.",
    lifespan=lifespan,
)

# Configure CORS — origins are read from CORS_ORIGINS env var (comma-separated)
_cors_origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(registrations_router, prefix=settings.api_v1_prefix)
app.include_router(admin_router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}