from fastapi import APIRouter, HTTPException, Request, status

from app.models import RegistrationCreate, RegistrationDetail, RegistrationResponse
from app.services.rate_limit import enforce_registration_rate_limit
from app.services.storage import create_registration, get_registration

router = APIRouter(prefix="/registrations", tags=["registrations"])


@router.post("", response_model=RegistrationResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegistrationCreate, request: Request) -> RegistrationResponse:
    enforce_registration_rate_limit(request)
    try:
        registration_id = create_registration(payload)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    return RegistrationResponse(
        registration_id=registration_id,
        status="pending",
        message="Registration submitted successfully.",
    )


@router.get("/{registration_id}", response_model=RegistrationDetail)
def get_registration_by_id(registration_id: str) -> RegistrationDetail:
    registration = get_registration(registration_id)
    if registration is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registration not found.",
        )
    return registration
