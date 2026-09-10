from fastapi import HTTPException, status

INDIA_LAT_MIN = 6.5
INDIA_LAT_MAX = 37.5
INDIA_LON_MIN = 68.0
INDIA_LON_MAX = 97.5

def validate_india_coordinates(lat: float, lon: float) -> bool:
    """
    Validates strictly that coordinates fall within the terrestrial & maritime bounds of India.
    Non-negotiable requirement: Never accept or process non-India locations.
    """
    if not (INDIA_LAT_MIN <= lat <= INDIA_LAT_MAX and INDIA_LON_MIN <= lon <= INDIA_LON_MAX):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={
                "error": "GEOGRAPHIC_BOUNDARY_VIOLATION",
                "message": f"Coordinates [{lat}, {lon}] are strictly outside the Republic of India boundaries (Lat: {INDIA_LAT_MIN}-{INDIA_LAT_MAX}, Lon: {INDIA_LON_MIN}-{INDIA_LON_MAX}). Non-India coordinates are rejected by platform policy.",
                "allowed_region": "Republic of India Only"
            }
        )
    return True
