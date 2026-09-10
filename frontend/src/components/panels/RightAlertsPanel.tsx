import React from "react";
import { ShieldAlert, AlertTriangle, ChevronRight, TrendingUp, MapPin } from "lucide-react";
import { WeatherEvent, LiveWeatherParameters } from "../../types/weather";
import { NationalKPIs as NationalKPIsType, StateDistrictImpact } from "../../types/alert";
import { LiveWeatherCard } from "./LiveWeatherCard";
import { NationalKPIs } from "./NationalKPIs";

interface RightAlertsPanelProps {
  criticalAlerts: WeatherEvent[];
  selectedLocationName: string;
  selectedLocationState?: string;
  liveWeather: LiveWeatherParameters | null;
  isLoadingWeather: boolean;
  onRefreshWeather: () => void;
  kpis: NationalKPIsType;
  districtImpacts: StateDistrictImpact[];
  onSelectEvent: (evt: WeatherEvent) => void;
}

export const RightAlertsPanel: React.FC<RightAlertsPanelProps> = ({
  criticalAlerts,
  selectedLocationName,
  selectedLocationState,
  liveWeather,
  isLoadingWeather,
  onRefreshWeather,
  kpis,
  districtImpacts,
  onSelectEvent,
}) => {
  return (
    <aside className="w-[300px] bg-white border-l border-border flex flex-col h-full overflow-y-auto shadow-card z-10 p-3 space-y-3 text-xs">
      {/* 1. National KPIs */}
      <div>
        <div className="text-[10px] font-bold text-navy-400 uppercase tracking-wider mb-2">
          National Multi-Hazard Overview
        </div>
        <NationalKPIs kpis={kpis} />
      </div>

      {/* 2. Live Weather */}
      <LiveWeatherCard
        locationName={selectedLocationName}
        stateName={selectedLocationState}
        parameters={liveWeather}
        isLoading={isLoadingWeather}
        onRefreshLocationWeather={onRefreshWeather}
      />

      {/* 3. Active Critical Alerts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-bold text-navy-800">
            <ShieldAlert className="w-4 h-4 text-alert-critical" />
            <span>Active Critical Alerts</span>
          </div>
          <span className="px-1.5 py-0.5 rounded-md bg-alert-criticalBg text-alert-critical text-[10px] font-bold font-mono border border-alert-critical/20">
            {criticalAlerts.length}
          </span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {criticalAlerts.length === 0 ? (
            <div className="p-3 text-center text-navy-300 bg-navy-50 rounded-lg">
              No active critical red alerts.
            </div>
          ) : (
            criticalAlerts.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="p-2.5 rounded-lg border border-alert-critical/15 bg-alert-criticalBg/40 hover:bg-alert-criticalBg hover:border-alert-critical/30 cursor-pointer transition-all space-y-1 shadow-card group"
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-navy-800 line-clamp-1 group-hover:text-alert-critical transition-colors text-[11px]">
                    {evt.title}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-300 group-hover:text-alert-critical flex-shrink-0 ml-1" />
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-navy-500">
                  <MapPin className="w-3 h-3 text-accent-blue flex-shrink-0" />
                  <span className="truncate">{evt.city}, {evt.state}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-alert-critical/10 text-navy-400">
                  <span>Source: <strong className="text-navy-700">{evt.source}</strong></span>
                  <span className="font-mono">{evt.timestampIST.split(" ")[1]}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Top Affected Districts */}
      <div className="space-y-2 pt-1 border-t border-border">
        <div className="flex items-center space-x-1.5 font-bold text-navy-800">
          <TrendingUp className="w-4 h-4 text-accent-blue" />
          <span>Top Affected Districts</span>
        </div>

        <div className="space-y-1.5">
          {districtImpacts.slice(0, 4).map((item) => (
            <div
              key={`${item.state}-${item.district}`}
              className="p-2 rounded-lg bg-navy-50 border border-border flex items-center justify-between hover:bg-blue-50/30 transition-colors"
            >
              <div>
                <div className="font-semibold text-navy-800 text-[11px]">{item.district}</div>
                <div className="text-[10px] text-navy-400">{item.state} • {item.primaryRisk}</div>
              </div>
              <div className="text-right">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  item.severityScore >= 85
                    ? "bg-alert-criticalBg text-alert-critical"
                    : item.severityScore >= 70
                    ? "bg-alert-warningBg text-accent-orange"
                    : "bg-weather-light text-accent-blue"
                }`}>
                  {item.severityScore}
                </span>
                <div className="text-[9px] text-navy-300 mt-0.5">
                  {item.populationImpactedK}k affected
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
