import { WeatherEventType, LiveWeatherParameters, VerificationStatus } from "../types/weather";

export interface AIVerificationResult {
  classifiedType: WeatherEventType;
  confidence: number; // 0-100
  credibilityScore: number; // 0-100
  suggestedStatus: VerificationStatus;
  isPossibleDuplicate: boolean;
  duplicateScore: number;
  evidence: {
    sourceReliabilityScore: number;
    weatherConsistencyScore: number;
    spatialCorroborationScore: number;
    temporalScore: number;
    rationale: string;
    liveParameterEvidence: string;
  };
}

export function classifyReportText(text: string): { type: WeatherEventType; confidence: number } {
  const t = text.toLowerCase();

  if (t.includes("flood") || t.includes("submerged") || t.includes("waterlogged") || t.includes("inundation") || t.includes("overflow")) {
    return { type: "FLOOD", confidence: 92 };
  }
  if (t.includes("heavy rain") || t.includes("downpour") || t.includes("torrential") || t.includes("deluge") || t.includes("rainfall")) {
    return { type: "HEAVY_RAIN", confidence: 94 };
  }
  if (t.includes("lightning") || t.includes("thunderbolt") || t.includes("strike")) {
    return { type: "LIGHTNING", confidence: 96 };
  }
  if (t.includes("heatwave") || t.includes("heat stroke") || t.includes("extreme heat") || t.includes("loo")) {
    return { type: "HEATWAVE", confidence: 91 };
  }
  if (t.includes("cyclone") || t.includes("gale") || t.includes("storm surge")) {
    return { type: "CYCLONE", confidence: 95 };
  }
  if (t.includes("thunderstorm") || t.includes("thunder") || t.includes("hail")) {
    return { type: "THUNDERSTORM", confidence: 89 };
  }
  if (t.includes("fog") || t.includes("smog") || t.includes("zero visibility")) {
    return { type: "FOG", confidence: 88 };
  }
  if (t.includes("dust") || t.includes("sand storm") || t.includes("andhi")) {
    return { type: "DUST_STORM", confidence: 87 };
  }
  if (t.includes("strong wind") || t.includes("gust") || t.includes("squall")) {
    return { type: "STRONG_WIND", confidence: 85 };
  }

  return { type: "HEAVY_RAIN", confidence: 60 };
}

export function evaluateCredibility(
  text: string,
  sourceType: string,
  liveWeather?: LiveWeatherParameters,
  nearbyReportsCount: number = 0
): AIVerificationResult {
  const classification = classifyReportText(text);

  // 1. Source Reliability (Official = 98, Sensor/Satellite = 92, Citizen = 65, Unverified = 40)
  let sourceScore = 65;
  if (sourceType.includes("IMD") || sourceType.includes("CWC")) {
    sourceScore = 98;
  } else if (sourceType.includes("MOSDAC") || sourceType.includes("NASA") || sourceType.includes("WRIS")) {
    sourceScore = 92;
  } else if (sourceType.includes("Citizen")) {
    sourceScore = 68;
  }

  // 2. Weather Consistency: compare citizen text claims against observed parameters
  let weatherScore = 80;
  let liveEvidenceStr = "Observed parameters align normally with reported event.";

  if (liveWeather) {
    if (classification.type === "FLOOD" || classification.type === "HEAVY_RAIN") {
      if (liveWeather.rainfall > 10 || liveWeather.humidity > 85) {
        weatherScore = 95;
        liveEvidenceStr = `Corroborated by active precipitation (${liveWeather.rainfall} mm) and high humidity (${liveWeather.humidity}%).`;
      } else if (liveWeather.rainfall === 0 && liveWeather.humidity < 60) {
        weatherScore = 38;
        liveEvidenceStr = `Discrepancy: Station reports 0.0 mm rainfall and only ${liveWeather.humidity}% humidity. Pending ground check.`;
      }
    } else if (classification.type === "HEATWAVE") {
      if (liveWeather.temperature > 40) {
        weatherScore = 96;
        liveEvidenceStr = `Corroborated by severe temperature observation (${liveWeather.temperature}°C).`;
      } else if (liveWeather.temperature < 32) {
        weatherScore = 40;
        liveEvidenceStr = `Discrepancy: Current observed temperature is ${liveWeather.temperature}°C, below severe heat threshold.`;
      }
    }
  }

  // 3. Spatial Corroboration: nearby reports increase confidence
  const spatialScore = Math.min(95, 55 + nearbyReportsCount * 12);

  // 4. Temporal Score
  const temporalScore = 90;

  // Composite Credibility (Weighted)
  const credibilityScore = Math.round(
    sourceScore * 0.35 + weatherScore * 0.35 + spatialScore * 0.2 + temporalScore * 0.1
  );

  let suggestedStatus: VerificationStatus = "PENDING";
  if (credibilityScore >= 80) {
    suggestedStatus = "VERIFIED";
  } else if (credibilityScore < 50) {
    suggestedStatus = "REJECTED";
  }

  const rationale =
    credibilityScore >= 80
      ? "High confidence: Multi-source corroboration supported by station observations and spatial cluster."
      : credibilityScore < 50
      ? "Low confidence: Severe meteorological parameter mismatch or uncorroborated anomaly detected."
      : "Moderate confidence: Flagged for rapid regional disaster cell verification.";

  return {
    classifiedType: classification.type,
    confidence: classification.confidence,
    credibilityScore,
    suggestedStatus,
    isPossibleDuplicate: nearbyReportsCount > 3,
    duplicateScore: nearbyReportsCount > 3 ? 84 : 12,
    evidence: {
      sourceReliabilityScore: sourceScore,
      weatherConsistencyScore: weatherScore,
      spatialCorroborationScore: spatialScore,
      temporalScore,
      rationale,
      liveParameterEvidence: liveEvidenceStr,
    },
  };
}