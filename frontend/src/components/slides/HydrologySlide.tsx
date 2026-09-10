import React, { useState } from "react";
import { Waves, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight, Droplets, MapPin, Gauge, ShieldAlert } from "lucide-react";
import { CWC_RIVER_GAUGES } from "../../data/riverBasins";
import { RiverGaugeReading } from "../../types/weather";

interface HydrologySlideProps {
  onInspectGaugeOnMap: (gauge: RiverGaugeReading) => void;
}

export const HydrologySlide: React.FC<HydrologySlideProps> = ({ onInspectGaugeOnMap }) => {
  const [selectedBasin, setSelectedBasin] = useState<string>("ALL");

  const basins = ["ALL", "Brahmaputra Basin", "Ganga Basin", "Godavari Basin", "Krishna Basin", "Mahanadi Basin", "Indus Basin (India)"];

  const filteredGauges = selectedBasin === "ALL" 
    ? CWC_RIVER_GAUGES 
    : CWC_RIVER_GAUGES.filter(g => g.basinName === selectedBasin);

  const dangerCount = CWC_RIVER_GAUGES.filter(g => g.status === "DANGER").length;
  const warningCount = CWC_RIVER_GAUGES.filter(g => g.status === "WARNING").length;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6 text-xs animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Waves className="w-4 h-4" />
            <span>Central Water Commission (CWC) • Official Telemetry</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">
            National River Basin & Flood Forecasting Command
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Real-time automated gauge readings, danger level exceedance, and barrage discharge across all major Indian river systems.
          </p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center space-x-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center min-w-[100px]">
            <div className="text-[10px] uppercase font-bold text-red-700">Above Danger</div>
            <div className="text-2xl font-bold text-red-600 font-mono">{dangerCount}</div>
            <div className="text-[9px] text-red-500">Immediate Action</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center min-w-[100px]">
            <div className="text-[10px] uppercase font-bold text-amber-800">Above Warning</div>
            <div className="text-2xl font-bold text-amber-600 font-mono">{warningCount}</div>
            <div className="text-[9px] text-amber-600">Disaster Watch</div>
          </div>
        </div>
      </div>

      {/* Basin Filter Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
        {basins.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBasin(b)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedBasin === b
                ? "bg-weather-sky text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-border"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGauges.map((gauge) => {
          const isDanger = gauge.status === "DANGER";
          const isWarning = gauge.status === "WARNING";
          const diffDanger = (gauge.currentLevelM - gauge.dangerLevelM).toFixed(2);
          const percentOfDanger = Math.min(100, Math.round((gauge.currentLevelM / gauge.dangerLevelM) * 100));

          return (
            <div
              key={gauge.id}
              className="bg-white rounded-xl border border-border p-4 shadow-card hover:shadow-panel transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                {/* Station & Basin Header */}
                <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {gauge.basinName}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900 leading-tight">
                      {gauge.riverName} — {gauge.stationName}
                    </h3>
                    <div className="flex items-center space-x-1 text-slate-500 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 text-weather-sky" />
                      <span>{gauge.district}, {gauge.state}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      isDanger
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : isWarning
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {gauge.status}
                  </span>
                </div>

                {/* Level Gauge Display */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-border">
                    <span className="text-[10px] text-slate-500 block">Current Water Level</span>
                    <span className="text-xl font-bold text-navy-900 font-mono">
                      {gauge.currentLevelM} m
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] mt-1 font-semibold text-slate-600">
                      {gauge.trend === "RISING" ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span className={gauge.trend === "RISING" ? "text-red-600" : "text-emerald-600"}>
                        {gauge.trend}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-border">
                    <span className="text-[10px] text-slate-500 block">Danger Mark</span>
                    <span className="text-xl font-bold text-red-600 font-mono">
                      {gauge.dangerLevelM} m
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {Number(diffDanger) >= 0 ? (
                        <span className="text-red-600 font-bold">+{diffDanger} m above danger</span>
                      ) : (
                        <span>{Math.abs(Number(diffDanger))} m to danger</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar towards HFL */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Warning: {gauge.warningLevelM} m</span>
                    <span>All-Time HFL: {gauge.hflM} m</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isDanger ? "bg-red-600" : isWarning ? "bg-amber-500" : "bg-weather-sky"
                      }`}
                      style={{ width: `${percentOfDanger}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button: Inspect on Interactive Map */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Observed: {gauge.observationTimeIST.split(" ")[1]}
                </span>
                <button
                  onClick={() => onInspectGaugeOnMap(gauge)}
                  className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-weather-sky font-semibold rounded text-[11px] flex items-center space-x-1 transition-colors"
                >
                  <span>Locate on Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};