from typing import Annotated
from fastapi import Depends

from src.exceptions import AdminRequiredException


def get_admin_status() -> bool:
    """Get the current user's admin status. Replace with actual auth logic."""
    # This should be replaced with actual authentication logic
    # For now, hardcoded to True for development
    return True


def get_admin_status_from_header() -> bool:
    return get_admin_status()


def admin_required() -> None:
    """Dependency that requires admin access. Raises 403 if not admin."""
    if not get_admin_status():
        raise AdminRequiredException()


AdminStatus = Annotated[bool, Depends(get_admin_status_from_header)]
AdminRequired = Depends(admin_required)
