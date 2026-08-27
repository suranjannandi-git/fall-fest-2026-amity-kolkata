from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


ParticipantType = Literal["student", "professional", "researcher", "educator", "other"]
ExperienceLevel = Literal["beginner", "intermediate", "advanced"]
RegistrationStatus = Literal["pending", "approved", "waitlisted", "cancelled"]


class RegistrationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=30)
    organization: str = Field(min_length=2, max_length=150)
    location: str = Field(min_length=2, max_length=150)
    participant_type: ParticipantType
    area_of_interest: str = Field(min_length=2, max_length=200)
    experience_level: ExperienceLevel
    qiskit_experience: str = Field(min_length=2, max_length=200)
    expectations: str = Field(min_length=2, max_length=500)
    referral_source: str = Field(min_length=2, max_length=120)
    consent_terms: bool
    consent_updates: bool

    @field_validator("name", "organization", "location", "area_of_interest", "qiskit_experience", "expectations", "referral_source")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return " ".join(value.split())

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, value: str) -> str:
        cleaned = value.strip()
        if not any(char.isdigit() for char in cleaned):
            raise ValueError("Phone must contain digits.")
        return cleaned

    @field_validator("consent_terms")
    @classmethod
    def validate_terms(cls, value: bool) -> bool:
        if not value:
            raise ValueError("Terms consent is required.")
        return value


class RegistrationRecord(RegistrationCreate):
    registration_id: str
    status: RegistrationStatus = "pending"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RegistrationResponse(BaseModel):
    registration_id: str
    status: RegistrationStatus
    message: str


class RegistrationDetail(BaseModel):
    registration_id: str
    name: str
    email: EmailStr
    phone: str
    organization: str
    location: str
    participant_type: ParticipantType
    area_of_interest: str
    experience_level: ExperienceLevel
    qiskit_experience: str
    expectations: str
    referral_source: str
    consent_terms: bool
    consent_updates: bool
    status: RegistrationStatus
    created_at: datetime


class AdminLoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=1, max_length=200)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RegistrationStatusUpdate(BaseModel):
    status: RegistrationStatus


class AdminRegistrationList(BaseModel):
    items: list[RegistrationDetail]
    total: int