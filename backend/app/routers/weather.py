from fastapi import APIRouter, Query
from app.services.weather_provider import fetch_current_indian_weather
from app.models.weather_event import LiveWeatherResponse

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current", response_model=LiveWeatherResponse)
async def get_current_weather(
    lat: float = Query(..., description="Latitude strictly within Republic of India (6.5 to 37.5)"),
    lon: float = Query(..., description="Longitude strictly within Republic of India (68.0 to 97.5)")
):
    """
    Fetches real-time meteorological telemetry for any coordinate within the Republic of India.
    Non-India coordinates are strictly rejected with HTTP 422.
    """
    return await fetch_current_indian_weather(lat, lon)
