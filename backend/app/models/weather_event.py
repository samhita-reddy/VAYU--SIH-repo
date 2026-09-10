from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class WeatherEventCanonical(BaseModel):
    id: str
    source: str
    source_type: str = Field(description="OFFICIAL OBSERVATION, SATELLITE ESTIMATE, MODEL FORECAST, CITIZEN REPORT, SIMULATED DEMO DATA")
    timestamp: str
    latitude: float
    longitude: float
    state: str
    district: str
    city: str
    event_type: str = Field(description="FLOOD, FLASH_FLOOD, HEAVY_RAIN, RIVER_ALERT, LIGHTNING, HEATWAVE, CYCLONE, THUNDERSTORM, FOG, DUST_STORM, STRONG_WIND")
    severity: str = Field(description="CRITICAL, WARNING, WATCH, NORMAL")
    description: str
    temperature: Optional[float] = None
    feels_like_temperature: Optional[float] = None
    humidity: Optional[float] = None
    rainfall: Optional[float] = None
    wind_speed: Optional[float] = None
    wind_direction: Optional[float] = None
    pressure: Optional[float] = None
    cloud_cover: Optional[float] = None
    visibility: Optional[float] = None
    uv_index: Optional[float] = None
    weather_code: Optional[int] = None
    credibility_score: float = 80.0
    classification_confidence: float = 90.0
    verification_status: str = "VERIFIED"
    is_duplicate: bool = False
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    ai_evidence: Optional[Dict[str, Any]] = None

class CitizenReportSubmission(BaseModel):
    state: str
    district: str
    city: str
    latitude: float
    longitude: float
    event_type: Optional[str] = None
    description: str
    reporter_contact: Optional[str] = None

class LiveWeatherResponse(BaseModel):
    temperature: float
    feels_like: float
    humidity: float
    rainfall: float
    wind_speed: float
    wind_direction: float
    wind_direction_cardinal: str
    pressure: float
    cloud_cover: float
    visibility: float
    uv_index: float
    weather_code: int
    weather_description: str
    observation_time_ist: str
    source: str
    source_category: str
    is_live: bool
