from src.deps import get_admin_status, get_admin_status_from_header


def test_get_admin_status():
    assert get_admin_status() is True

def test_get_admin_status_from_header():
    assert get_admin_status_from_header() is True