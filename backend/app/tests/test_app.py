import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

TEST_DATA_DIR = Path(__file__).resolve().parents[3] / "data-test"
os.environ["DATA_DIR"] = str(TEST_DATA_DIR)
os.environ["REGISTRATIONS_FILE"] = str(TEST_DATA_DIR / "registrations.csv")
os.environ["ADMIN_USERNAME"] = "admin"
os.environ["JWT_SECRET_KEY"] = "test-secret"

from app.main import app  # noqa: E402
from app.services.storage import ensure_storage_ready  # noqa: E402


@pytest.fixture(autouse=True)
def reset_storage():
    TEST_DATA_DIR.mkdir(parents=True, exist_ok=True)
    registrations_file = TEST_DATA_DIR / "registrations.csv"
    if registrations_file.exists():
        registrations_file.unlink()
    ensure_storage_ready()
    yield
    if registrations_file.exists():
        registrations_file.unlink()


@pytest.fixture
def client():
    return TestClient(app)


def sample_payload():
    return {
        "name": "Alex Quantum",
        "email": "alex@example.com",
        "phone": "+1 555 123 4567",
        "organization": "Quantum University",
        "location": "Kolkata, India",
        "participant_type": "student",
        "area_of_interest": "Quantum machine learning",
        "experience_level": "beginner",
        "qiskit_experience": "Completed a few tutorials",
        "expectations": "Learn and network",
        "referral_source": "Community post",
        "consent_terms": True,
        "consent_updates": True,
    }


def get_admin_token(client: TestClient) -> str:
    response = client.post(
        "/api/v1/admin/login",
        json={"username": "admin", "password": "password"},
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def test_registration_flow(client: TestClient):
    create_response = client.post("/api/v1/registrations", json=sample_payload())
    assert create_response.status_code == 201
    registration_id = create_response.json()["registration_id"]

    detail_response = client.get(f"/api/v1/registrations/{registration_id}")
    assert detail_response.status_code == 200
    assert detail_response.json()["email"] == "alex@example.com"


def test_duplicate_email_rejected(client: TestClient):
    client.post("/api/v1/registrations", json=sample_payload())
    duplicate_response = client.post("/api/v1/registrations", json=sample_payload())
    assert duplicate_response.status_code == 409


def test_admin_can_list_and_update(client: TestClient):
    create_response = client.post("/api/v1/registrations", json=sample_payload())
    registration_id = create_response.json()["registration_id"]
    token = get_admin_token(client)

    list_response = client.get(
        "/api/v1/admin/registrations",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert list_response.status_code == 200
    assert list_response.json()["total"] == 1

    patch_response = client.patch(
        f"/api/v1/admin/registrations/{registration_id}",
        json={"status": "approved"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert patch_response.status_code == 200
    assert patch_response.json()["status"] == "approved"
