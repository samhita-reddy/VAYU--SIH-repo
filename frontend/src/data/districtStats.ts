import { StateDistrictImpact, TimelineDataPoint } from "../types/alert";
import { HeatmapPoint } from "../types/layers";

export const TIMELINE_7_DAYS: TimelineDataPoint[] = [
  { date: "02-Sep", dayLabel: "Wed", nationalAvgRainfallMm: 14.2, riverFloodRiskIndex: 32, criticalAlerts: 4, damFlowAvgCusecs: 18200, damReleasesAvgCusecs: 14500 },
  { date: "03-Sep", dayLabel: "Thu", nationalAvgRainfallMm: 18.6, riverFloodRiskIndex: 41, criticalAlerts: 6, damFlowAvgCusecs: 22400, damReleasesAvgCusecs: 19100 },
  { date: "04-Sep", dayLabel: "Fri", nationalAvgRainfallMm: 28.4, riverFloodRiskIndex: 58, criticalAlerts: 11, damFlowAvgCusecs: 34100, damReleasesAvgCusecs: 29800 },
  { date: "05-Sep", dayLabel: "Sat", nationalAvgRainfallMm: 36.1, riverFloodRiskIndex: 69, criticalAlerts: 15, damFlowAvgCusecs: 46500, damReleasesAvgCusecs: 42000 },
  { date: "06-Sep", dayLabel: "Sun", nationalAvgRainfallMm: 31.0, riverFloodRiskIndex: 64, criticalAlerts: 12, damFlowAvgCusecs: 41200, damReleasesAvgCusecs: 38400 },
  { date: "07-Sep", dayLabel: "Mon", nationalAvgRainfallMm: 42.8, riverFloodRiskIndex: 82, criticalAlerts: 19, damFlowAvgCusecs: 54900, damReleasesAvgCusecs: 51200 },
  { date: "08-Sep", dayLabel: "Today", nationalAvgRainfallMm: 48.5, riverFloodRiskIndex: 88, criticalAlerts: 24, damFlowAvgCusecs: 61400, damReleasesAvgCusecs: 58900 },
];

export const DISTRICT_IMPACT_RANKINGS: StateDistrictImpact[] = [
  {
    state: "Kerala",
    district: "Wayanad",
    severityScore: 94,
    criticalCount: 7,
    warningCount: 4,
    primaryRisk: "Catchment Debris Runoff & Flash Flooding",
    populationImpactedK: 48.2,
    sheltersActive: 38,
    trend: "RISING",
  },
  {
    state: "Assam",
    district: "Kamrup Metropolitan",
    severityScore: 91,
    criticalCount: 6,
    warningCount: 5,
    primaryRisk: "Brahmaputra Riverine Inundation",
    populationImpactedK: 64.5,
    sheltersActive: 44,
    trend: "RISING",
  },
  {
    state: "Maharashtra",
    district: "Mumbai Suburban",
    severityScore: 88,
    criticalCount: 5,
    warningCount: 8,
    primaryRisk: "Urban Flash Inundation & High-Tide Surge",
    populationImpactedK: 124.0,
    sheltersActive: 26,
    trend: "RISING",
  },
  {
    state: "Delhi (NCT)",
    district: "Central Delhi",
    severityScore: 82,
    criticalCount: 4,
    warningCount: 3,
    primaryRisk: "Yamuna Floodplain Submergence",
    populationImpactedK: 32.8,
    sheltersActive: 22,
    trend: "RISING",
  },
  {
    state: "Uttarakhand",
    district: "Dehradun",
    severityScore: 78,
    criticalCount: 3,
    warningCount: 5,
    primaryRisk: "Himalayan Foothill Cloudburst Runoff",
    populationImpactedK: 18.5,
    sheltersActive: 14,
    trend: "STABLE",
  },
  {
    state: "West Bengal",
    district: "Kolkata",
    severityScore: 74,
    criticalCount: 2,
    warningCount: 6,
    primaryRisk: "Tidal Lock & Drainage Surcharging",
    populationImpactedK: 85.0,
    sheltersActive: 19,
    trend: "STABLE",
  },
  {
    state: "Telangana",
    district: "Hyderabad",
    severityScore: 68,
    criticalCount: 2,
    warningCount: 4,
    primaryRisk: "Musi River & Low-Lying Stormwater Surging",
    populationImpactedK: 41.2,
    sheltersActive: 12,
    trend: "RECEDING",
  },
  {
    state: "Tamil Nadu",
    district: "Chennai",
    severityScore: 64,
    criticalCount: 1,
    warningCount: 5,
    primaryRisk: "Coastal Squall & Micro-Inundation",
    populationImpactedK: 35.0,
    sheltersActive: 10,
    trend: "RECEDING",
  },
];

export const INDIA_HEATMAP_POINTS: HeatmapPoint[] = [
  // Heavy Monsoon Belt: Konkan / Mumbai
  { lat: 19.0760, lon: 72.8777, intensity: 0.95, type: "rainfall", locationName: "Mumbai Metropolitan", state: "Maharashtra", valueDescription: "128 mm (Heavy Convective)" },
  { lat: 19.2183, lon: 72.9781, intensity: 0.88, type: "rainfall", locationName: "Thane", state: "Maharashtra", valueDescription: "110 mm" },
  { lat: 18.9220, lon: 72.8347, intensity: 0.85, type: "rainfall", locationName: "Colaba", state: "Maharashtra", valueDescription: "98 mm" },
  
  // Assam & Northeast: Brahmaputra Valley
  { lat: 26.1445, lon: 91.7362, intensity: 0.92, type: "flood_risk", locationName: "Guwahati Valley", state: "Assam", valueDescription: "High Riverine Flood" },
  { lat: 27.4728, lon: 94.9120, intensity: 0.96, type: "flood_risk", locationName: "Dibrugarh", state: "Assam", valueDescription: "Severe Riverine Threat" },
  { lat: 26.6528, lon: 92.7926, intensity: 0.82, type: "flood_risk", locationName: "Tezpur", state: "Assam", valueDescription: "Warning Level Exceeded" },
  { lat: 25.5788, lon: 91.8933, intensity: 0.90, type: "rainfall", locationName: "Shillong Plateau", state: "Meghalaya", valueDescription: "145 mm (High Catchment)" },
  
  // Kerala & Western Ghats
  { lat: 11.6050, lon: 76.0827, intensity: 0.98, type: "rainfall", locationName: "Wayanad Hills", state: "Kerala", valueDescription: "185 mm / Extreme Runoff" },
  { lat: 10.1076, lon: 76.3516, intensity: 0.84, type: "flood_risk", locationName: "Kochi Periyar Basin", state: "Kerala", valueDescription: "Spillway Discharge Surge" },
  { lat: 9.5916, lon: 76.5222, intensity: 0.78, type: "rainfall", locationName: "Kottayam", state: "Kerala", valueDescription: "82 mm" },

  // Northern Plains & Yamuna
  { lat: 28.6619, lon: 77.2519, intensity: 0.89, type: "flood_risk", locationName: "Delhi Yamuna Belt", state: "Delhi (NCT)", valueDescription: "Water Level Above Danger Mark" },
  { lat: 30.3165, lon: 78.0322, intensity: 0.86, type: "rainfall", locationName: "Dehradun Foothills", state: "Uttarakhand", valueDescription: "92 mm Cloudburst Risk" },

  // Eastern River Basins: Bihar & Bengal
  { lat: 25.6127, lon: 85.1442, intensity: 0.80, type: "flood_risk", locationName: "Patna Ganga Belt", state: "Bihar", valueDescription: "Approaching Warning Level" },
  { lat: 22.5726, lon: 88.3639, intensity: 0.75, type: "rainfall", locationName: "Kolkata Hooghly Surge", state: "West Bengal", valueDescription: "76 mm with High Tide" },

  // Rajasthan / Northwest: Heatwave Risk
  { lat: 26.9124, lon: 75.7873, intensity: 0.72, type: "heatwave", locationName: "Jaipur District", state: "Rajasthan", valueDescription: "42.5°C Thermal Index" },
  { lat: 26.2389, lon: 73.0243, intensity: 0.85, type: "heatwave", locationName: "Jodhpur", state: "Rajasthan", valueDescription: "44.1°C Severe Heat" },
  { lat: 28.0229, lon: 73.3119, intensity: 0.88, type: "heatwave", locationName: "Bikaner", state: "Rajasthan", valueDescription: "45.0°C Heatwave" },
];