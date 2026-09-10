export interface MapLayerToggles {
  rainfallIntensity: boolean;
  floodRisk: boolean;
  riverLevels: boolean;
  lightning: boolean;
  heatwaveRisk: boolean;
  verifiedReports: boolean;
  citizenReports: boolean;
}

export interface DashboardFilters {
  searchQuery: string;
  selectedState: string;
  selectedDistrict: string;
  selectedEventType: string;
  selectedSeverity: string;
  selectedStatus: string;
  selectedSourceCategory: string;
  dateRange: "24h" | "48h" | "7d" | "all";
}

export interface HeatmapPoint {
  lat: number;
  lon: number;
  intensity: number; // 0 to 1
  type: "rainfall" | "flood_risk" | "heatwave";
  locationName: string;
  state: string;
  valueDescription: string;
}