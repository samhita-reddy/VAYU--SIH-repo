import React, { useState } from "react";
import {
  Filter,
  Search,
  Download,
  FileText,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Camera,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Send,
  ExternalLink,
  ShieldCheck,
  Building,
  RefreshCw,
  Eye,
  Calendar,
  Sliders,
  Check,
  Share2,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Zap,
  Activity,
  Compass,
  AlertOctagon
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

interface IncidentRecord {
  id: string;
  timestamp: string;
  event: string;
  eventType: "flash_flood" | "cyclone" | "heavy_rain" | "lightning" | "thunderstorm" | "river_flood" | "landslide";
  location: string;
  territory: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  ingestionNode: string;
  verificationScore: number;
  verificationStatus: "Verified" | "Match" | "Pending";
  lat: number;
  lon: number;
  mediaCount: number;
  reporterName: string;
  reporterTrust: string;
  description: string;
  sensors: {
    precipitation: string;
    windGust: string;
    barometric: string;
    stationId: string;
  };
}

const SAMPLE_RECORDS: IncidentRecord[] = [
  {
    id: "#VD-2026-9812",
    timestamp: "10 Sep, 14:32:58",
    event: "Flash Flood",
    eventType: "flash_flood",
    location: "Mumbai (Hindmata / Dadar)",
    territory: "Maharashtra // Ward F/South",
    severity: "CRITICAL",
    ingestionNode: "Citizen App v4",
    verificationScore: 94,
    verificationStatus: "Match",
    lat: 19.0178,
    lon: 72.8478,
    mediaCount: 3,
    reporterName: "Rajesh M. (Ward Warden 80)",
    reporterTrust: "KYC VERIFIED CITIZEN • TRUST SCORE: 0.9/10",
    description:
      "Severe waterlogging exceeding 3.8 feet under Hindmata flyover junction. Ingress into ground-floor retail establishments. 6 BEST city transit buses trapped. Water pump station auxiliary engine tripped at 14:15. Emergency evacuation transit required for senior living shelter 200m east.",
    sensors: {
      stationId: "AWS ID: BOM-084",
      precipitation: "142 mm / hour (Peak)",
      windGust: "68 km/h (WSW)",
      barometric: "994 hPa (Falling)",
    },
  },
  {
    id: "#VD-2026-9804",
    timestamp: "10 Sep, 14:18:12",
    event: "Severe Cyclone",
    eventType: "cyclone",
    location: "Puri (Golden Beach Sector)",
    territory: "Odisha // Coastal Grid A1",
    severity: "CRITICAL",
    ingestionNode: "Satellite INSAT-3DR",
    verificationScore: 99,
    verificationStatus: "Verified",
    lat: 19.8135,
    lon: 85.8312,
    mediaCount: 4,
    reporterName: "Automated ISRO Telemetry Relay",
    reporterTrust: "GOV SATELLITE NODE • TRUST: 1.0/10",
    description:
      "Deep cyclonic eyewall outer band impact. Astronomical storm surge wave of 3.2 meters breach over marine drive walkway. Power distribution poles down in Balukhand sanctuary zone.",
    sensors: {
      stationId: "SAT NODE: INSAT-3DR-OD",
      precipitation: "88 mm / hour",
      windGust: "115 km/h (E)",
      barometric: "982 hPa (Severe Low)",
    },
  },
  {
    id: "#VD-2026-9799",
    timestamp: "10 Sep, 13:54:33",
    event: "Heavy Rain",
    eventType: "heavy_rain",
    location: "Chennai (Velachery Canal)",
    territory: "Tamil Nadu // Zone 13 Adyar",
    severity: "HIGH",
    ingestionNode: "X / Social NLP",
    verificationScore: 88,
    verificationStatus: "Match",
    lat: 12.9791,
    lon: 80.2185,
    mediaCount: 1,
    reporterName: "@ChennaiRainsUpdate",
    reporterTrust: "VERIFIED CITIZEN WEATHER NETWORK",
    description:
      "Canal carrying capacity at 98%. Water overflowing onto bypass road near Phoenix MarketCity. Rapid localized street runoff reaching 1.2 feet within 40 minutes.",
    sensors: {
      stationId: "AWS ID: CHN-ADYAR-02",
      precipitation: "65 mm / hour",
      windGust: "45 km/h (NE)",
      barometric: "1002 hPa",
    },
  },
  {
    id: "#VD-2026-9791",
    timestamp: "10 Sep, 13:38:09",
    event: "Severe Lightning",
    eventType: "lightning",
    location: "Kolkata (Salt Lake Sector V)",
    territory: "West Bengal // Bidhannagar",
    severity: "HIGH",
    ingestionNode: "IMD Lightning Net",
    verificationScore: 96,
    verificationStatus: "Verified",
    lat: 22.5868,
    lon: 88.4178,
    mediaCount: 0,
    reporterName: "Damini Lightning Sensor Network",
    reporterTrust: "OFFICIAL IITM-IMD NETWORK",
    description:
      "Multiple cloud-to-ground lightning discharge pulses (>42 kA) registered across Salt Lake IT park sub-station grid. Power trip reported at 13:35.",
    sensors: {
      stationId: "SENSOR: DM-KOL-09",
      precipitation: "41 mm / hour",
      windGust: "58 km/h (SE)",
      barometric: "1001 hPa",
    },
  },
  {
    id: "#VD-2026-9774",
    timestamp: "10 Sep, 13:16:04",
    event: "Thunderstorm",
    eventType: "thunderstorm",
    location: "Bengaluru (Outer Ring Road)",
    territory: "Karnataka // Mahadevapura",
    severity: "MEDIUM",
    ingestionNode: "Citizen App v4",
    verificationScore: 84,
    verificationStatus: "Verified",
    lat: 12.9249,
    lon: 77.6769,
    mediaCount: 3,
    reporterName: "Sunil K. (EcoSpace Facilities)",
    reporterTrust: "REGISTERED USER • TRUST: 8.5/10",
    description:
      "Sudden localized squall and heavy downpour caused Bellandur service road underpass inundation up to 2.5 feet. BBMP suction pumps deployed on-site.",
    sensors: {
      stationId: "AWS ID: BLR-EC-14",
      precipitation: "38 mm / hour",
      windGust: "54 km/h (W)",
      barometric: "1004 hPa",
    },
  },
  {
    id: "#VD-2026-9762",
    timestamp: "10 Sep, 12:44:50",
    event: "River Inundation",
    eventType: "river_flood",
    location: "Guwahati (Brahmaputra Bank)",
    territory: "Assam // Kamrup Metro",
    severity: "CRITICAL",
    ingestionNode: "CWC Hydrology",
    verificationScore: 97,
    verificationStatus: "Verified",
    lat: 26.1859,
    lon: 91.7477,
    mediaCount: 1,
    reporterName: "CWC Bharalumukh Gauge Station",
    reporterTrust: "CWC OFFICIAL TELEMETRY",
    description:
      "Brahmaputra water level exceeded Danger Mark (49.68m) by +0.84m. Water entering low-lying wards of Anil Nagar, Nabin Nagar, and Panbazar ghat. SDRF motorized boats on standby.",
    sensors: {
      stationId: "GAUGE: CWC-GAU-01",
      precipitation: "52 mm / hour",
      windGust: "30 km/h (E)",
      barometric: "1000 hPa",
    },
  },
  {
    id: "#VD-2026-9749",
    timestamp: "10 Sep, 12:05:22",
    event: "Landslip / Rock",
    eventType: "landslide",
    location: "Shimla (NH-5 bypass corridor)",
    territory: "Himachal Pradesh // Solan Belt",
    severity: "HIGH",
    ingestionNode: "News Scraper",
    verificationScore: 91,
    verificationStatus: "Verified",
    lat: 31.1048,
    lon: 77.1734,
    mediaCount: 5,
    reporterName: "HPSDMA Incident Liaison",
    reporterTrust: "VERIFIED STATE DISASTER FEED",
    description:
      "Slope destabilization triggered by continuous torrential rainfall. Boulders and mud debris deposited across National Highway 5 near Dhalli tunnel. BRO heavy earthmovers mobilizing for single-lane clearance.",
    sensors: {
      stationId: "GEO SENSOR: HP-SLN-03",
      precipitation: "74 mm / hour",
      windGust: "36 km/h (N)",
      barometric: "988 hPa",
    },
  },
];

const RAIN_SPARKLINE_DATA = [
  { t: "13:30", val: 24 },
  { t: "13:40", val: 42 },
  { t: "13:50", val: 68 },
  { t: "14:00", val: 95 },
  { t: "14:10", val: 120 },
  { t: "14:20", val: 142 },
  { t: "14:30", val: 135 },
];

export const DataExplorerView: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<string>("#VD-2026-9812");
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "#VD-2026-9812",
    "#VD-2026-9804",
    "#VD-2026-9799",
  ]);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedPipeline, setSelectedPipeline] = useState<"All" | "Verified" | "Pending" | "Rejected">("Verified");
  const [activeSources, setActiveSources] = useState<string[]>([
    "X / Twitter",
    "Citizen App",
    "IMD Radar",
    "News Scraper",
    "Satellite Feed",
  ]);
  const [temporalWindow, setTemporalWindow] = useState<string>("7d");
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSource = (source: string) => {
    setActiveSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const handleTriggerAction = (actionText: string) => {
    setActionSuccessMessage(`✓ Executed: ${actionText}`);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const selectedRecord =
    SAMPLE_RECORDS.find((r) => r.id === selectedRowId) || SAMPLE_RECORDS[0];

  const getEventBadgeStyle = (eventType: IncidentRecord["eventType"]) => {
    switch (eventType) {
      case "flash_flood":
        return "bg-cyan-950/80 text-cyan-400 border border-cyan-800/80";
      case "cyclone":
        return "bg-amber-950/80 text-amber-400 border border-amber-800/80";
      case "heavy_rain":
        return "bg-blue-950/80 text-blue-400 border border-blue-800/80";
      case "lightning":
        return "bg-yellow-950/80 text-yellow-400 border border-yellow-700/80";
      case "thunderstorm":
        return "bg-sky-950/80 text-sky-400 border border-sky-800/80";
      case "river_flood":
        return "bg-blue-950/90 text-cyan-300 border border-cyan-700/80";
      case "landslide":
        return "bg-orange-950/80 text-orange-400 border border-orange-800/80";
      default:
        return "bg-slate-800 text-slate-300 border border-slate-700";
    }
  };

  const getSeverityPill = (sev: "CRITICAL" | "HIGH" | "MEDIUM") => {
    if (sev === "CRITICAL") {
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/60 text-red-400 border border-red-800/60 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>CRITICAL</span>
        </span>
      );
    }
    if (sev === "HIGH") {
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 text-amber-400 border border-amber-800/60 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>HIGH</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950/60 text-sky-300 border border-sky-800/60 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <span>MED / LOW</span>
      </span>
    );
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080d1a] text-slate-200 p-4 md:p-6 space-y-4 text-xs font-sans">
      {/* Toast Notification */}
      {actionSuccessMessage && (
        <div className="fixed top-16 right-6 z-[9999] bg-cyan-950/90 border border-cyan-500 text-cyan-200 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-xs">{actionSuccessMessage}</span>
        </div>
      )}

      {/* 1. Header Bar matching Screenshot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-900/40">
            <Layers className="w-4 h-4" />
          </div>
          <h1 className="text-base font-bold text-white tracking-wide uppercase font-mono">
            TELEMETRY DATA EXPLORER
          </h1>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-800/90 text-cyan-300 border border-slate-700/80 font-mono tracking-wider">
            NAT-ARCHIVE // ARCH-LIVE-SYNC3
          </span>
          <span className="text-[11px] text-cyan-400 font-mono font-medium flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-1.5 animate-ping" />
            INDEX REFRESH: 4s AGO
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            • QUERY ENGINE: REDSHIFT V4.8
          </span>
        </div>

        {/* Quick Search in Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports, locations, events (e.g. Mumbai Flood, Cyclone)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0e1626] border border-slate-700/80 text-slate-200 text-xs rounded-xl pl-9 pr-8 py-1.5 w-64 md:w-80 focus:outline-none focus:border-cyan-500/80 placeholder:text-slate-500 transition-all"
            />
            <span className="absolute right-2.5 top-2 text-[9px] font-mono text-slate-500 bg-slate-800 px-1 rounded">
              ⌘K
            </span>
          </div>
          <button
            onClick={() => handleTriggerAction("Redshift Cache Synchronized")}
            className="p-2 rounded-xl bg-[#0e1626] border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
            title="Refresh Redshift Index"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Collapsible Filters Console */}
      <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden">
        {/* Active Filter Chips Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1.5">
            <div className="flex items-center space-x-1.5 text-slate-200 font-bold">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filters</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500 text-navy-950">
                3 active
              </span>
            </div>

            <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg text-[11px] bg-[#121c2e] border border-cyan-700/40 text-cyan-300">
              <span className="font-semibold text-slate-400">EVENT:</span>
              <span className="font-bold">Flood, Cyclone</span>
              <span className="cursor-pointer text-slate-400 hover:text-white">×</span>
            </span>

            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg text-[11px] bg-[#121c2e] border border-cyan-700/40 text-cyan-300">
              <span className="font-semibold text-slate-400">STATE:</span>
              <span className="font-bold">Maharashtra, Tamil Nadu</span>
              <span className="cursor-pointer text-slate-400 hover:text-white">×</span>
            </span>

            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg text-[11px] bg-[#121c2e] border border-cyan-700/40 text-cyan-300">
              <span className="font-semibold text-slate-400">STATUS:</span>
              <span className="font-bold text-emerald-400">Verified</span>
              <span className="cursor-pointer text-slate-400 hover:text-white">×</span>
            </span>
          </div>

          <button
            onClick={() => setFilterCollapsed(!filterCollapsed)}
            className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 text-xs font-medium transition-colors"
          >
            <span>{filterCollapsed ? "Expand controls" : "Collapse controls"}</span>
            {filterCollapsed ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Filter Body */}
        {!filterCollapsed && (
          <div className="p-5 space-y-4 bg-[#090e1a]/80">
            {/* Top Row: Temporal Window & Municipal Resolution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Temporal Window */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>TEMPORAL WINDOW</span>
                </label>
                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <button
                    onClick={() => setTemporalWindow("today")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      temporalWindow === "today"
                        ? "bg-cyan-500 text-navy-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-[#11192a] border-slate-700/80 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setTemporalWindow("7d")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      temporalWindow === "7d"
                        ? "bg-cyan-500 text-navy-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-[#11192a] border-slate-700/80 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    Last 7 Days (Active)
                  </button>
                  <button
                    onClick={() => setTemporalWindow("30d")}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      temporalWindow === "30d"
                        ? "bg-cyan-500 text-navy-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-[#11192a] border-slate-700/80 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    Last 30 Days
                  </button>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#11192a] border border-slate-700/80 text-slate-300 text-xs">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Manual:</span>
                    <span className="font-mono text-cyan-300">01 Sep – 10 Sep 2026</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </div>
                </div>
              </div>

              {/* Municipal / Ward Resolution */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <Building className="w-3 h-3 text-cyan-400" />
                  <span>MUNICIPAL / WARD RESOLUTION</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-cyan-400" />
                    <input
                      type="text"
                      defaultValue="Mumbai, Bandra West (BMC G/North Ward)"
                      className="w-full bg-[#11192a] border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    onClick={() => handleTriggerAction("BMC Ward Boundaries Autocompleted")}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 text-[11px] font-bold hover:bg-cyan-900/40 transition-colors uppercase tracking-wider"
                  >
                    AUTOCOMPLETE
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Phenomenon, State, Severity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Meteorological Phenomenon */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  METEOROLOGICAL PHENOMENON
                </label>
                <div className="bg-[#11192a] border border-slate-700/80 rounded-xl p-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold flex items-center space-x-1">
                      <span>Flood</span>
                      <span className="text-slate-400">×</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold flex items-center space-x-1">
                      <span>Cyclone</span>
                      <span className="text-slate-400">×</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      +8 more
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              </div>

              {/* Federal State / UT */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  FEDERAL STATE / UT
                </label>
                <div className="bg-[#11192a] border border-slate-700/80 rounded-xl p-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold flex items-center space-x-1">
                      <span>Maharashtra</span>
                      <span className="text-slate-400">×</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold flex items-center space-x-1">
                      <span>Tamil Nadu</span>
                      <span className="text-slate-400">×</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      +8 states
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              </div>

              {/* Severity Threshold */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SEVERITY THRESHOLD
                </label>
                <div className="bg-[#11192a] border border-slate-700/80 rounded-xl px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">Critical & High Hazard Level</span>
                    <div className="flex items-center space-x-2 text-[10px] font-bold">
                      <span className="flex items-center space-x-1 text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>CRITICAL</span>
                      </span>
                      <span className="flex items-center space-x-1 text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>HIGH</span>
                      </span>
                      <span className="flex items-center space-x-1 text-cyan-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>MED/LOW</span>
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Verification Pipeline, Source Nodes, Apply Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              {/* Verification Pipeline Tabs */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  VERIFICATION PIPELINE
                </span>
                <div className="flex items-center space-x-1 bg-[#11192a] p-1 rounded-xl border border-slate-700/80">
                  {(["All", "Verified", "Pending", "Rejected"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedPipeline(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPipeline === tab
                          ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/20"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Telemetry Nodes Checkboxes */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  SOURCE TELEMETRY NODES
                </span>
                <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
                  {[
                    "X / Twitter",
                    "Citizen App",
                    "IMD Radar",
                    "News Scraper",
                    "Satellite Feed",
                  ].map((src) => {
                    const isChecked = activeSources.includes(src);
                    return (
                      <button
                        key={src}
                        onClick={() => toggleSource(src)}
                        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          isChecked
                            ? "bg-cyan-950/70 border-cyan-500/50 text-cyan-300"
                            : "bg-[#11192a] border-slate-800 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded flex items-center justify-center border text-[9px] ${
                            isChecked
                              ? "bg-cyan-500 border-cyan-400 text-navy-950"
                              : "border-slate-600"
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{src}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset & Apply Filters */}
              <div className="flex items-center space-x-2.5 pt-2 lg:pt-0">
                <button
                  onClick={() => {
                    setSelectedPipeline("All");
                    setActiveSources(["X / Twitter", "Citizen App", "IMD Radar", "News Scraper", "Satellite Feed"]);
                    handleTriggerAction("Filters reset to default telemetry scope");
                  }}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#11192a] border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => handleTriggerAction("Applied 3 active filters against Redshift telemetry")}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-wider"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Record Count, Data Stream & View/Export Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3 flex-wrap">
          <span className="font-bold text-white text-sm">
            2,847 <span className="font-normal text-slate-400">Incident telemetry records (out of 12,647 synced events)</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>STREAM: ACTIVE 88.4 Kbps</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Table / Grid Toggle */}
          <div className="flex items-center bg-[#11192a] border border-slate-700/80 rounded-xl p-0.5 text-xs font-semibold">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                viewMode === "table"
                  ? "bg-cyan-500 text-navy-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-navy-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>

          {/* Export Actions */}
          <button
            onClick={() => handleTriggerAction("Exported 2,847 telemetry rows to CSV")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#11192a] border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleTriggerAction("Generated PDF Intelligence Dossier")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#11192a] border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>PDF Dossier</span>
          </button>
          <button
            onClick={() => handleTriggerAction("Webhook API token copied to clipboard")}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#11192a] border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Webhook API</span>
          </button>
        </div>
      </div>

      {/* 4. Bulk Action Banner (when records selected) */}
      {checkedIds.length > 0 && (
        <div className="bg-[#0b172a] border border-cyan-600/50 rounded-2xl p-3 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-cyan-950/50 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 text-cyan-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{checkedIds.length} Records Selected</span>
            </span>
            <span className="text-slate-400 text-xs">
              Bulk verification batch ready for execution
            </span>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-1.5">
            <button
              onClick={() => handleTriggerAction(`Verified batch of ${checkedIds.length} records`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-sm transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify Selected ({checkedIds.length})</span>
            </button>
            <button
              onClick={() => handleTriggerAction(`Flagged ${checkedIds.length} records for anomaly audit`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#14233c] border border-slate-600 text-amber-300 hover:border-amber-500/50 font-semibold text-xs transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Flag / Anomaly</span>
            </button>
            <button
              onClick={() => handleTriggerAction(`Prepared batch export for ${checkedIds.length} items`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#14233c] border border-slate-600 text-slate-300 hover:border-cyan-500/50 font-semibold text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Batch Export</span>
            </button>
            <button
              onClick={() => handleTriggerAction(`Dispatched NDRF field alert for batch #${checkedIds[0]}`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#14233c] border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/30 font-semibold text-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Assign NDRF Field Unit</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Main Telemetry Table */}
      <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#090e1a] text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={checkedIds.length === SAMPLE_RECORDS.length}
                    onChange={() => {
                      if (checkedIds.length === SAMPLE_RECORDS.length) {
                        setCheckedIds([]);
                      } else {
                        setCheckedIds(SAMPLE_RECORDS.map((r) => r.id));
                      }
                    }}
                    className="rounded bg-[#11192a] border-slate-600 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">REPORT ID</th>
                <th className="py-3 px-3">
                  <div className="flex items-center space-x-1">
                    <span>TIMESTAMP (IST)</span>
                    <span className="text-cyan-400">↓</span>
                  </div>
                </th>
                <th className="py-3 px-3">EVENT</th>
                <th className="py-3 px-3">LOCATION & TERRITORY</th>
                <th className="py-3 px-3">SEVERITY</th>
                <th className="py-3 px-3">INGESTION NODE</th>
                <th className="py-3 px-3">VERIFICATION</th>
                <th className="py-3 px-3">GEOSPATIAL PIN</th>
                <th className="py-3 px-3 text-center">MEDIA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {SAMPLE_RECORDS.map((record) => {
                const isSelected = selectedRowId === record.id;
                const isChecked = checkedIds.includes(record.id);

                return (
                  <React.Fragment key={record.id}>
                    <tr
                      onClick={() => setSelectedRowId(isSelected ? "" : record.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#101b2f] border-l-2 border-cyan-400"
                          : "hover:bg-[#0e1626]"
                      }`}
                    >
                      {/* Checkbox */}
                      <td
                        className="py-3 px-4 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCheck(record.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded bg-[#11192a] border-slate-600 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Report ID */}
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                        {record.id}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                        {record.timestamp}
                      </td>

                      {/* Event */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getEventBadgeStyle(
                            record.eventType
                          )}`}
                        >
                          {record.eventType === "flash_flood" && <Zap className="w-3 h-3 text-cyan-400 mr-1" />}
                          {record.eventType === "cyclone" && <Activity className="w-3 h-3 text-amber-400 mr-1" />}
                          {record.eventType === "heavy_rain" && <Radio className="w-3 h-3 text-blue-400 mr-1" />}
                          {record.eventType === "lightning" && <Zap className="w-3 h-3 text-yellow-400 mr-1" />}
                          {record.eventType === "river_flood" && <Compass className="w-3 h-3 text-cyan-300 mr-1" />}
                          {record.eventType === "landslide" && <AlertOctagon className="w-3 h-3 text-orange-400 mr-1" />}
                          <span>{record.event}</span>
                        </span>
                      </td>

                      {/* Location & Territory */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-white text-xs">{record.location}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {record.territory}
                        </div>
                      </td>

                      {/* Severity */}
                      <td className="py-3 px-3">{getSeverityPill(record.severity)}</td>

                      {/* Ingestion Node */}
                      <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                        {record.ingestionNode}
                      </td>

                      {/* Verification */}
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1.5">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              record.verificationScore >= 95
                                ? "text-emerald-400"
                                : record.verificationScore >= 90
                                ? "text-cyan-400"
                                : "text-amber-400"
                            }`}
                          />
                          <span
                            className={`font-bold font-mono text-[11px] ${
                              record.verificationScore >= 95
                                ? "text-emerald-400"
                                : record.verificationScore >= 90
                                ? "text-cyan-400"
                                : "text-amber-400"
                            }`}
                          >
                            {record.verificationScore}% {record.verificationStatus}
                          </span>
                        </div>
                      </td>

                      {/* Geospatial Pin */}
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                        {record.lat.toFixed(4)}° N, {record.lon.toFixed(4)}° E
                      </td>

                      {/* Media */}
                      <td className="py-3 px-3 text-center">
                        {record.mediaCount > 0 ? (
                          <span className="inline-flex items-center space-x-1 text-slate-300 hover:text-cyan-300 font-mono text-[11px]">
                            <Camera className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{record.mediaCount}</span>
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>

                    {/* EXPANDED ROW: DISASTER TELEMETRY DOSSIER */}
                    {isSelected && (
                      <tr className="bg-[#09101d] border-b border-cyan-800/40">
                        <td colSpan={10} className="p-4 md:p-6 space-y-4">
                          <div className="bg-[#0c1527] border border-cyan-800/50 rounded-2xl p-5 shadow-2xl space-y-4">
                            {/* Dossier Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                              <div className="flex items-center space-x-2.5">
                                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
                                  DISASTER TELEMETRY DOSSIER
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                                  HASH: 8F2A-09C3-205E
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleTriggerAction(`Assigned Ward Response Unit to ${record.id}`)}
                                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-[11px] transition-all"
                                >
                                  Deploy Response Unit
                                </button>
                                <button
                                  onClick={() => handleTriggerAction(`Verified Dossier ${record.id}`)}
                                  className="px-3 py-1.5 rounded-xl bg-[#14233c] border border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
                                >
                                  Mark Verified
                                </button>
                              </div>
                            </div>

                            {/* Dossier Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                              {/* Left Column (5 cols): Incident Narrative & Reporter KYC */}
                              <div className="lg:col-span-5 space-y-3">
                                <div>
                                  <h3 className="text-sm font-bold text-white tracking-wide">
                                    Rapid Inundation Under Hindmata Flyover
                                  </h3>
                                  <p className="text-slate-300 text-xs mt-1.5 leading-relaxed bg-[#090f1c] p-3 rounded-xl border border-slate-800">
                                    "{record.description}"
                                  </p>
                                </div>

                                {/* Reporter Verification Card */}
                                <div className="p-3 rounded-xl bg-[#090f1c] border border-slate-800/90 flex items-center justify-between">
                                  <div className="flex items-center space-x-2.5">
                                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                                      <ShieldCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="font-bold text-white text-xs">
                                        {record.reporterName}
                                      </div>
                                      <div className="text-[10px] text-cyan-400 font-mono">
                                        {record.reporterTrust}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] font-mono text-slate-400">
                                      14:32:00 IST
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Middle Column (4 cols): Collocated Sensors & Rain Intensity Sparkline */}
                              <div className="lg:col-span-4 space-y-3">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                  <span>COLLOCATED SENSOR READINGS ({record.sensors.stationId})</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-[#090f1c] border border-slate-800 p-2.5 rounded-xl">
                                    <div className="text-[9px] uppercase font-bold text-slate-400">
                                      PRECIPITATION
                                    </div>
                                    <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">
                                      142
                                    </div>
                                    <div className="text-[9px] text-slate-400 font-mono">
                                      mm / hour (Peak)
                                    </div>
                                  </div>

                                  <div className="bg-[#090f1c] border border-slate-800 p-2.5 rounded-xl">
                                    <div className="text-[9px] uppercase font-bold text-slate-400">
                                      WIND GUSTS
                                    </div>
                                    <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">
                                      68
                                    </div>
                                    <div className="text-[9px] text-slate-400 font-mono">
                                      km/h (WSW)
                                    </div>
                                  </div>

                                  <div className="bg-[#090f1c] border border-slate-800 p-2.5 rounded-xl">
                                    <div className="text-[9px] uppercase font-bold text-slate-400">
                                      BAROMETRIC
                                    </div>
                                    <div className="text-lg font-mono font-bold text-slate-200 mt-0.5">
                                      994
                                    </div>
                                    <div className="text-[9px] text-red-400 font-mono">
                                      hPa (Falling)
                                    </div>
                                  </div>
                                </div>

                                {/* Rain Intensity Sparkline */}
                                <div className="bg-[#090f1c] border border-slate-800 p-3 rounded-xl space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className="text-slate-300">
                                      RAIN INTENSITY SENSOR (LAST 60 MINS)
                                    </span>
                                    <span className="text-red-400 font-mono">
                                      EXCEEDS FLASH CRITERIA
                                    </span>
                                  </div>
                                  <div className="h-16 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={RAIN_SPARKLINE_DATA}>
                                        <defs>
                                          <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                                          </linearGradient>
                                        </defs>
                                        <Area
                                          type="monotone"
                                          dataKey="val"
                                          stroke="#00e5ff"
                                          strokeWidth={2}
                                          fillOpacity={1}
                                          fill="url(#rainGrad)"
                                        />
                                      </AreaChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column (3 cols): Precision Pin Locator & Ground Evidence */}
                              <div className="lg:col-span-3 space-y-3">
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                                  {/* Precision Pin Locator Map Preview */}
                                  <div className="bg-[#090f1c] border border-slate-800 p-2.5 rounded-xl space-y-1.5">
                                    <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center justify-between">
                                      <span>PRECISION PIN LOCATOR</span>
                                      <MapPin className="w-3 h-3 text-red-500" />
                                    </div>
                                    <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative border border-slate-800 flex items-center justify-center">
                                      {/* Mock Map Background */}
                                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />
                                      <div className="relative z-10 text-center">
                                        <div className="w-5 h-5 rounded-full bg-red-500/80 mx-auto flex items-center justify-center animate-ping" />
                                        <span className="text-[9px] font-mono font-bold bg-navy-950/90 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800/80 mt-1 inline-block">
                                          {record.lat.toFixed(4)}° N, {record.lon.toFixed(4)}° E
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Ground Evidence Photo */}
                                  <div className="bg-[#090f1c] border border-slate-800 p-2.5 rounded-xl space-y-1.5">
                                    <div className="text-[9px] uppercase font-bold text-slate-400 flex items-center justify-between">
                                      <span>GROUND EVIDENCE</span>
                                      <Camera className="w-3 h-3 text-cyan-400" />
                                    </div>
                                    <div className="h-20 bg-slate-900 rounded-lg overflow-hidden relative border border-slate-800">
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 flex flex-col justify-end p-1.5">
                                        <span className="text-[9px] font-mono text-cyan-300">
                                          Hindmata Junction Cam 02
                                        </span>
                                      </div>
                                      <div className="w-full h-full bg-[#132035] flex items-center justify-center text-slate-500 text-[10px]">
                                        <span>[ 3 Photo Attachments ]</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Dispatch Audit Lifecycle (4 Steps matching screenshot) */}
                            <div className="pt-3 border-t border-slate-800/80 space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                                DISASTER RESPONSE DISPATCH AUDIT LIFECYCLE
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* Step 1 */}
                                <div className="bg-[#090f1c] border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
                                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-white text-xs">
                                    1
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-xs">Citizen Upload</div>
                                    <div className="text-[10px] text-slate-400 font-mono">
                                      14:32:00 • Geotag Checked
                                    </div>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className="bg-[#090f1c] border border-cyan-800/50 p-3 rounded-xl flex items-center space-x-3">
                                  <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
                                    2
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-xs">IMD Radar Auto-Match</div>
                                    <div className="text-[10px] text-cyan-400 font-mono">
                                      14:32:45 • Doppler 94% Cross
                                    </div>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className="bg-[#090f1c] border border-amber-800/50 p-3 rounded-xl flex items-center space-x-3">
                                  <div className="w-7 h-7 rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
                                    3
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-xs">NDRF Alert Dispatched</div>
                                    <div className="text-[10px] text-amber-400 font-mono">
                                      14:33:10 • Battalion 05 Mobilized
                                    </div>
                                  </div>
                                </div>

                                {/* Step 4 */}
                                <div className="bg-[#090f1c] border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
                                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-white text-xs">
                                    4
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-xs">BMC Field Resolution</div>
                                    <div className="text-[10px] text-slate-400 font-mono">
                                      En Route // ETA 12m
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 6. Pagination Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090e1a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 text-slate-400">
            <span>
              Showing <strong className="text-white">1–25</strong> of <strong className="text-white">2,847</strong> reports
            </span>
            <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded">
              ROWS PER PAGE: 25
            </span>
          </div>

          <div className="flex items-center space-x-1 font-mono text-xs">
            <button
              onClick={() => handleTriggerAction("Navigated to First page")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              &lt; First
            </button>
            <button
              onClick={() => handleTriggerAction("Navigated to Previous page")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              &lt; Prev
            </button>
            <button className="px-2.5 py-1 rounded bg-cyan-500 font-bold text-navy-950">
              1
            </button>
            <button
              onClick={() => handleTriggerAction("Navigated to Page 2")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              2
            </button>
            <button
              onClick={() => handleTriggerAction("Navigated to Page 3")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              3
            </button>
            <span className="px-1 text-slate-500">...</span>
            <button
              onClick={() => handleTriggerAction("Navigated to Page 114")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              114
            </button>
            <button
              onClick={() => handleTriggerAction("Navigated to Next page")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              Next &gt;
            </button>
            <button
              onClick={() => handleTriggerAction("Navigated to Last page")}
              className="px-2.5 py-1 rounded bg-[#11192a] border border-slate-700 text-slate-400 hover:text-white"
            >
              Last &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorerView;
