import React, { useState } from "react";
import {
  MessageSquareQuote,
  Radio,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Share2,
  TrendingUp,
  Flame,
  ShieldAlert,
  Send,
  ExternalLink,
  RefreshCw,
  Globe,
  MapPin,
  Clock,
  Sparkles,
  Volume2,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  ShieldCheck,
  Eye,
  AlertOctagon,
  ChevronRight,
  Zap,
  Check,
  Languages,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

interface SocialPost {
  id: string;
  platform: "x" | "telegram" | "news" | "citizen_sos";
  authorName: string;
  authorHandle: string;
  isVerifiedUser: boolean;
  trustScore: number; // 0-100
  timestamp: string;
  location: string;
  state: string;
  rawText: string;
  englishTranslation?: string;
  language: string;
  urgency: "CRITICAL_SOS" | "HIGH_HAZARD" | "ADVISORY" | "MISINFORMATION";
  entities: {
    disasterType: string;
    waterLevel?: string;
    affectedCount?: string;
    landmark: string;
  };
  corroboration: {
    radarMatched: boolean;
    radarConfidence: number;
    details: string;
  };
  metrics: {
    reposts: number;
    likes: number;
    reach: string;
  };
  mediaUrl?: string;
  isAddressed?: boolean;
}

const TRENDING_HASHTAGS = [
  { tag: "#MumbaiRains", volume: "48.2k", urgency: "Severe Flash Flood", sentiment: -0.82, state: "Maharashtra" },
  { tag: "#CycloneAlert", volume: "34.1k", urgency: "Eyewall Landfall", sentiment: -0.74, state: "Odisha / WB" },
  { tag: "#ChennaiFloods", volume: "22.8k", urgency: "Velachery Inundation", sentiment: -0.68, state: "Tamil Nadu" },
  { tag: "#WayanadRescue", volume: "19.4k", urgency: "Landslip Trapped", sentiment: -0.91, state: "Kerala" },
  { tag: "#AssamDeluge", volume: "14.7k", urgency: "Brahmaputra Breach", sentiment: -0.79, state: "Assam" },
  { tag: "#BengaluruRains", volume: "11.3k", urgency: "ORR Waterlogging", sentiment: -0.55, state: "Karnataka" },
];

const VOLUME_STREAM_DATA = [
  { time: "11:00", volume: 18200, sosCount: 42 },
  { time: "11:30", volume: 22400, sosCount: 58 },
  { time: "12:00", volume: 31000, sosCount: 89 },
  { time: "12:30", volume: 38500, sosCount: 114 },
  { time: "13:00", volume: 44200, sosCount: 145 },
  { time: "13:30", volume: 47900, sosCount: 168 },
  { time: "14:00", volume: 52100, sosCount: 194 },
];

const SAMPLE_POSTS: SocialPost[] = [
  {
    id: "SOC-X-9941",
    platform: "x",
    authorName: "Aniket Deshmukh",
    authorHandle: "@aniket_mumbai_live",
    isVerifiedUser: true,
    trustScore: 94,
    timestamp: "3 mins ago • 14:42 IST",
    location: "Hindmata Junction, Dadar",
    state: "Maharashtra",
    rawText: "दादर हिंदमाता उड्डाणपुलाखाली पाणी ३.५ फूट साचले आहे! बेस्टच्या २ बसेस अडकल्या असून वृद्ध नागरिकांना बाहेर काढण्यासाठी तातडीने मदतीची गरज आहे! @mybmc @NDRFHQ",
    englishTranslation: "Water has accumulated up to 3.5 feet under the Dadar Hindmata flyover! 2 BEST city transit buses are trapped. Urgent evacuation assistance needed for senior citizens trapped inside!",
    language: "Marathi",
    urgency: "CRITICAL_SOS",
    entities: {
      disasterType: "Flash Inundation",
      waterLevel: "3.5 Feet",
      affectedCount: "40+ passengers",
      landmark: "Hindmata Flyover Pillar 14",
    },
    corroboration: {
      radarMatched: true,
      radarConfidence: 96,
      details: "Collocated with AWS BOM-084 recording 142 mm/hr continuous rainfall.",
    },
    metrics: { reposts: 1420, likes: 3840, reach: "185k" },
  },
  {
    id: "SOC-TG-8820",
    platform: "telegram",
    authorName: "Wayanad Disaster Relief Hub",
    authorHandle: "@WayanadAlertOfficial",
    isVerifiedUser: true,
    trustScore: 98,
    timestamp: "7 mins ago • 14:38 IST",
    location: "Chooralmala Town, Meppadi",
    state: "Kerala",
    rawText: "ചൂരൽമല ഭാഗത്ത് ശക്തമായ മലവെള്ളപ്പാച്ചിൽ തുടരുന്നു. തോട്ടം തൊഴിലാളികളുടെ രണ്ട് ലയങ്ങളിൽ വെള്ളം കയറി. രക്ഷാപ്രവർത്തകർ ഉടൻ എത്തിച്ചേരണം.",
    englishTranslation: "Severe flash runoff and debris torrent continue in Chooralmala. Water entered 2 plantation residential quarters. Rescue teams needed immediately at the bridge approach.",
    language: "Malayalam",
    urgency: "CRITICAL_SOS",
    entities: {
      disasterType: "Debris Runoff / Flash Flood",
      waterLevel: "Swift Flood Current",
      affectedCount: "18 Families",
      landmark: "Chooralmala Tea Estate Quarters",
    },
    corroboration: {
      radarMatched: true,
      radarConfidence: 94,
      details: "IMD Kozhikode Doppler confirms convective cloudburst cluster (>110 mm in 2 hrs).",
    },
    metrics: { reposts: 890, likes: 1200, reach: "42k" },
  },
  {
    id: "SOC-X-9932",
    platform: "x",
    authorName: "Tamil Nadu Weatherman Pulse",
    authorHandle: "@chennai_coastal_pulse",
    isVerifiedUser: true,
    trustScore: 92,
    timestamp: "14 mins ago • 14:31 IST",
    location: "Velachery Canal Road",
    state: "Tamil Nadu",
    rawText: "வேளச்சேரி 100 அடி சாலையில் கால்வாய் நீர் கரைபுரண்டு ஓடுகிறது. தரைத்தள வீடுகளில் 1 அடி தண்ணீர் புகுந்துள்ளது. படகுகள் தயார் நிலையில் உள்ளன.",
    englishTranslation: "Canal overflow on Velachery 100 Feet Road. Ground-level homes have 1 foot of water ingress. GCC motor pumps activated near railway station junction.",
    language: "Tamil",
    urgency: "HIGH_HAZARD",
    entities: {
      disasterType: "Urban Waterlogging",
      waterLevel: "1.2 Feet",
      affectedCount: "250+ households",
      landmark: "Velachery MRTS Junction",
    },
    corroboration: {
      radarMatched: true,
      radarConfidence: 89,
      details: "Chennai Adyar AWS reports 68 mm rainfall with tidal backflow.",
    },
    metrics: { reposts: 640, likes: 2100, reach: "94k" },
  },
  {
    id: "SOC-CIT-7714",
    platform: "citizen_sos",
    authorName: "Dipankar Barua",
    authorHandle: "Citizen App SOS #9810",
    isVerifiedUser: false,
    trustScore: 88,
    timestamp: "22 mins ago • 14:23 IST",
    location: "Anil Nagar, Guwahati",
    state: "Assam",
    rawText: "নৱীন নগৰ আৰু অনিল নগৰত কৃত্রিম বানপানীৰ সৃষ্টি হৈছে। নলাৰ পানী বাঢ়ি ঘৰৰ ভিতৰত সোমাইছে। SDRF নাওৰ প্ৰয়োজন।",
    englishTranslation: "Artificial flash flood in Anil Nagar. Water surged over municipal drains into residential ground floors. SDRF dinghy requested for medical evacuation.",
    language: "Assamese",
    urgency: "HIGH_HAZARD",
    entities: {
      disasterType: "River Overflow Ingress",
      waterLevel: "2.8 Feet",
      affectedCount: "Elderly resident evacuation",
      landmark: "Anil Nagar Bye-lane 4",
    },
    corroboration: {
      radarMatched: true,
      radarConfidence: 97,
      details: "CWC Bharalumukh gauge reports river at +0.84m over Danger Mark.",
    },
    metrics: { reposts: 310, likes: 520, reach: "18k" },
  },
  {
    id: "SOC-MIS-1002",
    platform: "x",
    authorName: "Viral Alert India",
    authorHandle: "@viral_news_breaking",
    isVerifiedUser: false,
    trustScore: 18,
    timestamp: "35 mins ago • 14:10 IST",
    location: "Khadakwasla Dam, Pune",
    state: "Maharashtra",
    rawText: "BREAKING: Massive dam wall crack reported at Khadakwasla Dam!! Water being released without warning, Pune city under imminent flood warning!! ⚠️🚨",
    englishTranslation: "BREAKING: Massive dam wall crack reported at Khadakwasla Dam!! Water being released without warning, Pune city under imminent flood warning!! ⚠️🚨",
    language: "English",
    urgency: "MISINFORMATION",
    entities: {
      disasterType: "False Dam Breach Rumor",
      waterLevel: "N/A",
      affectedCount: "Mass Panic",
      landmark: "Khadakwasla Dam",
    },
    corroboration: {
      radarMatched: false,
      radarConfidence: 0,
      details: "Irrigation Dept & CWC confirm dam is 100% structurally sound at 74% capacity. Recycled 2019 footage.",
    },
    metrics: { reposts: 4120, likes: 6200, reach: "380k" },
  },
];

const MISINFORMATION_ALERTS = [
  {
    id: "MIS-01",
    title: "Fabricated Dam Breach at Khadakwasla",
    claim: "Claimed dam wall collapse causing imminent catastrophic flooding in Pune.",
    factCheck: "CONFIRMED FALSE: Maharashtra Water Resources Dept released live drone CCTV showing dam operating normally at safe 74% capacity.",
    status: "Debunk Broadcast Sent",
    recycledSource: "2019 Tiware Dam failure video reused",
  },
  {
    id: "MIS-02",
    title: "False Tsunami Warning in Mumbai Coast",
    claim: "Viral WhatsApp audio warning of 10-meter tsunami wave in Marine Drive at 16:00.",
    factCheck: "CONFIRMED HOAX: INCOIS National Tsunami Early Warning Center has issued no alerts. Tidal swell is routine 3.8m monsoon high tide.",
    status: "Flagged to Cyber Cell",
    recycledSource: "Old 2021 Cyclone Tauktae audio note",
  },
];

export const SocialMediaMonitorView: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(SAMPLE_POSTS);
  const [selectedUrgency, setSelectedUrgency] = useState<string>("ALL");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({
    "SOC-X-9941": true,
    "SOC-TG-8820": true,
    "SOC-X-9932": true,
    "SOC-CIT-7714": true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleTranslation = (id: string) => {
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDispatchNDRF = (postId: string, location: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isAddressed: true } : p))
    );
    showToast(`🚨 Priority SOS Dispatched: NDRF / SDRF Mobilized for ${location}`);
  };

  const handleVerifyPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, trustScore: 99 } : p))
    );
    showToast(`✓ Marked Post #${postId} as Officially Verified`);
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedUrgency !== "ALL" && p.urgency !== selectedUrgency) return false;
    if (selectedPlatform !== "ALL" && p.platform !== selectedPlatform) return false;
    if (searchKeyword.trim() !== "") {
      const q = searchKeyword.toLowerCase();
      return (
        p.rawText.toLowerCase().includes(q) ||
        (p.englishTranslation && p.englishTranslation.toLowerCase().includes(q)) ||
        p.location.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#080d1a] text-slate-200 p-4 md:p-6 space-y-4 text-xs font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-[9999] bg-cyan-950/95 border border-cyan-400 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold text-xs">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-900/40">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-wide uppercase font-mono">
                SOCIAL MEDIA INTELLIGENCE & VERNACULAR NLP MONITOR
              </h1>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[10px] font-mono font-bold">
                12 VERNACULAR ENGINES
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono mt-0.5">
              <span className="text-cyan-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-1.5 animate-ping" />
                STREAM: 48,290 POSTS/HR
              </span>
              <span>• AI DISTRESS CLASSIFIER: 98.4% ACCURACY</span>
              <span>• GEOTAG RESOLVER: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Global Action & Search */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter keyword, handle, SOS location..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="bg-[#0e1626] border border-slate-700/80 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-1.5 w-64 focus:outline-none focus:border-cyan-500 placeholder:text-slate-500"
            />
          </div>
          <button
            onClick={() => showToast("Social stream cache refreshed across X, Telegram & Koo")}
            className="p-2 rounded-xl bg-[#0e1626] border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
            title="Refresh Ingestion Feed"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Ingested Posts */}
        <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              24H INGESTED SOCIAL SIGNALS
            </span>
            <div className="text-xl font-bold font-mono text-white mt-1">148,290</div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center mt-0.5">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+42% spike during active monsoon</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-600/40 flex items-center justify-center text-cyan-400">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: SOS Signals */}
        <div className="bg-[#0b1220] border border-red-900/50 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1.5 animate-pulse" />
              VERIFIED LIFE-SAFETY SOS
            </span>
            <div className="text-xl font-bold font-mono text-red-400 mt-1">189</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
              34 Active NDRF Field Mobilizations
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-600/40 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3: Fake News Filter */}
        <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              MISINFORMATION BLOCKED
            </span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">92 Viral Hoaxes</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Recycled flood videos debunked by AI
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4: Public Anxiety Index */}
        <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              NLP PANIC & SENTIMENT INDEX
            </span>
            <div className="text-xl font-bold font-mono text-cyan-300 mt-1">-0.74 / Severe</div>
            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
              High public distress concentrated in MMR & Adyar
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-600/40 flex items-center justify-center text-cyan-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Live Vernacular Trending Hashtags & Velocity Bar */}
      <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-lg space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              LIVE MONSOON & DISASTER HASHTAG CLUSTERS
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            REAL-TIME NLP VELOCITY
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TRENDING_HASHTAGS.map((item) => (
            <button
              key={item.tag}
              onClick={() => setSearchKeyword(item.tag.replace("#", ""))}
              className="p-2.5 rounded-xl bg-[#090f1d] border border-slate-800 hover:border-cyan-500/60 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-cyan-400 text-xs group-hover:text-cyan-300">
                  {item.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{item.volume}</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 truncate">
                {item.urgency}
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5 flex items-center justify-between">
                <span>{item.state}</span>
                <span className="text-red-400 font-mono">{item.sentiment}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Filter & Stream Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b1220] border border-slate-800/90 rounded-2xl p-3 px-4">
        {/* Urgency Filter Tabs */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono mr-1">
            SEVERITY:
          </span>
          {[
            { id: "ALL", label: "All Signals" },
            { id: "CRITICAL_SOS", label: "🚨 Critical SOS (Trapped)" },
            { id: "HIGH_HAZARD", label: "⚠️ High Hazard" },
            { id: "ADVISORY", label: "📢 Official Advisories" },
            { id: "MISINFORMATION", label: "🛡️ Misinformation Flagged" },
          ].map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUrgency(u.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedUrgency === u.id
                  ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/20"
                  : "bg-[#11192a] text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono mr-1">
            SOURCE:
          </span>
          {[
            { id: "ALL", label: "All" },
            { id: "x", label: "X (Twitter)" },
            { id: "telegram", label: "Telegram" },
            { id: "citizen_sos", label: "Citizen App" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedPlatform === p.id
                  ? "bg-slate-700 text-white"
                  : "bg-[#11192a] text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Main Split View: Left Social Stream + Right Misinformation & Volume Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 cols): Real-Time Intelligence Post Cards */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Displaying <strong className="text-white">{filteredPosts.length}</strong> urgent social signals
            </span>
            <span className="font-mono text-cyan-400">● LIVE INGESTION WEBSOCKET CONNECTED</span>
          </div>

          {filteredPosts.map((post) => {
            const isEnglish = showTranslations[post.id];
            return (
              <div
                key={post.id}
                className={`bg-[#0b1220] border rounded-2xl p-4 shadow-xl space-y-3 transition-all ${
                  post.urgency === "CRITICAL_SOS"
                    ? "border-red-900/80 shadow-red-950/30"
                    : post.urgency === "MISINFORMATION"
                    ? "border-amber-900/80 shadow-amber-950/30"
                    : "border-slate-800/90"
                } ${post.isAddressed ? "opacity-75" : ""}`}
              >
                {/* Post Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#121c2e] border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      {post.platform === "x" ? "𝕏" : post.platform === "telegram" ? "TG" : "SOS"}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-white text-xs">{post.authorName}</span>
                        {post.isVerifiedUser && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 inline" />
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">{post.authorHandle}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="flex items-center text-slate-300">
                          <MapPin className="w-3 h-3 text-red-400 mr-0.5" />
                          {post.location} ({post.state})
                        </span>
                        <span>• {post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Trust Score */}
                  <div className="flex items-center space-x-2">
                    {post.urgency === "CRITICAL_SOS" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800 animate-pulse flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>CRITICAL SOS</span>
                      </span>
                    )}
                    {post.urgency === "HIGH_HAZARD" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                        HIGH HAZARD
                      </span>
                    )}
                    {post.urgency === "MISINFORMATION" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-600 flex items-center space-x-1">
                        <ShieldAlert className="w-3 h-3" />
                        <span>VIRAL HOAX FLAGGED</span>
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        post.trustScore >= 90
                          ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                          : post.trustScore >= 70
                          ? "bg-cyan-950 text-cyan-400 border-cyan-800"
                          : "bg-red-950 text-red-400 border-red-800"
                      }`}
                    >
                      Trust: {post.trustScore}%
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <p className="text-slate-100 text-xs leading-relaxed font-sans bg-[#090f1d] p-3 rounded-xl border border-slate-800/80">
                    {isEnglish && post.englishTranslation ? post.englishTranslation : post.rawText}
                  </p>

                  {/* Translation Switcher */}
                  {post.englishTranslation && (
                    <div className="flex items-center justify-between text-[11px]">
                      <button
                        onClick={() => toggleTranslation(post.id)}
                        className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>
                          {isEnglish
                            ? `Show Original Vernacular (${post.language})`
                            : "Translate to English with AI NLP"}
                        </span>
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Identified: {post.language} • Vernacular NLP Model v4
                      </span>
                    </div>
                  )}
                </div>

                {/* Extracted NLP Entities */}
                <div className="bg-[#0e1626] border border-slate-800 p-2.5 rounded-xl flex items-center justify-between flex-wrap gap-2 text-[10px]">
                  <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                    <span className="text-slate-400 uppercase font-bold font-mono">ENTITIES:</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                      {post.entities.disasterType}
                    </span>
                    {post.entities.waterLevel && (
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                        Depth: {post.entities.waterLevel}
                      </span>
                    )}
                    {post.entities.affectedCount && (
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-semibold">
                        {post.entities.affectedCount}
                      </span>
                    )}
                    <span className="text-slate-300 font-mono">
                      📍 {post.entities.landmark}
                    </span>
                  </div>
                  <div className="text-slate-400 font-mono">
                    Reach: <strong className="text-white">{post.metrics.reach}</strong> • {post.metrics.reposts} Reposts
                  </div>
                </div>

                {/* IMD Radar & Telemetry Corroboration */}
                <div className="p-2.5 rounded-xl bg-[#090f1d] border border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        post.corroboration.radarMatched ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                      }`}
                    />
                    <span className="text-slate-300">
                      <strong>AI Cross-Verification:</strong> {post.corroboration.details}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">
                    {post.corroboration.radarConfidence}% Match
                  </span>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    {post.urgency === "CRITICAL_SOS" && !post.isAddressed && (
                      <button
                        onClick={() => handleDispatchNDRF(post.id, post.location)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/40 flex items-center space-x-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch NDRF / SDRF Unit</span>
                      </button>
                    )}
                    {post.isAddressed && (
                      <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Field Response Mobilized</span>
                      </span>
                    )}
                    <button
                      onClick={() => handleVerifyPost(post.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#14233c] border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 font-semibold text-xs transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Verify Signal</span>
                    </button>
                    <button
                      onClick={() => showToast(`Geotag located for #${post.id} on IndiaMap`)}
                      className="px-3 py-1.5 rounded-xl bg-[#14233c] border border-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center space-x-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>View on Map</span>
                    </button>
                  </div>

                  {post.urgency === "MISINFORMATION" && (
                    <button
                      onClick={() => showToast(`Official Debunk Fact-Check published for #${post.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Issue Official Counter-Debunk</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (4 cols): Misinformation Radar & Ingestion Chart */}
        <div className="lg:col-span-4 space-y-4">
          {/* Real-time Volume Velocity Chart */}
          <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center">
                <Activity className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                POST INGESTION VELOCITY
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Peak: 52k/hr</span>
            </div>

            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOLUME_STREAM_DATA}>
                  <defs>
                    <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090f1d",
                      borderColor: "#1e293b",
                      fontSize: 11,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#00e5ff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#streamGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <span>REDSHIFT STREAM LATENCY: 380ms</span>
              <span className="text-emerald-400">99.8% UPTIME</span>
            </div>
          </div>

          {/* AI Misinformation & Rumor Radar Card */}
          <div className="bg-[#0b1220] border border-amber-900/60 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  VIRAL RUMOR DEBUNKER RADAR
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold border border-amber-800 font-mono">
                AI DEEPFAKE CHECK
              </span>
            </div>

            <div className="space-y-3">
              {MISINFORMATION_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-[#090f1d] border border-slate-800 p-3 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{alert.title}</span>
                    <span className="text-[9px] font-mono text-red-400 font-bold bg-red-950 px-1.5 py-0.5 rounded">
                      VIRAL HOAX
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    <strong className="text-slate-300">Claim:</strong> {alert.claim}
                  </p>
                  <p className="text-[11px] text-emerald-400 leading-snug bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                    {alert.factCheck}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span>Source: {alert.recycledSource}</span>
                    <button
                      onClick={() => showToast(`Broadcasted official PIB counter for ${alert.id}`)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      Broadcast Counter →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Advisory Broadcast Box */}
          <div className="bg-[#0b1220] border border-slate-800/90 rounded-2xl p-4 shadow-xl space-y-2.5">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                EMERGENCY PUBLIC BROADCAST CONSOLE
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Publish verified disaster advisories across X, Telegram channels, and State Disaster SMS gateways simultaneously.
            </p>
            <textarea
              rows={3}
              placeholder="Type urgent weather warning or public evacuation advisory..."
              defaultValue="URGENT BMC/IMD ADVISORY: Hindmata Dadar waterlogging is critical (3.5 ft). Commuters advised to divert via Dr. B.A. Road flyover. BEST bus routes 11, 25 diverted."
              className="w-full bg-[#0e1626] border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
            />
            <button
              onClick={() => showToast("Emergency Advisory broadcasted to 1.8M citizens across X & SMS gateways")}
              className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-wider flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Multi-Channel Advisory</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMonitorView;
