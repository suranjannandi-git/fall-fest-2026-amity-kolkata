import csv
import secrets
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock

from app.core.config import settings
from app.models import RegistrationCreate, RegistrationDetail, RegistrationStatus

FIELDNAMES = [
    "registration_id",
    "name",
    "email",
    "phone",
    "organization",
    "location",
    "participant_type",
    "area_of_interest",
    "experience_level",
    "qiskit_experience",
    "expectations",
    "referral_source",
    "consent_terms",
    "consent_updates",
    "status",
    "created_at",
]

_storage_lock = Lock()


def ensure_storage_ready() -> None:
    settings.data_dir.mkdir(parents=True, exist_ok=True)
    registrations_file = settings.resolved_registrations_file
    registrations_file.parent.mkdir(parents=True, exist_ok=True)
    if not registrations_file.exists():
        with registrations_file.open("w", newline="", encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=FIELDNAMES)
            writer.writeheader()


def _read_rows() -> list[dict[str, str]]:
    ensure_storage_ready()
    with settings.resolved_registrations_file.open("r", newline="", encoding="utf-8") as csvfile:
        return list(csv.DictReader(csvfile))


def _write_rows(rows: list[dict[str, str]]) -> None:
    with settings.resolved_registrations_file.open("w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=FIELDNAMES)
        writer.writeheader()
        writer.writerows(rows)


def _to_detail(row: dict[str, str]) -> RegistrationDetail:
    return RegistrationDetail(
        registration_id=row["registration_id"],
        name=row["name"],
        email=row["email"],
        phone=row["phone"],
        organization=row["organization"],
        location=row["location"],
        participant_type=row["participant_type"],
        area_of_interest=row["area_of_interest"],
        experience_level=row["experience_level"],
        qiskit_experience=row["qiskit_experience"],
        expectations=row["expectations"],
        referral_source=row["referral_source"],
        consent_terms=row["consent_terms"].lower() == "true",
        consent_updates=row["consent_updates"].lower() == "true",
        status=row["status"],
        created_at=datetime.fromisoformat(row["created_at"]),
    )


def generate_registration_id() -> str:
    return f"QFF-{secrets.randbelow(1_000_000):06d}"


def create_registration(payload: RegistrationCreate) -> str:
    with _storage_lock:
        rows = _read_rows()
        normalized_email = payload.email.strip().lower()
        if any(row["email"].strip().lower() == normalized_email for row in rows):
            raise ValueError("A registration with this email already exists.")

        existing_ids = {row["registration_id"] for row in rows}
        registration_id = generate_registration_id()
        while registration_id in existing_ids:
            registration_id = generate_registration_id()

        row = {
            "registration_id": registration_id,
            "name": payload.name,
            "email": normalized_email,
            "phone": payload.phone,
            "organization": payload.organization,
            "location": payload.location,
            "participant_type": payload.participant_type,
            "area_of_interest": payload.area_of_interest,
            "experience_level": payload.experience_level,
            "qiskit_experience": payload.qiskit_experience,
            "expectations": payload.expectations,
            "referral_source": payload.referral_source,
            "consent_terms": str(payload.consent_terms),
            "consent_updates": str(payload.consent_updates),
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        rows.append(row)
        _write_rows(rows)
        return registration_id


def get_registration(registration_id: str) -> RegistrationDetail | None:
    for row in _read_rows():
        if row["registration_id"] == registration_id:
            return _to_detail(row)
    return None


def list_registrations(
    search: str | None = None,
    status: RegistrationStatus | None = None,
) -> list[RegistrationDetail]:
    rows = _read_rows()
    items = [_to_detail(row) for row in rows]

    if search:
        needle = search.strip().lower()
        items = [
            item
            for item in items
            if needle in item.registration_id.lower()
            or needle in item.name.lower()
            or needle in item.email.lower()
            or needle in item.organization.lower()
        ]

    if status:
        items = [item for item in items if item.status == status]

    items.sort(key=lambda item: item.created_at, reverse=True)
    return items


def update_registration_status(
    registration_id: str,
    status: RegistrationStatus,
) -> RegistrationDetail | None:
    with _storage_lock:
        rows = _read_rows()
        updated_row: dict[str, str] | None = None
        for row in rows:
            if row["registration_id"] == registration_id:
                row["status"] = status
                updated_row = row
                break

        if updated_row is None:
            return None

        _write_rows(rows)
        return _to_detail(updated_row)


def get_registrations_file_path() -> Path:
    ensure_storage_ready()
    return settings.resolved_registrations_file