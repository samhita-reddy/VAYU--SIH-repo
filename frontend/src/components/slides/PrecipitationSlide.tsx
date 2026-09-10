import React from "react";
import { Satellite, CloudRain, Zap, Radio, BarChart2, ShieldCheck, Eye, Layers } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

export const PrecipitationSlide: React.FC = () => {
  const radarStations = [
    { name: "Mumbai (Colaba DWR)", state: "Maharashtra", reflectivityDbz: 54, cloudTopKm: 14.2, status: "Intense Convective Band", rainRateMmHr: 62 },
    { name: "Chennai (Port DWR)", state: "Tamil Nadu", reflectivityDbz: 48, cloudTopKm: 12.0, status: "Squall Line Approaching", rainRateMmHr: 38 },
    { name: "Mukteshwar DWR", state: "Uttarakhand", reflectivityDbz: 58, cloudTopKm: 15.5, status: "Cloudburst Precursor Cell", rainRateMmHr: 84 },
    { name: "Kolkata (Alipore DWR)", state: "West Bengal", reflectivityDbz: 42, cloudTopKm: 11.2, status: "Moderate Convective Shower", rainRateMmHr: 22 },
  ];

  const accumulationData = [
    { zone: "Konkan / Mumbai", gmd24h: 128, gmd48h: 215, imdGroundObs: 132 },
    { zone: "Western Ghats (Wayanad)", gmd24h: 185, gmd48h: 310, imdGroundObs: 194 },
    { zone: "Brahmaputra Valley", gmd24h: 96, gmd48h: 165, imdGroundObs: 92 },
    { zone: "Song Basin (Dehradun)", gmd24h: 92, gmd48h: 140, imdGroundObs: 88 },
    { zone: "Yamuna Catchment", gmd24h: 44, gmd48h: 75, imdGroundObs: 42 },
    { zone: "Coastal Tamil Nadu", gmd24h: 65, gmd48h: 110, imdGroundObs: 68 },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6 text-xs animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Satellite className="w-4 h-4" />
            <span>MOSDAC / ISRO INSAT-3DR & NASA GPM IMERG</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">
            Spatial Precipitation, Satellite & Doppler Radar Studio
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Multi-satellite precipitation estimates (NASA IMERG) cross-validated with IMD Doppler Weather Radar (DWR) reflectivity matrices.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            INSAT-3DR Telemetry Active
          </span>
        </div>
      </div>

      {/* Doppler Radar Live Telemetry Grid */}
      <div>
        <div className="text-xs font-bold text-navy-900 mb-3 flex items-center justify-between">
          <span>Active IMD Doppler Weather Radar (DWR) Stations</span>
          <span className="text-[10px] text-slate-400">Reflectivity Scale: 10 - 65 dBZ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {radarStations.map((dwr) => (
            <div
              key={dwr.name}
              className="bg-white rounded-xl border border-border p-3.5 shadow-card space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-navy-900 text-xs">{dwr.name}</h4>
                  <span className="text-[10px] text-slate-500">{dwr.state}</span>
                </div>
                <Radio className={`w-4 h-4 ${dwr.reflectivityDbz >= 50 ? "text-red-600 animate-pulse" : "text-amber-500"}`} />
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-400 block">Reflectivity</span>
                  <strong className={`font-mono text-sm ${dwr.reflectivityDbz >= 50 ? "text-red-600" : "text-amber-600"}`}>
                    {dwr.reflectivityDbz} dBZ
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Echo Top</span>
                  <strong className="font-mono text-sm text-navy-900">{dwr.cloudTopKm} km</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                <span className="text-slate-500">Estimated Rate:</span>
                <strong className="text-weather-sky font-mono">{dwr.rainRateMmHr} mm/hr</strong>
              </div>
              <div className="text-[10px] font-medium text-slate-600 truncate bg-slate-50 px-2 py-1 rounded">
                {dwr.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accumulation Comparison Chart (Satellite vs Ground Stations) */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-navy-900 text-sm">
              Satellite Rainfall Accumulation vs IMD Ground Observations
            </h3>
            <p className="text-[11px] text-slate-500">
              NASA GPM IMERG 24-hour and 48-hour precipitation accumulation compared against IMD automated surface weather stations.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-weather-sky" />
              <span>NASA GPM 24h</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-600" />
              <span>NASA GPM 48h</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span>IMD Ground AWS</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accumulationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="zone" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2E8F0",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="gmd24h" name="NASA GPM 24h (mm)" fill="#0284C7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gmd48h" name="NASA GPM 48h (mm)" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="imdGroundObs" name="IMD Ground AWS (mm)" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-purple-900 text-[11px] leading-relaxed flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Authoritative Source Labeling Standard:</strong>
            {" "}NASA GPM IMERG estimates are spatial gridded satellite estimates with ~10 km spatial resolution. Direct flood and runoff decisions are corroborated with IMD AWS ground telemetry before red alert dispatch.
          </div>
        </div>
      </div>
    </div>
  );
};