from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import events, weather, alerts

app = FastAPI(
    title="VAYU API",
    description="Official VAYU Indian National Multi-Hazard Early Warning & Hydrology Platform Backend.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(events.router, prefix=settings.API_V1_STR)
app.include_router(weather.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)

@app.get("/api/v1/health", tags=["system"])
async def health_check():
    return {
        "status": "HEALTHY",
        "service": "VAYU Early Warning & Hydrology Engine",
        "jurisdiction": "Republic of India",
        "authoritative_hierarchy": [
            "1. IMD (India Meteorological Department)",
            "2. CWC (Central Water Commission)",
            "3. MOSDAC / ISRO",
            "4. India-WRIS",
            "5. NASA GPM IMERG",
            "6. data.gov.in",
            "7. Open-Meteo (Dev Fallback)"
        ],
        "boundary_bounds": {
            "lat": [6.5, 37.5],
            "lon": [68.0, 97.5]
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
