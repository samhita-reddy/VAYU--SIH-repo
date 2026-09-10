import React from "react";
import { 
  X, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  Brain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass, 
  Gauge, 
  SunMedium, 
  Eye, 
  CloudRain,
  Radio,
  FileCheck
} from "lucide-react";
import { WeatherEvent, LiveWeatherParameters, RiverGaugeReading } from "../../types/weather";

interface LocationDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: WeatherEvent | null;
  selectedGauge: RiverGaugeReading | null;
  locationName: string;
  liveWeather: LiveWeatherParameters | null;
  isLoadingWeather: boolean;
}

export const LocationDetailDrawer: React.FC<LocationDetailDrawerProps> = ({
  isOpen,
  onClose,
  event,
  selectedGauge,
  locationName,
  liveWeather,
  isLoadingWeather,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="absolute inset-y-0 right-0 w-96 bg-white border-l-2 border-border shadow-elevated z-30 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border bg-navy-50 flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-blue text-white">
              Geospatial Telemetry
            </span>
            {event && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                event.severity === "CRITICAL"
                  ? "bg-alert-critical text-white"
                  : "bg-accent-orange text-white"
              }`}>
                {event.severity}
              </span>
            )}
          </div>
          <h2 className="text-sm font-bold text-navy-900 leading-tight">
            {event ? event.title : selectedGauge ? `${selectedGauge.riverName} River Gauge` : locationName}
          </h2>
          <div className="flex items-center space-x-1 text-navy-400 text-xs mt-1">
            <MapPin className="w-3.5 h-3.5 text-accent-blue flex-shrink-0" />
            <span>{event ? `${event.city}, ${event.state}` : selectedGauge ? `${selectedGauge.stationName}, ${selectedGauge.state}` : locationName}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-navy-300 hover:text-navy-800 hover:bg-navy-100 transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* River Gauge Banner */}
        {selectedGauge && (
          <div className="p-3 rounded-xl border-2 border-alert-critical/20 bg-alert-criticalBg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-alert-critical text-xs">CWC River Gauge</span>
              <span className="font-mono text-[10px] text-alert-critical font-bold px-1.5 py-0.5 bg-white rounded border border-alert-critical/20">
                {selectedGauge.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-navy-500 pt-1">
              <div className="bg-white p-2 rounded-lg border border-alert-critical/10">
                <span className="text-navy-400 text-[10px] block">Current Level</span>
                <span className="text-base font-bold text-navy-900 font-mono">{selectedGauge.currentLevelM} m</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-alert-critical/10">
                <span className="text-navy-400 text-[10px] block">Danger Mark</span>
                <span className="text-base font-bold text-alert-critical font-mono">{selectedGauge.dangerLevelM} m</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-alert-critical/10">
                <span className="text-navy-400 text-[10px] block">Trend</span>
                <span className={`text-xs font-bold ${selectedGauge.trend === "RISING" ? "text-alert-critical" : "text-accent-green"}`}>
                  {selectedGauge.trend}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-alert-critical/10">
                <span className="text-navy-400 text-[10px] block">Historical HFL</span>
                <span className="text-xs font-mono font-semibold text-navy-700">{selectedGauge.hflM} m</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Weather */}
        <div className="p-3 bg-navy-50 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5 font-bold text-navy-800">
              <Thermometer className="w-4 h-4 text-accent-blue" />
              <span>Current Weather</span>
            </div>
            {isLoadingWeather ? (
              <span className="text-[10px] text-accent-blue font-semibold animate-pulse">Fetching...</span>
            ) : liveWeather ? (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                liveWeather.isLive ? "bg-alert-verifiedBg text-accent-green border border-accent-green/20" : "bg-alert-warningBg text-accent-orange border border-accent-orange/20"
              }`}>
                {liveWeather.isLive ? "Live API" : "Fallback Demo"}
              </span>
            ) : null}
          </div>

          {liveWeather && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-border">
                <div>
                  <div className="text-xl font-bold text-navy-900 tracking-tight">
                    {liveWeather.temperature}°C
                  </div>
                  <div className="text-[11px] text-navy-400">
                    Feels {liveWeather.feelsLike}°C • {liveWeather.weatherDescription}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-navy-800 flex items-center justify-end space-x-1">
                    <CloudRain className="w-3.5 h-3.5 text-accent-blue" />
                    <span>{liveWeather.rainfall} mm</span>
                  </div>
                  <div className="text-[10px] text-navy-400">Rainfall</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white p-2 rounded-lg border border-border">
                  <Droplets className="w-3.5 h-3.5 text-accent-blue mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">Humidity</div>
                  <div className="font-bold text-navy-800">{liveWeather.humidity}%</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-border">
                  <Wind className="w-3.5 h-3.5 text-accent-teal mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">Wind</div>
                  <div className="font-bold text-navy-800">{liveWeather.windSpeed} km/h</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-border">
                  <Compass className="w-3.5 h-3.5 text-accent-blue mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">Direction</div>
                  <div className="font-bold text-navy-800">{liveWeather.windDirectionCardinal}</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-border">
                  <Gauge className="w-3.5 h-3.5 text-accent-teal mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">Pressure</div>
                  <div className="font-bold text-navy-800 font-mono">{liveWeather.pressure} hPa</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-border">
                  <SunMedium className="w-3.5 h-3.5 text-accent-amber mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">UV Index</div>
                  <div className="font-bold text-navy-800">{liveWeather.uvIndex}</div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-border">
                  <Eye className="w-3.5 h-3.5 text-navy-400 mx-auto mb-0.5" />
                  <div className="text-[10px] text-navy-400">Visibility</div>
                  <div className="font-bold text-navy-800">{liveWeather.visibility} km</div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white border border-border text-[10px] text-navy-500">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy-400 uppercase">Source:</span>
                  <span className="font-semibold text-navy-700">{liveWeather.source}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5 border-t border-border mt-0.5">
                  <span className="font-bold text-navy-400 uppercase">Observation:</span>
                  <span className="font-mono text-navy-700">{liveWeather.observationTimeIST}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Verification Card */}
        {event && (
          <div className="p-3 bg-blue-50/50 rounded-xl border border-accent-blue/15 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 font-bold text-navy-800">
                <Brain className="w-4 h-4 text-accent-blue" />
                <span>AI Verification</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-accent-blue border border-accent-blue/20">
                {event.classificationConfidence}%
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-accent-blue/10 space-y-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-border">
                <span className="text-navy-500">Credibility Score</span>
                <span className="font-bold text-accent-green text-sm">{event.credibilityScore} / 100</span>
              </div>

              {event.aiEvidence && (
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-navy-500">
                    <span>Source Reliability:</span>
                    <strong className="text-navy-800">{event.aiEvidence.sourceReliabilityScore}%</strong>
                  </div>
                  <div className="flex justify-between text-navy-500">
                    <span>Weather Consistency:</span>
                    <strong className="text-navy-800">{event.aiEvidence.weatherConsistencyScore}%</strong>
                  </div>
                  <div className="flex justify-between text-navy-500">
                    <span>Spatial Corroboration:</span>
                    <strong className="text-navy-800">{event.aiEvidence.spatialCorroborationScore}%</strong>
                  </div>
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-600 text-[11px] leading-relaxed border border-border mt-1">
                    <strong className="text-navy-800 block mb-0.5">Decision Rationale:</strong>
                    {event.aiEvidence.rationale}
                  </div>
                </div>
              )}

              <div className="text-[10px] text-navy-300 italic pt-1 border-t border-border">
                Corroborates field submissions against IMD AWS/Radar telemetry.
              </div>
            </div>
          </div>
        )}

        {/* Incident Metadata */}
        {event && (
          <div className="p-3 bg-white rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between text-navy-800 font-bold">
              <span>Incident Metadata</span>
              <span className="text-navy-400 font-normal text-[11px]">{event.contributingReportsCount || 1} reports</span>
            </div>
            <p className="text-navy-600 text-xs leading-relaxed bg-navy-50 p-2 rounded-lg border border-border">
              {event.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-navy-300 block">Status:</span>
                <span className="font-semibold text-accent-green">{event.verificationStatus}</span>
              </div>
              <div>
                <span className="text-navy-300 block">Category:</span>
                <span className="font-semibold text-navy-700">{event.sourceCategory}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-navy-50 flex items-center justify-between text-navy-400 text-[11px]">
        <span>ID: <code className="font-mono text-navy-700">{event ? event.id : selectedGauge ? selectedGauge.id : "IND-STATION"}</code></span>
        <span className="text-navy-300">Republic of India</span>
      </div>
    </aside>
  );
};
