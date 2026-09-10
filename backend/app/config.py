import os

class Settings:
    PROJECT_NAME: str = "VAYU"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Official IMD Configuration (Configurable via Environment)
    IMD_API_KEY: str = os.getenv("IMD_API_KEY", "")
    IMD_API_URL: str = os.getenv("IMD_API_URL", "https://mausam.imd.gov.in/responsive/apis.php")
    
    # Development Fallback Provider
    OPEN_METEO_URL: str = "https://api.open-meteo.com/v1/forecast"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./bharat_weather.db")
    
    # Kafka Streaming Configuration (Phase 5)
    KAFKA_BOOTSTRAP_SERVERS: str = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
    KAFKA_TOPIC_RAW: str = "weather.imd.raw"
    KAFKA_TOPIC_NORMALIZED: str = "weather.normalized"
    KAFKA_TOPIC_ALERTS: str = "weather.alerts"

settings = Settings()
