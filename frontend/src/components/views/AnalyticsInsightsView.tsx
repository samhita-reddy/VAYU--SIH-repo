import React, { useState } from "react";
import {
  TrendingUp,
  Brain,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Clock,
  ArrowRight,
  Flame,
  CloudRain,
  Compass,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";

// Trajectories timeline with past observations & +120h forward projection
const TRAJECTORY_DATA = [
  { date: "01 JUN", flood: 3200, cyclone: 1100, heavyRain: 5400, heatWave: 4800, lightning: 3100 },
  { date: "05 JUN", flood: 3800, cyclone: 1400, heavyRain: 6200, heatWave: 4200, lightning: 4100 },
  { date: "10 JUN", flood: 4600, cyclone: 1800, heavyRain: 7900, heatWave: 3600, lightning: 5800 },
  { date: "15 JUN", flood: 5800, cyclone: 2200, heavyRain: 9800, heatWave: 3100, lightning: 7100 },
  { date: "20 JUN", flood: 7100, cyclone: 2600, heavyRain: 12400, heatWave: 2500, lightning: 8300 },
  { date: "25 JUN [TODAY]", flood: 8104, cyclone: 3190, heavyRain: 14710, heatWave: 2100, lightning: 9110 },
  { date: "27 JUN (+48H)", flood: 9400, cyclone: 3800, heavyRain: 13900, heatWave: 1900, lightning: 8600 },
  { date: "30 JUN (+120H)", flood: 7600, cyclone: 4200, heavyRain: 11200, heatWave: 2200, lightning: 6800 },
];

// Top 8 States × 6 Hazard Vectors Matrix
const HAZARD_MATRIX = [
  { state: "Maharashtra", flood: 342, cyclone: 44, heavyRain: 489, heatWave: 12, lightning: 142, cloudburst: 83 },
  { state: "Tamil Nadu", flood: 78, cyclone: 284, heavyRain: 312, heatWave: 165, lightning: 41, cloudburst: 4 },
  { state: "Odisha", flood: 278, cyclone: 431, heavyRain: 360, heatWave: 56, lightning: 400, cloudburst: 32 },
  { state: "West Bengal", flood: 305, cyclone: 318, heavyRain: 295, heatWave: 49, lightning: 274, cloudburst: 18 },
  { state: "Gujarat", flood: 142, cyclone: 210, heavyRain: 168, heatWave: 482, lightning: 35, cloudburst: 2 },
  { state: "Delhi NCR", flood: 124, cyclone: 0, heavyRain: 185, heatWave: 521, lightning: 28, cloudburst: 5 },
  { state: "Karnataka", flood: 190, cyclone: 42, heavyRain: 264, heatWave: 32, lightning: 187, cloudburst: 14 },
  { state: "Kerala", flood: 412, cyclone: 98, heavyRain: 475, heatWave: 9, lightning: 310, cloudburst: 109 },
];

export const AnalyticsInsightsView: React.FC = () => {
  const [activeTimeRange, setActiveTimeRange] = useState("Last 30 Days");

  const getHeatmapColor = (val: number) => {
    if (val === 0) return "bg-slate-50 text-slate-400";
    if (val < 50) return "bg-sky-50 text-sky-800 font-medium";
    if (val < 150) return "bg-sky-100 text-sky-900 font-bold";
    if (val < 300) return "bg-sky-200 text-sky-950 font-bold";
    return "bg-weather-sky text-white font-black";
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-4 md:p-6 space-y-6 text-xs font-sans">
      {/* 1. Header Banner */}
      <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-sky-100 text-sky-800 font-mono tracking-wider">
              SYS MET PREDICTIVE ENGINE V4.2
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              NWP-ENSEMBLE SYNC • 00:04:12 UTC
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-navy-900 tracking-tight mt-1">
            Analytics & Predictive Insights
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Aggregated multimodal climatology, trajectory projections, hazard density matrices, and NLP social intelligence.
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-border">
          {["Past 24 Hours", "Last 7 Days", "Last 30 Days", "Monsoon Season 2026"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                activeTimeRange === range
                  ? "bg-weather-sky text-white shadow-sm"
                  : "text-slate-600 hover:text-navy-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Temporal Weather Incident Trajectories */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-weather-sky" />
              <h3 className="text-sm font-bold text-navy-900">Temporal Weather Incident Trajectories</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Real-time incident frequency across hazard vectors with spline-interpolated forward forecast
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center space-x-1 text-sky-700">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Flood (8,412)</span>
            </span>
            <span className="flex items-center space-x-1 text-cyan-700">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Cyclone (3,220)</span>
            </span>
            <span className="flex items-center space-x-1 text-blue-800">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-700" />
              <span>Heavy Rain (14,890)</span>
            </span>
            <span className="flex items-center space-x-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Heat Wave (6,240)</span>
            </span>
            <span className="flex items-center space-x-1 text-purple-700">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Lightning (9,110)</span>
            </span>
          </div>
        </div>

        {/* Trajectory Recharts Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TRAJECTORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10, fill: "#64748b" }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 10, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  fontSize: "11px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line type="monotone" dataKey="heavyRain" stroke="#1d4ed8" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="flood" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="cyclone" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lightning" stroke="#a855f7" strokeWidth={1.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="heatWave" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Two-Column Grid: Geographic Hazard Matrix & Data Stream Reliability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Geographic Hazard Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-weather-sky" />
                <h3 className="text-sm font-bold text-navy-900">Geographic Hazard Matrix</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Cross-hazard event density across top 8 high-risk Indian states
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              450+ SENSORS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-border">
                  <th className="py-2 px-2">State / UT</th>
                  <th className="py-2 px-2 text-center">Flood</th>
                  <th className="py-2 px-2 text-center">Cyclone</th>
                  <th className="py-2 px-2 text-center">Heavy Rain</th>
                  <th className="py-2 px-2 text-center">Heat Wave</th>
                  <th className="py-2 px-2 text-center">Lightning</th>
                  <th className="py-2 px-2 text-center">Cloudburst</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {HAZARD_MATRIX.map((row) => (
                  <tr key={row.state} className="hover:bg-slate-50/70">
                    <td className="py-2 px-2 font-bold text-navy-900 whitespace-nowrap">
                      {row.state}
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.flood)}`}>
                        {row.flood}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.cyclone)}`}>
                        {row.cyclone}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.heavyRain)}`}>
                        {row.heavyRain}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.heatWave)}`}>
                        {row.heatWave}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.lightning)}`}>
                        {row.lightning}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${getHeatmapColor(row.cloudburst)}`}>
                        {row.cloudburst}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Stream Reliability (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-navy-900">Data Stream Reliability</h3>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Ground-truth validation cross-checks & ingestion latency
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* IMD Radar API */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-navy-900">IMD Radar API</span>
                    <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      GROUND TRUTH
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">98.4%</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Latency: 1.2s • Packet Loss: 0.02% • 42 Doppler Stations
                </div>
              </div>

              {/* INSAT-3D Satellite */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-navy-900">INSAT-3D Satellite</span>
                    <span className="text-[9px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">
                      High Conf
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">95.1%</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Latency: 12.0s • Resolution: 1km Spectral ISRO GEO Channel
                </div>
              </div>

              {/* News Broadcast Feeds */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-bold text-navy-900">News Broadcast Feeds</span>
                    <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                      Moderate
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-700 text-sm">78.6%</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Latency: 4.8 min • Hallucination: 3.1% • 110 Regional TV/Web
                </div>
              </div>

              {/* Citizen Crowdsource App */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-bold text-navy-900">Citizen Crowdsource App</span>
                    <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                      Geotagged
                    </span>
                  </div>
                  <span className="font-mono font-bold text-blue-700 text-sm">72.3%</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Latency: 450ms • GPS Radius Error: &lt;16m • 54,190 Field Users
                </div>
              </div>

              {/* X / Twitter Social NLP */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="font-bold text-navy-900">X / Twitter Social NLP</span>
                    <span className="text-[9px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                      Filtered
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-700 text-sm">61.2%</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Ingestion: 2,433 tweets/sec • Bot Filter: 38.8% discarded
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Sentiment & NLP Intelligence */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-navy-900">AI Sentiment & NLP Intelligence</h3>
          </div>
          <span className="text-[10px] text-slate-500">
            Social signal distillation across regional vernacular languages and broadcast media
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Public Weather Concern Gauge */}
          <div className="bg-slate-50 border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">
              Public Weather Concern Index
            </span>
            <div className="relative w-32 h-20 flex items-center justify-center">
              <div className="text-3xl font-black text-amber-600 font-mono">67%</div>
            </div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              High Anxiety Zone
            </span>
            <p className="text-[10px] text-slate-500 mt-2 max-w-xs">
              Preparedness behavior index: <strong className="text-navy-900">+16.4%</strong> across Maharashtra & Assam. Evacuation readiness queries elevated.
            </p>
          </div>

          {/* Top Trending Met Hashtags */}
          <div className="bg-slate-50 border border-border rounded-xl p-4">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 mb-2">
              <span>Top Trending Met Hashtags</span>
              <span className="text-emerald-600">LIVE COUNT</span>
            </div>

            <div className="space-y-2">
              {[
                { tag: "#MumbaiRains", count: "284,192 posts", change: "+42%" },
                { tag: "#CycloneWarning", count: "142,581 posts", change: "+88%" },
                { tag: "#IMDAlert", count: "96,400 posts", change: "+15%" },
                { tag: "#ChennaiWeather", count: "64,120 posts", change: "+31%" },
                { tag: "#FloodReliefAssam", count: "48,300 posts", change: "+18%" },
              ].map((h) => (
                <div key={h.tag} className="flex items-center justify-between text-xs">
                  <span className="font-bold text-weather-sky hover:underline cursor-pointer">{h.tag}</span>
                  <div className="flex items-center space-x-2 font-mono text-[11px]">
                    <span className="text-slate-600">{h.count}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1 rounded">
                      {h.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NLP Semantic Cluster Density */}
          <div className="bg-slate-50 border border-border rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 mb-2">
                <span>NLP Semantic Cluster Density</span>
                <span className="text-weather-sky font-mono">BERT-INFERRED</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 p-2 text-center">
                <span className="text-xl font-black text-sky-600">Waterlogging</span>
                <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Red Alert</span>
                <span className="text-base font-bold text-navy-900">NDRF</span>
                <span className="text-xs font-semibold text-slate-600">IMD Radar</span>
                <span className="text-sm font-bold text-amber-600">Delayed Trains</span>
                <span className="text-xs text-sky-700 bg-sky-100 px-1.5 py-0.5 rounded">BMC Pump</span>
                <span className="text-xs font-bold text-blue-800">Water Level High</span>
                <span className="text-xs text-slate-700">Stay Indoors</span>
                <span className="text-sm font-bold text-red-700">High Tide Alert</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>COGNITIVE CONFIDENCE: 94.5%</span>
              <span>LANG: EN / HI / MR / TA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ML Prediction Confidence & Early Warnings */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-navy-900">
              ML Prediction Confidence & Early Warnings
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            ACTIVE ENSEMBLE: ECMWF + GFS + IMD-UM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Mumbai */}
          <div className="bg-slate-50 border border-border rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded uppercase">
                  NEXT 48 HOURS
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-weather-sky flex items-center justify-center font-mono font-bold text-[10px] text-weather-sky">
                  87%
                </div>
              </div>

              <h4 className="text-sm font-bold text-navy-900 mt-2">
                Flood Risk — Mumbai Metropolitan
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                High-tide sync with continuous intense convective clouds over MMR and Thane coastal belts.
              </p>

              <div className="my-3 text-[10px] font-mono text-slate-500 space-y-0.5">
                <div>PRECIP: <strong>240mm / 24h</strong></div>
                <div>TIDE PEAK: <strong>4.87m @ 15:12</strong></div>
              </div>
            </div>

            <button className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-border rounded-lg text-[11px] font-bold flex items-center justify-between transition">
              <span>ACTION TAKEN: NDRF Alert Issued (5 Bns)</span>
              <ArrowRight className="w-3.5 h-3.5 text-weather-sky" />
            </button>
          </div>

          {/* Card 2: AP & Odisha */}
          <div className="bg-slate-50 border border-border rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase">
                  NEXT 72 HOURS
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center font-mono font-bold text-[10px] text-amber-600">
                  73%
                </div>
              </div>

              <h4 className="text-sm font-bold text-navy-900 mt-2">
                Cyclone Landfall — AP & Odisha
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Deep depression BOB-04 intensifying into Severe Cyclonic Storm. Landfall vector Kalingapatnam.
              </p>

              <div className="my-3 text-[10px] font-mono text-slate-500 space-y-0.5">
                <div>MAX SUSTAINED: <strong>115 km/h</strong></div>
                <div>SURGE HT: <strong>1.5m - 2.2m</strong></div>
              </div>
            </div>

            <button className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-border rounded-lg text-[11px] font-bold flex items-center justify-between transition">
              <span>ACTION TAKEN: Fishermen Advisory Active</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>

          {/* Card 3: W. Rajasthan */}
          <div className="bg-slate-50 border border-border rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase">
                  NEXT 24 HOURS
                </span>
                <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center font-mono font-bold text-[10px] text-red-600">
                  92%
                </div>
              </div>

              <h4 className="text-sm font-bold text-navy-900 mt-2">
                Extreme Heat Wave — W. Rajasthan
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Dry continental air advection pushing ambient surface temps beyond 47.6°C in Churu & Bikaner.
              </p>

              <div className="my-3 text-[10px] font-mono text-slate-500 space-y-0.5">
                <div>PEAK TEMP: <strong>48.2°C (Churu)</strong></div>
                <div>HUMIDEX: <strong>51.4 (Severe Risk)</strong></div>
              </div>
            </div>

            <button className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-navy-900 border border-border rounded-lg text-[11px] font-bold flex items-center justify-between transition">
              <span>ACTION TAKEN: Red Alert Health Advisory</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
