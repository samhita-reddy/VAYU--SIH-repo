import React, { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from "recharts";
import { 
  Calendar, 
  BarChart3, 
  Flame, 
  ListFilter, 
  ExternalLink,
  ChevronRight,
  MapPin,
  Clock
} from "lucide-react";
import { TimelineDataPoint, StateDistrictImpact } from "../../types/alert";
import { WeatherEvent } from "../../types/weather";

interface BottomAnalyticsProps {
  timelineData: TimelineDataPoint[];
  districtRankings: StateDistrictImpact[];
  recentEvents: WeatherEvent[];
  onSelectEvent: (event: WeatherEvent) => void;
}

export const BottomAnalytics: React.FC<BottomAnalyticsProps> = ({
  timelineData,
  districtRankings,
  recentEvents,
  onSelectEvent,
}) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "rankings" | "feed">("timeline");

  return (
    <div className="h-52 bg-white border-t-2 border-border shadow-panel z-20 flex flex-col overflow-hidden text-xs">
      {/* Tab Navigation */}
      <div className="h-9 px-4 border-b border-border bg-navy-50 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === "timeline"
                ? "border-accent-blue text-accent-blue bg-white"
                : "border-transparent text-navy-400 hover:text-navy-700"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>7-Day Hydrology Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab("rankings")}
            className={`px-3 py-1.5 font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === "rankings"
                ? "border-accent-blue text-accent-blue bg-white"
                : "border-transparent text-navy-400 hover:text-navy-700"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>District Rankings</span>
          </button>

          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3 py-1.5 font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
              activeTab === "feed"
                ? "border-accent-blue text-accent-blue bg-white"
                : "border-transparent text-navy-400 hover:text-navy-700"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Events ({recentEvents.length})</span>
          </button>
        </div>

        <div className="text-[10px] text-navy-300 font-medium">
          IMD, CWC & Open-Meteo feeds
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-3 overflow-hidden">
        {/* TIMELINE */}
        {activeTab === "timeline" && (
          <div className="w-full h-full flex items-center space-x-4">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0077CC" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#0077CC" stopOpacity={0.02}/>
                    </linearGradient>
                    <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C62828" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C62828" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="dayLabel" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={{ stroke: "#D1D9E6" }} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={{ stroke: "#D1D9E6" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#D1D9E6",
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      fontSize: "11px",
                      color: "#0D1321",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="nationalAvgRainfallMm"
                    name="National Avg Rain (mm)"
                    stroke="#0077CC"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRainfall)"
                  />
                  <Area
                    type="monotone"
                    dataKey="criticalAlerts"
                    name="Critical Red Alerts"
                    stroke="#C62828"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAlerts)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Reservoir Metrics */}
            <div className="w-64 bg-navy-50 border border-border p-2.5 rounded-xl flex flex-col justify-between h-full">
              <div className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Reservoir & Dam Outflow</div>
              <div className="space-y-1.5 text-navy-500">
                <div className="flex justify-between items-center">
                  <span>24h Average Flow:</span>
                  <span className="font-bold text-navy-800 font-mono">61,400 cusecs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Inundation Index:</span>
                  <span className="font-bold text-accent-orange font-mono">88 / 100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Displaced Population:</span>
                  <span className="font-bold text-alert-critical font-mono">257.5 K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shelters Activated:</span>
                  <span className="font-bold text-accent-green font-mono">607 Active</span>
                </div>
              </div>
              <div className="text-[9px] text-navy-300 border-t border-border pt-1">
                Source: CWC Hydrology & NDMA Bulletin
              </div>
            </div>
          </div>
        )}

        {/* RANKINGS */}
        {activeTab === "rankings" && (
          <div className="w-full h-full overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {districtRankings.map((item, idx) => (
              <div
                key={`${item.state}-${item.district}`}
                className="bg-navy-50 border border-border p-2 rounded-xl flex flex-col justify-between hover:bg-blue-50/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-navy-300">#{idx + 1}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.severityScore >= 85
                        ? "bg-alert-criticalBg text-alert-critical"
                        : item.severityScore >= 70
                        ? "bg-alert-warningBg text-accent-orange"
                        : "bg-weather-light text-accent-blue"
                    }`}>
                      {item.severityScore}
                    </span>
                  </div>
                  <h4 className="font-bold text-navy-800 truncate text-[11px]">{item.district}</h4>
                  <p className="text-navy-400 text-[10px]">{item.state}</p>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.severityScore >= 85
                          ? "bg-alert-critical"
                          : item.severityScore >= 70
                          ? "bg-accent-orange"
                          : "bg-accent-blue"
                      }`}
                      style={{ width: `${item.severityScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-navy-400">
                    <span>{item.criticalCount} Critical</span>
                    <span className="font-semibold text-navy-700">{item.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS FEED */}
        {activeTab === "feed" && (
          <div className="w-full h-full overflow-y-auto space-y-1.5 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {recentEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="bg-navy-50 border border-border p-2 rounded-xl hover:bg-white hover:border-accent-blue/40 hover:shadow-card cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        evt.severity === "CRITICAL"
                          ? "bg-alert-criticalBg text-alert-critical"
                          : "bg-alert-warningBg text-accent-orange"
                      }`}>
                        {evt.severity}
                      </span>
                      <span className="text-[10px] text-navy-300 font-mono">
                        {evt.timestampIST.split(" ")[1]}
                      </span>
                    </div>
                    <h5 className="font-bold text-navy-800 text-xs line-clamp-1">
                      {evt.title}
                    </h5>
                    <p className="text-navy-400 text-[11px] truncate">
                      {evt.city}, {evt.state}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-navy-300 pt-1.5 border-t border-border mt-1">
                    <span>{evt.source}</span>
                    <span className="font-semibold text-accent-blue">Cred: {evt.credibilityScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
