from collections import defaultdict, deque
from time import time

from fastapi import HTTPException, Request, status

from app.core.config import settings

_request_log: dict[str, deque[float]] = defaultdict(deque)


def enforce_registration_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time()
    window_start = now - settings.registration_rate_window_seconds
    timestamps = _request_log[client_ip]

    while timestamps and timestamps[0] < window_start:
        timestamps.popleft()

    if len(timestamps) >= settings.registration_rate_limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many registration attempts. Please try again later.",
        )

    timestamps.append(now)
