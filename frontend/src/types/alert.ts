import { WeatherEvent, RiverGaugeReading } from "./weather";

export interface NationalKPIs {
  totalEvents: number;
  criticalAlertsCount: number;
  warningsCount: number;
  verifiedCount: number;
  verifiedPercentage: number;
  pendingReviewCount: number;
  activeRiverFloodCount: number;
  lastUpdatedIST: string;
  sourceBreakdown: {
    official: number;
    satellite: number;
    citizen: number;
    simulated: number;
  };
}

export interface StateDistrictImpact {
  state: string;
  district: string;
  severityScore: number; // 0-100
  criticalCount: number;
  warningCount: number;
  primaryRisk: string;
  populationImpactedK: number;
  sheltersActive: number;
  trend: "RISING" | "STABLE" | "RECEDING";
}

export interface TimelineDataPoint {
  date: string;
  dayLabel: string;
  nationalAvgRainfallMm: number;
  riverFloodRiskIndex: number;
  criticalAlerts: number;
  damFlowAvgCusecs: number;
  damReleasesAvgCusecs: number;
}

export interface AlertHotspot {
  id: string;
  title: string;
  district: string;
  state: string;
  clusterCount: number;
  severity: "CRITICAL" | "WARNING";
  contributingEvents: WeatherEvent[];
  riverGaugeNearby?: RiverGaugeReading;
  actionRequired: string;
}