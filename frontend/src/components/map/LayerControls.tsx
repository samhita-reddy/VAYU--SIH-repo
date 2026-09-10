import React from "react";
import { 
  CloudRain, 
  Waves, 
  Activity, 
  Zap, 
  Sun, 
  CheckCircle2, 
  Users, 
  Layers, 
  Filter,
  RotateCcw
} from "lucide-react";
import { MapLayerToggles, DashboardFilters } from "../../types/layers";
import { INDIAN_STATES_AND_UTS } from "../../services/geoIndia";

interface LayerControlsProps {
  layers: MapLayerToggles;
  onToggleLayer: (key: keyof MapLayerToggles) => void;
  filters: DashboardFilters;
  onChangeFilters: (newFilters: Partial<DashboardFilters>) => void;
  onResetFilters: () => void;
}

const layerConfig: {
  key: keyof MapLayerToggles;
  label: string;
  icon: React.ReactNode;
  activeColor: string;
  dotColor: string;
}[] = [
  {
    key: "rainfallIntensity",
    label: "Rainfall Heatmap",
    icon: <CloudRain className="w-4 h-4" />,
    activeColor: "text-accent-blue",
    dotColor: "bg-accent-blue",
  },
  {
    key: "floodRisk",
    label: "Flood Risk Zones",
    icon: <Waves className="w-4 h-4" />,
    activeColor: "text-accent-orange",
    dotColor: "bg-accent-orange",
  },
  {
    key: "riverLevels",
    label: "River Flood Levels",
    icon: <Activity className="w-4 h-4" />,
    activeColor: "text-accent-red",
    dotColor: "bg-accent-red",
  },
  {
    key: "lightning",
    label: "Lightning Activity",
    icon: <Zap className="w-4 h-4" />,
    activeColor: "text-accent-purple",
    dotColor: "bg-accent-purple",
  },
  {
    key: "heatwaveRisk",
    label: "Heatwave Risk",
    icon: <Sun className="w-4 h-4" />,
    activeColor: "text-accent-amber",
    dotColor: "bg-accent-amber",
  },
];

export const LayerControls: React.FC<LayerControlsProps> = ({
  layers,
  onToggleLayer,
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  return (
    <div className="w-60 bg-white border-r border-border flex flex-col h-full overflow-y-auto shadow-card z-10 text-xs">
      {/* Section 1: Map Overlays */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center space-x-2 text-navy-800 font-bold mb-3">
          <Layers className="w-4 h-4 text-accent-blue" />
          <span className="text-[11px] uppercase tracking-wide">Hazard Layers</span>
        </div>

        <div className="space-y-1">
          {layerConfig.map(({ key, label, icon, activeColor, dotColor }) => {
            const isActive = layers[key];
            return (
              <button
                key={key}
                onClick={() => onToggleLayer(key)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-navy-50 border border-border"
                    : "hover:bg-navy-50 border border-transparent"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={isActive ? activeColor : "text-navy-300"}>{icon}</span>
                  <span className={`font-medium ${isActive ? "text-navy-800" : "text-navy-400"}`}>
                    {label}
                  </span>
                </div>
                <div
                  className={`toggle-switch ${isActive ? "active" : ""}`}
                  aria-checked={isActive}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Report Visibility */}
      <div className="p-3 border-b border-border">
        <div className="text-navy-800 font-bold mb-2 text-[11px] uppercase tracking-wide">
          Feed Filters
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onToggleLayer("verifiedReports")}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
              layers.verifiedReports
                ? "bg-navy-50 border border-border"
                : "hover:bg-navy-50 border border-transparent"
            }`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${layers.verifiedReports ? "text-accent-green" : "text-navy-300"}`} />
              <span className={`font-medium ${layers.verifiedReports ? "text-navy-800" : "text-navy-400"}`}>
                Official / Verified
              </span>
            </div>
            <div className={`toggle-switch ${layers.verifiedReports ? "active" : ""}`} />
          </button>

          <button
            onClick={() => onToggleLayer("citizenReports")}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
              layers.citizenReports
                ? "bg-navy-50 border border-border"
                : "hover:bg-navy-50 border border-transparent"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className={`w-3.5 h-3.5 ${layers.citizenReports ? "text-accent-blue" : "text-navy-300"}`} />
              <span className={`font-medium ${layers.citizenReports ? "text-navy-800" : "text-navy-400"}`}>
                Citizen Reports
              </span>
            </div>
            <div className={`toggle-switch ${layers.citizenReports ? "active" : ""}`} />
          </button>
        </div>
      </div>

      {/* Section 3: Geospatial Filters */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-navy-800 font-bold mb-2">
            <div className="flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5 text-navy-400" />
              <span className="text-[11px] uppercase tracking-wide">Geospatial Filters</span>
            </div>
            <button
              onClick={onResetFilters}
              className="text-[11px] text-accent-blue hover:underline flex items-center space-x-0.5 font-medium"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {/* State Filter */}
            <div>
              <label className="block text-[10px] font-bold text-navy-400 mb-1 uppercase tracking-wider">State / UT</label>
              <select
                value={filters.selectedState}
                onChange={(e) => onChangeFilters({ selectedState: e.target.value })}
                className="w-full p-2 bg-navy-50 border border-border rounded-lg text-xs text-navy-800 font-medium focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
              >
                <option value="">All Indian States & UTs</option>
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-[10px] font-bold text-navy-400 mb-1 uppercase tracking-wider">Severity</label>
              <select
                value={filters.selectedSeverity}
                onChange={(e) => onChangeFilters({ selectedSeverity: e.target.value })}
                className="w-full p-2 bg-navy-50 border border-border rounded-lg text-xs text-navy-800 font-medium focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
              >
                <option value="">All Severities</option>
                <option value="CRITICAL">Critical (Red Alert)</option>
                <option value="WARNING">Warning (Orange Alert)</option>
                <option value="WATCH">Watch (Yellow Alert)</option>
              </select>
            </div>

            {/* Event Type Filter */}
            <div>
              <label className="block text-[10px] font-bold text-navy-400 mb-1 uppercase tracking-wider">Hazard Category</label>
              <select
                value={filters.selectedEventType}
                onChange={(e) => onChangeFilters({ selectedEventType: e.target.value })}
                className="w-full p-2 bg-navy-50 border border-border rounded-lg text-xs text-navy-800 font-medium focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
              >
                <option value="">All Hazards</option>
                <option value="FLOOD">Floods & Inundation</option>
                <option value="FLASH_FLOOD">Flash Floods</option>
                <option value="HEAVY_RAIN">Heavy Monsoon Rain</option>
                <option value="RIVER_ALERT">River Level Alerts</option>
                <option value="HEATWAVE">Heatwave Advisory</option>
                <option value="THUNDERSTORM">Thunderstorm & Squall</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Hierarchy Footer */}
        <div className="mt-4 pt-3 border-t border-border bg-navy-50 -mx-3 -mb-3 p-3 rounded-b-lg">
          <div className="text-[10px] font-bold text-navy-400 uppercase tracking-wider mb-1.5">
            Data Hierarchy
          </div>
          <ol className="text-[10px] text-navy-500 space-y-0.5 list-decimal list-inside font-medium">
            <li><span className="font-bold text-navy-800">IMD</span> AWS / Radar</li>
            <li><span className="font-bold text-navy-800">CWC</span> River Gauges</li>
            <li><span className="font-bold text-navy-800">MOSDAC</span> INSAT Satellites</li>
            <li><span className="font-bold text-navy-800">NASA</span> GPM IMERG</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
