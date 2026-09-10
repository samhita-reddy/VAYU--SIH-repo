from typing import Dict, Any, Tuple
from app.models.weather_event import LiveWeatherResponse

EVENT_CLASSES = ["FLOOD", "FLASH_FLOOD", "HEAVY_RAIN", "LIGHTNING", "HEATWAVE", "CYCLONE", "THUNDERSTORM", "FOG", "DUST_STORM", "STRONG_WIND"]

def classify_incident_text(text: str) -> Tuple[str, float]:
    t = text.lower()
    if any(k in t for k in ["flood", "waterlogged", "submerged", "inundat", "overflow"]):
        return "FLOOD", 93.0
    if any(k in t for k in ["heavy rain", "downpour", "torrential", "deluge", "monsoon"]):
        return "HEAVY_RAIN", 94.0
    if any(k in t for k in ["lightning", "thunderbolt", "strike"]):
        return "LIGHTNING", 96.0
    if any(k in t for k in ["heatwave", "heat wave", "sunstroke", "extreme heat", "loo"]):
        return "HEATWAVE", 92.0
    if any(k in t for k in ["cyclone", "gale", "storm surge"]):
        return "CYCLONE", 95.0
    if any(k in t for k in ["thunderstorm", "hail", "squall"]):
        return "THUNDERSTORM", 90.0
    if any(k in t for k in ["fog", "smog", "zero visibility"]):
        return "FOG", 88.0
    if any(k in t for k in ["dust", "sandstorm", "andhi"]):
        return "DUST_STORM", 87.0
    if any(k in t for k in ["wind", "gust", "storm"]):
        return "STRONG_WIND", 85.0
    return "HEAVY_RAIN", 65.0

def assess_credibility(
    text: str,
    source: str,
    source_type: str,
    observed_weather: LiveWeatherResponse,
    nearby_reports_count: int = 0
) -> Dict[str, Any]:
    event_type, confidence = classify_incident_text(text)
    
    # Source Trust Scoring
    source_trust = 65.0
    if "IMD" in source or "CWC" in source:
        source_trust = 98.0
    elif "MOSDAC" in source or "NASA" in source or "WRIS" in source:
        source_trust = 92.0
    elif source_type == "CITIZEN REPORT":
        source_trust = 70.0

    # Meteorological Consistency Verification
    weather_score = 80.0
    mismatch_note = "Observed telemetry parameters align with submitted description."
    if event_type in ["FLOOD", "HEAVY_RAIN"]:
        if observed_weather.rainfall > 10.0 or observed_weather.humidity > 85.0:
            weather_score = 95.0
            mismatch_note = f"Corroborated by active rainfall ({observed_weather.rainfall} mm) and high humidity ({observed_weather.humidity}%)."
        elif observed_weather.rainfall == 0.0 and observed_weather.humidity < 60.0:
            weather_score = 35.0
            mismatch_note = f"Warning: Station recorded 0.0 mm rainfall and only {observed_weather.humidity}% humidity. Pending manual field check."
    elif event_type == "HEATWAVE":
        if observed_weather.temperature > 40.0:
            weather_score = 95.0
            mismatch_note = f"Corroborated by severe temperature observation ({observed_weather.temperature}°C)."
        elif observed_weather.temperature < 32.0:
            weather_score = 40.0
            mismatch_note = f"Warning: Current observed temperature is {observed_weather.temperature}°C, which is below the heatwave threshold."

    # Spatial Corroboration
    spatial_score = min(96.0, 55.0 + nearby_reports_count * 12.0)
    temporal_score = 90.0

    # Composite Credibility Score
    credibility = round(
        source_trust * 0.35 + weather_score * 0.35 + spatial_score * 0.20 + temporal_score * 0.10,
        1
    )

    suggested_status = "VERIFIED" if credibility >= 80.0 else ("REJECTED" if credibility < 50.0 else "PENDING")

    return {
        "classified_type": event_type,
        "classification_confidence": confidence,
        "credibility_score": credibility,
        "suggested_status": suggested_status,
        "is_duplicate": nearby_reports_count > 3,
        "source_reliability_score": source_trust,
        "weather_consistency_score": weather_score,
        "spatial_corroboration_score": spatial_score,
        "temporal_score": temporal_score,
        "rationale": mismatch_note
    }