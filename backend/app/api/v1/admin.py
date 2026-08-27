from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import FileResponse

from app.core.security import authenticate_admin, create_access_token, require_admin
from app.models import (
    AdminLoginRequest,
    AdminRegistrationList,
    RegistrationDetail,
    RegistrationStatus,
    RegistrationStatusUpdate,
    TokenResponse,
)
from app.services.storage import (
    get_registrations_file_path,
    list_registrations,
    update_registration_status,
)

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/login", response_model=TokenResponse)
def admin_login(payload: AdminLoginRequest) -> TokenResponse:
    if not authenticate_admin(payload.username, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials.",
        )
    return TokenResponse(access_token=create_access_token(payload.username))


@router.get("/registrations", response_model=AdminRegistrationList)
def admin_list_registrations(
    search: str | None = Query(default=None, max_length=120),
    status_filter: RegistrationStatus | None = Query(default=None, alias="status"),
    _: str = Depends(require_admin),
) -> AdminRegistrationList:
    items = list_registrations(search=search, status=status_filter)
    return AdminRegistrationList(items=items, total=len(items))


@router.get("/registrations/export")
def export_registrations(_: str = Depends(require_admin)) -> FileResponse:
    file_path = get_registrations_file_path()
    return FileResponse(
        path=file_path,
        media_type="text/csv",
        filename="registrations.csv",
    )


@router.patch("/registrations/{registration_id}", response_model=RegistrationDetail)
def patch_registration_status(
    registration_id: str,
    payload: RegistrationStatusUpdate,
    _: str = Depends(require_admin),
) -> RegistrationDetail:
    registration = update_registration_status(registration_id, payload.status)
    if registration is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registration not found.",
        )
    return registration
