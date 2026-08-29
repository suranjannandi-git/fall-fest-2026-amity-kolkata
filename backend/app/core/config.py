from pathlib import Path

from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    project_root: Path = Path(__file__).resolve().parents[3]
    data_dir: Path = Field(
        default_factory=lambda: Path(__file__).resolve().parents[3] / "data",
        validation_alias=AliasChoices("DATA_DIR", "data_dir"),
    )
    # Comma-separated list of allowed CORS origins.
    # Defaults to localhost for local development.
    # Set CORS_ORIGINS=http://your-alb-dns in production.
    cors_origins: str = Field(
        default="http://localhost:3000,http://127.0.0.1:3000",
        validation_alias=AliasChoices("CORS_ORIGINS", "cors_origins"),
    )
    registrations_file: Path | None = Field(
        default=None,
        validation_alias=AliasChoices("REGISTRATIONS_FILE", "registrations_file"),
    )
    admin_username: str = Field(
        default="admin",
        validation_alias=AliasChoices("ADMIN_USERNAME", "admin_username"),
    )
    admin_password_hash: str = Field(
        default="",
        validation_alias=AliasChoices("ADMIN_PASSWORD_HASH", "admin_password_hash"),
    )
    jwt_secret_key: str = Field(
        default="change-me",
        validation_alias=AliasChoices("JWT_SECRET_KEY", "jwt_secret_key"),
    )
    jwt_algorithm: str = Field(
        default="HS256",
        validation_alias=AliasChoices("JWT_ALGORITHM", "jwt_algorithm"),
    )
    jwt_expire_minutes: int = Field(
        default=120,
        validation_alias=AliasChoices("JWT_EXPIRE_MINUTES", "jwt_expire_minutes"),
    )
    registration_rate_limit: int = Field(
        default=5,
        validation_alias=AliasChoices("REGISTRATION_RATE_LIMIT", "registration_rate_limit"),
    )
    registration_rate_window_seconds: int = Field(
        default=3600,
        validation_alias=AliasChoices(
            "REGISTRATION_RATE_WINDOW_SECONDS",
            "registration_rate_window_seconds",
        ),
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def resolved_registrations_file(self) -> Path:
        return self.registrations_file or (self.data_dir / "registrations.csv")


settings = Settings()
