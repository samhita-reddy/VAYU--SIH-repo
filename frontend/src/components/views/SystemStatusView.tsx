import React, { useState } from "react";
import {
  Activity,
  HardDrive,
  Clock,
  CheckCircle2,
  RefreshCw,
  Play,
  Terminal,
  Copy,
  Trash2,
  AlertTriangle,
  Server,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  Wifi,
  ExternalLink,
  RotateCw
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

const SPARKLINE_TWITTER = [
  { v: 810 }, { v: 830 }, { v: 840 }, { v: 847 }, { v: 865 }, { v: 847 }
];
const SPARKLINE_IMD = [
  { v: 110 }, { v: 115 }, { v: 120 }, { v: 122 }, { v: 118 }, { v: 120 }
];
const SPARKLINE_CITIZEN = [
  { v: 28 }, { v: 31 }, { v: 35 }, { v: 34 }, { v: 38 }, { v: 34 }
];
const SPARKLINE_NEWS = [
  { v: 18 }, { v: 15 }, { v: 12 }, { v: 10 }, { v: 14 }, { v: 12 }
];

const INITIAL_LOGS = [
  { time: "14:28:01.102", level: "INFO", text: "Ingested batch #98124 from IMD Radar Doppler Mumbai (84 telemetry coordinate points, azimuth angle 143°)." },
  { time: "14:28:03.441", level: "INFO", text: "Citizen report #CR-4521 geocoded to 19.0760° N, 72.8777° E (Dharavi, Mumbai) with 94.2% spatial confidence." },
  { time: "14:28:05.819", level: "WARN", text: "High volume Twitter keyword surge detected: #MumbaiRains (+340% velocity spike over 5m moving window)." },
  { time: "14:28:09.004", level: "INFO", text: "NLP Entity extracted: Location=\"Hindmata Flyover\", Severity=\"Critical\", WaterDepth=\"3.2ft\"." },
  { time: "14:28:12.783", level: "ERROR", text: "Satellite downlink frame dropped: INSAT-3D channel 4 timeout. Packet checksum mismatch (0xAE4F != 0x0000). Retrying socket in 15s." },
  { time: "14:28:15.228", level: "SUCCESS", text: "Auto-dispatched early warning alert payload to BMC Disaster Management Cell via REST Webhook (HTTP 200 OK, AckID #BMC-2812)." },
  { time: "14:28:18.905", level: "INFO", text: "Elasticsearch index rollover completed: logs-weather-2026.09.10 (Primary shards: 5, Replicas: 1)." },
  { time: "14:28:22.114", level: "INFO", text: "NDRF district liaison portal synchronized (14 active incidents marked in-progress)." },
  { time: "14:28:25.667", level: "WARN", text: "News scraper worker #3 hit rate limit on regional news RSS feed (HTTP 429 Too Many Requests). Exponential backoff engaged: 480ms delay." },
  { time: "14:28:30.019", level: "INFO", text: "Healthcheck ping OK across all 8 microservices. Zero thread deadlocks detected. Active workers: 64/64." },
];

export const SystemStatusView: React.FC = () => {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [isPolling, setIsPolling] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePollTelemetry = () => {
    setIsPolling(true);
    setTimeout(() => {
      setIsPolling(false);
      const newEntry = {
        time: new Date().toISOString().substring(11, 23),
        level: "INFO",
        text: "Healthcheck query polled: Cluster AP-SOUTH-1A latency 138ms. Zero packet loss on Doppler mesh.",
      };
      setLogs((prev) => [newEntry, ...prev]);
    }, 800);
  };

  const handleCopy = () => {
    const text = logs.map((l) => `[${l.time}] [${l.level}] ${l.text}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-4 md:p-6 space-y-6 text-xs font-sans">
      {/* 1. Header Banner */}
      <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 font-mono tracking-wider">
              TELEMETRY STREAM ACTIVE
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              CLUSTER ZONE AP-SOUTH-1A
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-navy-900 tracking-tight mt-1">
            System Health & Ingestion Mesh
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            High-frequency distributed stream monitoring, queue dynamics, and operational telemetry.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePollTelemetry}
            disabled={isPolling}
            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isPolling ? "animate-spin text-weather-sky" : ""}`} />
            <span>Poll Telemetry</span>
          </button>

          <button className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Stream</span>
          </button>

          <button className="py-2 px-4 bg-weather-sky hover:bg-sky-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition shadow-sm">
            <Play className="w-3.5 h-3.5" />
            <span>Test Endpoints</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records Ingested */}
        <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Records Ingested</span>
            <CheckCircle2 className="w-4 h-4 text-weather-sky" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-mono mt-1">2,418,930</div>
          <div className="text-[10px] text-emerald-600 font-mono font-medium mt-1">
            ↗ +42,180 since 00:00 UTC
          </div>
        </div>

        {/* Cluster Storage Volume */}
        <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Cluster Storage Volume</span>
            <HardDrive className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-mono mt-1">
            847 GB <span className="text-sm text-slate-400 font-normal">/ 2.0 TB</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            42.3% UTILIZED • 1,153 GB FREE
          </div>
        </div>

        {/* Avg Ingest & Query Latency */}
        <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Avg Ingest & Query Latency</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-mono mt-1">142 ms</div>
          <div className="text-[10px] text-emerald-700 font-mono mt-1 flex items-center space-x-1">
            <span>P99: 200ms •</span>
            <span className="font-bold uppercase">IS CLUSTER GREEN</span>
          </div>
        </div>

        {/* High Availability Uptime */}
        <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">High Availability Uptime</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-mono mt-1">99.97%</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            Zero downtime • 90 days • <strong className="text-emerald-700">SLA GRADE A+</strong>
          </div>
        </div>
      </div>

      {/* 3. End-to-End Processing Queue Flow */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-weather-sky" />
              <h3 className="text-sm font-bold text-navy-900">End-to-End Processing Queue Flow</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Real-time microservice message brokers, extraction nodes, and storage routing
            </p>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-weather-sky bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-weather-sky animate-pulse" />
            <span>PIPELINE TOTAL: 1,013 MSG/SEC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Stage 1 */}
          <div className="bg-slate-50 border border-border rounded-xl p-3 relative">
            <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">01 GATEWAY</div>
            <div className="text-xs font-bold text-navy-900 mt-0.5">Ingest Gateway</div>
            <div className="text-sm font-mono font-bold text-weather-sky mt-1">1,013 msg/sec</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Queue: 12 items • 4ms</div>
          </div>

          {/* Stage 2 */}
          <div className="bg-slate-50 border border-border rounded-xl p-3 relative">
            <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">02 HYGIENE</div>
            <div className="text-xs font-bold text-navy-900 mt-0.5">Deduplication</div>
            <div className="text-sm font-mono font-bold text-emerald-600 mt-1">99.2% filtered</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Queue: 8 items • 6ms</div>
          </div>

          {/* Stage 3 */}
          <div className="bg-slate-50 border border-border rounded-xl p-3 relative">
            <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">03 COGNITION</div>
            <div className="text-xs font-bold text-navy-900 mt-0.5">Multilingual NLP</div>
            <div className="text-sm font-mono font-bold text-purple-600 mt-1">IndicBERT v2.4</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Queue: 41 items • 22ms</div>
          </div>

          {/* Stage 4 */}
          <div className="bg-slate-50 border border-border rounded-xl p-3 relative">
            <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">04 SPATIAL</div>
            <div className="text-xs font-bold text-navy-900 mt-0.5">GIS Geocoding</div>
            <div className="text-sm font-mono font-bold text-navy-800 mt-1">Spatial Cluster</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Queue: 19 items • 14ms</div>
          </div>

          {/* Stage 5 */}
          <div className="bg-slate-50 border border-border rounded-xl p-3 relative">
            <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">05 INTEGRITY</div>
            <div className="text-xs font-bold text-navy-900 mt-0.5">Ground-Truth Match</div>
            <div className="text-sm font-mono font-bold text-emerald-600 mt-1">Cross-Validation</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Queue: 5 items • 18ms</div>
          </div>
        </div>
      </div>

      {/* 4. Data Source Pipeline Ingestion Status */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <div className="flex items-center space-x-2">
              <Server className="w-4 h-4 text-weather-sky" />
              <h3 className="text-sm font-bold text-navy-900">Data Source Pipeline Ingestion Status</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live ingress rate, socket response, and streaming packet health
            </p>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
            TOTAL ACTIVE FEEDS: 4 / 5 ONLINE
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Row 1: Twitter */}
          <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-weather-sky flex items-center justify-center font-bold text-xs">
                #
              </div>
              <div>
                <div className="font-bold text-navy-900 flex items-center space-x-1.5">
                  <span>Twitter / X Firehose Stream</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  v2 Enterprise Streaming Endpoint #IN-MUM-01
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Ingestion Rate</div>
                <div className="font-mono font-bold text-navy-900 text-xs">847 ev/min</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Latency</div>
                <div className="font-mono font-bold text-emerald-600 text-xs">42 ms</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
              <div className="w-20 h-6 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SPARKLINE_TWITTER}>
                    <Line type="monotone" dataKey="v" stroke="#0284c7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 2: IMD */}
          <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                IMD
              </div>
              <div>
                <div className="font-bold text-navy-900 flex items-center space-x-1.5">
                  <span>IMD Radar & Weather API</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Doppler Net • India Meteorological Dept
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Ingestion Rate</div>
                <div className="font-mono font-bold text-navy-900 text-xs">120 ev/min</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Latency</div>
                <div className="font-mono font-bold text-emerald-600 text-xs">18 ms</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
              <div className="w-20 h-6 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SPARKLINE_IMD}>
                    <Line type="monotone" dataKey="v" stroke="#0284c7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 3: Citizen */}
          <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                CIT
              </div>
              <div>
                <div className="font-bold text-navy-900 flex items-center space-x-1.5">
                  <span>Citizen Crowdsource Reports</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Mobile PWA Ingress + WhatsApp Bot Relay
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Ingestion Rate</div>
                <div className="font-mono font-bold text-navy-900 text-xs">34 ev/min</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Latency</div>
                <div className="font-mono font-bold text-emerald-600 text-xs">95 ms</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
              <div className="w-20 h-6 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SPARKLINE_CITIZEN}>
                    <Line type="monotone" dataKey="v" stroke="#0284c7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 4: News Scraper */}
          <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                PIB
              </div>
              <div>
                <div className="font-bold text-navy-900 flex items-center space-x-1.5">
                  <span>National News Scraper (DD / PIB)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Degraded • Rate limited by PIB regional CDN
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Ingestion Rate</div>
                <div className="font-mono font-bold text-navy-900 text-xs">12 ev/min</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Latency</div>
                <div className="font-mono font-bold text-amber-600 text-xs">480 ms</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                DEGRADED
              </span>
              <div className="w-20 h-6 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SPARKLINE_NEWS}>
                    <Line type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 5: INSAT */}
          <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-75">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                SAT
              </div>
              <div>
                <div className="font-bold text-navy-900 flex items-center space-x-1.5">
                  <span>INSAT-3D / Kalpana Feed</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Downlink offline • Calibration till 18:00 IST
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Ingestion Rate</div>
                <div className="font-mono font-bold text-slate-400 text-xs">0 ev/min</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase font-bold text-slate-400">Latency</div>
                <div className="font-mono font-bold text-red-600 text-xs">∞ TIMEOUT</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                MAINTENANCE
              </span>
              <div className="w-20 h-6 hidden md:block text-slate-300 font-mono text-center">
                ——————
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Cluster Audit Log Stream Terminal */}
      <div className="bg-navy-950 text-slate-200 border border-navy-800 rounded-2xl p-5 shadow-2xl space-y-3 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-slate-400 text-[11px] pl-2">
              CLUSTER AUDIT LOG STREAM — /var/log/vayudrishti/telemetry.live
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded text-[10px] font-bold flex items-center space-x-1 transition"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? "Copied!" : "Copy Logs"}</span>
            </button>
            <button
              onClick={() => setLogs([])}
              className="px-2.5 py-1 bg-navy-800 hover:bg-navy-700 text-slate-300 rounded text-[10px] font-bold flex items-center space-x-1 transition"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Terminal Text Scroll */}
        <div className="max-h-56 overflow-y-auto space-y-1 text-[11px] leading-relaxed pr-2">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="text-slate-500 flex-shrink-0">[{l.time}]</span>
              <span
                className={`font-bold flex-shrink-0 ${
                  l.level === "INFO"
                    ? "text-sky-400"
                    : l.level === "WARN"
                    ? "text-amber-400"
                    : l.level === "ERROR"
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                [{l.level}]
              </span>
              <span className="text-slate-300">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
