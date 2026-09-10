from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.weather_event import CitizenReportSubmission, WeatherEventCanonical
from app.services.geo_validator import validate_india_coordinates
from app.services.weather_provider import fetch_current_indian_weather, get_ist_now_string
from app.services.ai_classifier import assess_credibility
from app.routers.events import _EVENTS_DB

router = APIRouter(tags=["alerts & reports"])

@router.get("/alerts")
async def get_active_alerts():
    critical = [e for e in _EVENTS_DB if e["severity"] == "CRITICAL"]
    warnings = [e for e in _EVENTS_DB if e["severity"] == "WARNING"]
    return {
        "critical_count": len(critical),
        "warning_count": len(warnings),
        "critical_alerts": critical[:20],
        "warning_alerts": warnings[:20]
    }

@router.post("/reports", status_code=status.HTTP_201_CREATED)
async def submit_citizen_report(report: CitizenReportSubmission):
    # 1. Geographic Boundary Validation (India Only)
    validate_india_coordinates(report.latitude, report.longitude)

    # 2. Fetch Live Ground Weather Telemetry
    observed = await fetch_current_indian_weather(report.latitude, report.longitude)

    # 3. AI Credibility Assessment (Cross-Corroborating citizen text against live sensors)
    ai_result = assess_credibility(
        text=report.description,
        source="Citizen Mobile Portal",
        source_type="CITIZEN REPORT",
        observed_weather=observed,
        nearby_reports_count=2
    )

    new_id = f"IND-CIT-{len(_EVENTS_DB) + 1:05d}"
    new_event = {
        "id": new_id,
        "source": "Citizen Report",
        "source_type": "CITIZEN REPORT",
        "timestamp": get_ist_now_string(),
        "latitude": report.latitude,
        "longitude": report.longitude,
        "state": report.state,
        "district": report.district,
        "city": report.city,
        "event_type": ai_result["classified_type"],
        "severity": "WARNING" if ai_result["credibility_score"] >= 75 else "WATCH",
        "description": report.description,
        "temperature": observed.temperature,
        "feels_like_temperature": observed.feels_like,
        "humidity": observed.humidity,
        "rainfall": observed.rainfall,
        "wind_speed": observed.wind_speed,
        "wind_direction": observed.wind_direction,
        "pressure": observed.pressure,
        "cloud_cover": observed.cloud_cover,
        "visibility": observed.visibility,
        "uv_index": observed.uv_index,
        "weather_code": observed.weather_code,
        "credibility_score": ai_result["credibility_score"],
        "classification_confidence": ai_result["classification_confidence"],
        "verification_status": ai_result["suggested_status"],
        "is_duplicate": ai_result["is_duplicate"],
        "ai_evidence": ai_result,
        "created_at": get_ist_now_string()
    }

    _EVENTS_DB.insert(0, new_event)
    return {
        "status": "SUCCESS",
        "message": "Citizen incident report registered and evaluated by Bharat Weather Intelligence Engine.",
        "event": new_event
    }
