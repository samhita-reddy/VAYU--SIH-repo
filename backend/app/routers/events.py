from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional, Dict, Any
import os
import json
import math
from app.models.weather_event import WeatherEventCanonical
from app.seed.seed_india_events import generate_india_synthetic_events
from app.services.geo_validator import validate_india_coordinates

router = APIRouter(prefix="/events", tags=["events"])

# Load in-memory events repository
SEED_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "seed", "india_events_seed.json")
if not os.path.exists(SEED_FILE):
    _EVENTS_DB = generate_india_synthetic_events(2000)
else:
    with open(SEED_FILE, "r", encoding="utf-8") as f:
        _EVENTS_DB = json.load(f)

@router.get("", response_model=Dict[str, Any])
async def list_events(
    state: Optional[str] = None,
    district: Optional[str] = None,
    event_type: Optional[str] = None,
    severity: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = Query(50, le=200),
    offset: int = Query(0, ge=0)
):
    filtered = _EVENTS_DB
    if state:
        filtered = [e for e in filtered if e["state"].lower() == state.lower()]
    if district:
        filtered = [e for e in filtered if e["district"].lower() == district.lower()]
    if event_type:
        filtered = [e for e in filtered if e["event_type"].lower() == event_type.lower()]
    if severity:
        filtered = [e for e in filtered if e["severity"].lower() == severity.lower()]
    if status:
        filtered = [e for e in filtered if e["verification_status"].lower() == status.lower()]

    total = len(filtered)
    page = filtered[offset : offset + limit]
    return {
        "total": total,
        "offset": offset,
        "limit": limit,
        "items": page
    }

@router.get("/stats")
async def get_events_stats():
    total = len(_EVENTS_DB)
    critical = sum(1 for e in _EVENTS_DB if e["severity"] == "CRITICAL")
    warnings = sum(1 for e in _EVENTS_DB if e["severity"] == "WARNING")
    verified = sum(1 for e in _EVENTS_DB if e["verification_status"] == "VERIFIED")
    pending = sum(1 for e in _EVENTS_DB if e["verification_status"] == "PENDING")

    return {
        "total_events": total,
        "critical_alerts": critical,
        "warning_alerts": warnings,
        "verified_percentage": round((verified / total) * 100, 1) if total > 0 else 0,
        "pending_review": pending,
        "source_breakdown": {
            "official_observation": sum(1 for e in _EVENTS_DB if "OFFICIAL" in e["source_type"]),
            "satellite_estimate": sum(1 for e in _EVENTS_DB if "SATELLITE" in e["source_type"]),
            "citizen_report": sum(1 for e in _EVENTS_DB if "CITIZEN" in e["source_type"]),
            "simulated_demo": sum(1 for e in _EVENTS_DB if "SIMULATED" in e["source_type"]),
        }
    }

@router.get("/timeline")
async def get_timeline():
    return {
        "timeline": [
            {"date": "02-Sep", "avg_rain_mm": 14.2, "critical_alerts": 4},
            {"date": "03-Sep", "avg_rain_mm": 18.6, "critical_alerts": 6},
            {"date": "04-Sep", "avg_rain_mm": 28.4, "critical_alerts": 11},
            {"date": "05-Sep", "avg_rain_mm": 36.1, "critical_alerts": 15},
            {"date": "06-Sep", "avg_rain_mm": 31.0, "critical_alerts": 12},
            {"date": "07-Sep", "avg_rain_mm": 42.8, "critical_alerts": 19},
            {"date": "08-Sep", "avg_rain_mm": 48.5, "critical_alerts": 24},
        ]
    }

@router.get("/nearby")
async def get_nearby_events(
    lat: float = Query(..., description="Latitude strictly within India"),
    lon: float = Query(..., description="Longitude strictly within India"),
    radius_km: float = Query(50.0, le=200.0)
):
    validate_india_coordinates(lat, lon)
    
    # Haversine distance calculation
    def haversine(lat1, lon1, lat2, lon2):
        R = 6371.0 # Earth radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    nearby = []
    for e in _EVENTS_DB:
        dist = haversine(lat, lon, e["latitude"], e["longitude"])
        if dist <= radius_km:
            item = dict(e)
            item["distance_km"] = round(dist, 1)
            nearby.append(item)

    nearby.sort(key=lambda x: x["distance_km"])
    return {"latitude": lat, "longitude": lon, "radius_km": radius_km, "count": len(nearby), "events": nearby[:50]}

@router.get("/{event_id}")
async def get_event_detail(event_id: str):
    for e in _EVENTS_DB:
        if e["id"] == event_id:
            return e
    raise HTTPException(status_code=404, detail="Weather event not found.")
