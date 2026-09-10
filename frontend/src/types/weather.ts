export type DataSourceCategory =
  | "OFFICIAL OBSERVATION"
  | "SATELLITE ESTIMATE"
  | "MODEL FORECAST"
  | "HISTORICAL DATA"
  | "CITIZEN REPORT"
  | "SIMULATED DEMO DATA";

export type AuthoritativeSource =
  | "IMD AWS/ARG"
  | "IMD RADAR"
  | "CWC River Gauge"
  | "MOSDAC / ISRO"
  | "NASA GPM IMERG"
  | "India-WRIS"
  | "data.gov.in"
  | "Open-Meteo (Dev Fallback)"
  | "Citizen Report"
  | "Simulated Demo Data";

export type WeatherEventType =
  | "HEAVY_RAIN"
  | "FLOOD"
  | "FLASH_FLOOD"
  | "RIVER_ALERT"
  | "LIGHTNING"
  | "HEATWAVE"
  | "CYCLONE"
  | "THUNDERSTORM"
  | "FOG"
  | "DUST_STORM"
  | "STRONG_WIND";

export type AlertSeverity = "CRITICAL" | "WARNING" | "WATCH" | "NORMAL";

export type VerificationStatus =
  | "VERIFIED"
  | "PENDING"
  | "REJECTED"
  | "DUPLICATE"
  | "ESCALATED";

export interface LiveWeatherParameters {
  temperature: number;
  feelsLike: number;
  humidity: number;
  dewPoint?: number;
  rainfall: number; // mm in last hour / current
  rainRate?: number; // mm/hr
  windSpeed: number; // km/h
  windDirection: number; // degrees
  windDirectionCardinal: string;
  pressure: number; // hPa
  cloudCover: number; // %
  visibility: number; // km
  uvIndex: number;
  weatherCode: number;
  weatherDescription: string;
  observationTimeIST: string;
  source: AuthoritativeSource;
  sourceCategory: DataSourceCategory;
  isLive: boolean;
}

export interface WeatherEvent {
  id: string;
  title: string;
  eventType: WeatherEventType;
  severity: AlertSeverity;
  state: string;
  district: string;
  city: string;
  lat: number;
  lon: number;
  timestampIST: string;
  source: AuthoritativeSource;
  sourceCategory: DataSourceCategory;
  description: string;
  credibilityScore: number; // 0 to 100
  classificationConfidence: number; // 0 to 100
  verificationStatus: VerificationStatus;
  isDuplicate?: boolean;
  duplicateOfId?: string;
  contributingReportsCount?: number;
  liveParameters?: Partial<LiveWeatherParameters>;
  // AI explainability
  aiEvidence?: {
    sourceReliabilityScore: number;
    weatherConsistencyScore: number;
    spatialCorroborationScore: number;
    temporalScore: number;
    rationale: string;
  };
}

export interface RiverGaugeReading {
  id: string;
  stationName: string;
  riverName: string;
  basinName: string;
  state: string;
  district: string;
  lat: number;
  lon: number;
  currentLevelM: number;
  warningLevelM: number;
  dangerLevelM: number;
  hflM: number; // Highest Flood Level
  status: "NORMAL" | "WARNING" | "DANGER";
  trend: "RISING" | "FALLING" | "STEADY";
  source: "CWC River Gauge";
  observationTimeIST: string;
}

export interface IndiaLocation {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lon: number;
  type: "METRO" | "CITY" | "DISTRICT_HQ" | "RIVER_GAUGE";
}