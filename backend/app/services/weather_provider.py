import httpx
import math
from datetime import datetime, timezone, timedelta
from app.config import settings
from app.services.geo_validator import validate_india_coordinates
from app.models.weather_event import LiveWeatherResponse

def degrees_to_cardinal(deg: float) -> str:
    directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    index = round((deg % 360) / 22.5) % 16
    return directions[index]

def wmo_code_to_text(code: int) -> str:
    mapping = {
        0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Foggy", 48: "Depositing Rime Fog", 51: "Light Drizzle", 53: "Moderate Drizzle",
        55: "Dense Drizzle", 61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rainfall",
        71: "Slight Snowfall", 73: "Moderate Snowfall", 75: "Heavy Snowfall",
        80: "Slight Rain Showers", 81: "Moderate Rain Showers", 82: "Violent Rain Showers",
        95: "Thunderstorm", 96: "Thunderstorm with Slight Hail", 99: "Severe Thunderstorm with Heavy Hail"
    }
    return mapping.get(code, "Partly Cloudy")

def get_ist_now_string() -> str:
    ist = timezone(timedelta(hours=5, minutes=30))
    now = datetime.now(ist)
    return now.strftime("%d-%b-%Y %H:%M:%S IST")

async def fetch_current_indian_weather(lat: float, lon: float) -> LiveWeatherResponse:
    # 1. Strict India Boundary Validation
    validate_india_coordinates(lat, lon)
    
    # 2. Check if official IMD credentials configured
    if settings.IMD_API_KEY and settings.IMD_API_URL:
        # IMD official connector hook
        pass

    # 3. Development Fallback: Open-Meteo
    try:
        url = (
            f"{settings.OPEN_METEO_URL}?latitude={lat}&longitude={lon}"
            f"&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,"
            f"weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m"
            f"&daily=uv_index_max&timezone=Asia%2FKolkata"
        )
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                cur = data.get("current", {})
                daily = data.get("daily", {})
                uv_vals = daily.get("uv_index_max", [6.0])
                uv = uv_vals[0] if uv_vals else 6.0

                wind_dir = cur.get("wind_direction_10m", 0)
                code = cur.get("weather_code", 0)

                return LiveWeatherResponse(
                    temperature=round(cur.get("temperature_2m", 28.0), 1),
                    feels_like=round(cur.get("apparent_temperature", 30.0), 1),
                    humidity=round(cur.get("relative_humidity_2m", 65.0), 0),
                    rainfall=round(cur.get("precipitation", 0.0) or cur.get("rain", 0.0) or 0.0, 1),
                    wind_speed=round(cur.get("wind_speed_10m", 12.0), 1),
                    wind_direction=wind_dir,
                    wind_direction_cardinal=degrees_to_cardinal(wind_dir),
                    pressure=round(cur.get("surface_pressure", 1010.0), 0),
                    cloud_cover=round(cur.get("cloud_cover", 20.0), 0),
                    visibility=10.0,
                    uv_index=uv,
                    weather_code=code,
                    weather_description=wmo_code_to_text(code),
                    observation_time_ist=get_ist_now_string(),
                    source="Open-Meteo (Dev Fallback)",
                    source_category="MODEL FORECAST",
                    is_live=True
                )
    except Exception as e:
        print(f"Live API call failed ({e}), generating deterministic simulated reading.")

    # 4. Deterministic Simulated Fallback
    seed = abs(math.sin(lat * 12.9898 + lon * 78.233))
    temp = round(24.0 + seed * 12.0, 1)
    humidity = round(55.0 + seed * 38.0, 0)
    rain = round((seed - 0.6) * 45.0, 1) if seed > 0.6 else 0.0
    wind = round(8.0 + seed * 22.0, 1)
    wind_dir = round(seed * 360)

    return LiveWeatherResponse(
        temperature=temp,
        feels_like=round(temp + (3.0 if humidity > 70 else 1.0), 1),
        humidity=humidity,
        rainfall=rain,
        wind_speed=wind,
        wind_direction=wind_dir,
        wind_direction_cardinal=degrees_to_cardinal(wind_dir),
        pressure=round(1005 + seed * 10, 0),
        cloud_cover=round(20 + seed * 75, 0),
        visibility=5.0 if rain > 15 else 10.0,
        uv_index=round(4.0 + seed * 6.0, 1),
        weather_code=65 if rain > 20 else (61 if rain > 5 else 2),
        weather_description="Heavy Rain (Simulated)" if rain > 20 else ("Moderate Rain" if rain > 5 else "Partly Cloudy"),
        observation_time_ist=get_ist_now_string(),
        source="Simulated Demo Data",
        source_category="SIMULATED DEMO DATA",
        is_live=False
    )
