import React, { useState } from "react";
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Camera,
  Filter,
  Search,
  Plus,
  Share2,
  Flag,
  Shield,
  Download,
  Check,
  X,
  Send,
  Sparkles,
  Layers,
  Radio
} from "lucide-react";

interface CitizenReportCard {
  id: string;
  location: string;
  timeAgo: string;
  severity: "CRITICAL" | "HIGH SEVERITY" | "MEDIUM";
  hazardCategory: string;
  status: "Pending Review" | "Verified IMD";
  citizenId: string;
  coords: string;
  narrative: string;
  agencyStatus: string;
  agencyStatusType: "urgent" | "verified" | "pending";
  imageUrl: string;
  isUrgent?: boolean;
}

const CITIZEN_REPORTS_DATA: CitizenReportCard[] = [
  {
    id: "cr-1",
    location: "Dharavi, Mumbai, MH",
    timeAgo: "8 min ago",
    severity: "CRITICAL",
    hazardCategory: "Flash Flood",
    status: "Pending Review",
    citizenId: "Citizen_MH_4521",
    coords: "19.0404° N, 72.8567° E",
    narrative: "Mithi River bank water backflow entering transit camps. Depth over 3.5 feet, 4 families stranded on terrace. Electricity transformer sparking near 90 Feet Road intersection.",
    agencyStatus: "NDRF Team 04 Notified",
    agencyStatusType: "urgent",
    imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80",
    isUrgent: true,
  },
  {
    id: "cr-2",
    location: "Velachery, Chennai, TN",
    timeAgo: "23 min ago",
    severity: "HIGH SEVERITY",
    hazardCategory: "Waterlogging",
    status: "Verified IMD",
    citizenId: "Citizen_TN_0832",
    coords: "12.9815° N, 80.2180° E",
    narrative: "Velachery Main Road submerged. Inflow from overflowing lake canal blocked storm drain. BMTC bus stuck mid-crossing with 18 commuters inside. Depth approx 2.8 ft.",
    agencyStatus: "Confirmed by Doppler Radar Station",
    agencyStatusType: "verified",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cr-3",
    location: "Connaught Place, Delhi",
    timeAgo: "45 min ago",
    severity: "MEDIUM",
    hazardCategory: "Tree Fall",
    status: "Verified IMD",
    citizenId: "Citizen_DL_1109",
    coords: "28.6315° N, 77.2167° E",
    narrative: "Severe squall (wind gust 68 km/h) uprooted large neem tree across Radial Road 3. Completely obstructing traffic towards Janpath. NDMC tree clearing tractor on site.",
    agencyStatus: "Verified by Delhi Traffic Pol",
    agencyStatusType: "verified",
    imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cr-4",
    location: "Salt Lake, Kolkata, WB",
    timeAgo: "1 hr ago",
    severity: "HIGH SEVERITY",
    hazardCategory: "Waterlogging",
    status: "Pending Review",
    citizenId: "Citizen_WB_3411",
    coords: "22.5868° N, 88.4178° E",
    narrative: "Sector V Karunamoyee junction knee-deep water. Drainage pump station at Bidhannagar experiencing technical trip. Two feeder roads impassable for compact vehicles.",
    agencyStatus: "Awaiting Alipore Radar Match",
    agencyStatusType: "pending",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cr-5",
    location: "Bellandur ORR, Bengaluru, KA",
    timeAgo: "1.2 hr ago",
    severity: "CRITICAL",
    hazardCategory: "Flash Flood",
    status: "Verified IMD",
    citizenId: "Citizen_KA_9021",
    coords: "12.9304° N, 77.6784° E",
    narrative: "Outer Ring Road EcoSpace underpass completely flooded (5+ ft). Multiple vehicles submerged. Sump pump failure in residential complexes near canal breach.",
    agencyStatus: "BBMP & SDRF Boat Deployed",
    agencyStatusType: "urgent",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80",
    isUrgent: true,
  },
  {
    id: "cr-6",
    location: "Puri Coast, Odisha",
    timeAgo: "2 hr ago",
    severity: "HIGH SEVERITY",
    hazardCategory: "Cyclone Damage",
    status: "Verified IMD",
    citizenId: "Citizen_OD_7714",
    coords: "19.8135° N, 85.8312° E",
    narrative: "Cyclone outer bands generating 3.2m swells overtopping marine drive promenade. Thatched fishing stalls washed away, wind gusts recorded at 75 kt on marine buoy.",
    agencyStatus: "Coast Guard Cyclone Alert Red",
    agencyStatusType: "verified",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cr-7",
    location: "Anil Nagar, Guwahati, AS",
    timeAgo: "2.5 hr ago",
    severity: "MEDIUM",
    hazardCategory: "Urban Inundation",
    status: "Pending Review",
    citizenId: "Citizen_AS_5299",
    coords: "26.1824° N, 91.7610° E",
    narrative: "Bharalu river tributary overflow causing artificial flood in Anil Nagar and Nabin Nagar. Water level at 2 ft inside ground floor residences. PWD sluice gate jammed.",
    agencyStatus: "Awaiting Water Level Sensor Sync",
    agencyStatusType: "pending",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cr-8",
    location: "SG Highway, Ahmedabad, GJ",
    timeAgo: "3.1 hr ago",
    severity: "CRITICAL",
    hazardCategory: "Uprooted Electrical",
    status: "Pending Review",
    citizenId: "Citizen_GJ_1862",
    coords: "23.0338° N, 72.5089° E",
    narrative: "High-tension 11kV feeder pole snapped near Gota bridge due to violent downburst. Live cable sparking on wet asphalt. Police have cordoned south-bound lane.",
    agencyStatus: "UGVCL Grid Disconnect Dispatched",
    agencyStatusType: "urgent",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80",
    isUrgent: true,
  },
  {
    id: "cr-9",
    location: "Dhalli Bypass, Shimla, HP",
    timeAgo: "4.2 hr ago",
    severity: "HIGH SEVERITY",
    hazardCategory: "Landslip Debris",
    status: "Verified IMD",
    citizenId: "Citizen_HP_6492",
    coords: "31.1048° N, 77.1734° E",
    narrative: "Minor hill slope landslip deposited boulders and slush over NH-5 entrance near Dhalli tunnel. Both lanes halted. BRO earthmover currently working to clear single-lane passage.",
    agencyStatus: "HPSDMA Alert Active",
    agencyStatusType: "verified",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
  },
];

export const CitizenReportsView: React.FC = () => {
  const [reports, setReports] = useState<CitizenReportCard[]>(CITIZEN_REPORTS_DATA);
  const [activeTab, setActiveTab] = useState<"all" | "urgent" | "verified" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New report form state
  const [newLocation, setNewLocation] = useState("");
  const [newHazard, setNewHazard] = useState("Flash Flood");
  const [newDescription, setNewDescription] = useState("");
  const [newSeverity, setNewSeverity] = useState<"CRITICAL" | "HIGH SEVERITY" | "MEDIUM">("HIGH SEVERITY");

  const filteredReports = reports.filter((r) => {
    if (activeTab === "urgent" && !r.isUrgent) return false;
    if (activeTab === "verified" && r.status !== "Verified IMD") return false;
    if (activeTab === "pending" && r.status !== "Pending Review") return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.location.toLowerCase().includes(q) ||
        r.hazardCategory.toLowerCase().includes(q) ||
        r.narrative.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleVerify = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Verified IMD", agencyStatus: "Verified by Officer" } : r))
    );
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation || !newDescription) return;

    const newCard: CitizenReportCard = {
      id: `cr-user-${Date.now()}`,
      location: newLocation,
      timeAgo: "Just now",
      severity: newSeverity,
      hazardCategory: newHazard,
      status: "Pending Review",
      citizenId: `Citizen_User_${Math.floor(1000 + Math.random() * 9000)}`,
      coords: "19.0760° N, 72.8777° E (User Device GPS)",
      narrative: newDescription,
      agencyStatus: "Submitted • Geotag Checked",
      agencyStatusType: "pending",
      imageUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80",
    };

    setReports([newCard, ...reports]);
    setIsSubmitModalOpen(false);
    setNewLocation("");
    setNewDescription("");
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-4 md:p-6 space-y-5 text-xs font-sans">
      {/* 1. Header Banner */}
      <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-sky-100 text-sky-800 font-mono tracking-wider">
              TACTICAL FIELD FEED
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              NDMA / IMD VALIDATION MATRIX
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-navy-900 tracking-tight mt-1">
            Citizen Crowdsourced Weather Intelligence
          </h1>

          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-weather-sky" />
              <strong className="text-navy-900">1,429</strong> Submissions (Past 12h)
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <strong className="text-navy-900">94.2%</strong> Geotag Precision (±4m)
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <strong className="text-navy-900">412</strong> Ground Units Dispatched
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="py-2.5 px-4 bg-weather-sky hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Weather Report</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs & Search Locality */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-border rounded-2xl p-3 shadow-card">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === "all"
                ? "bg-weather-sky text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Reports ({reports.length})
          </button>

          <button
            onClick={() => setActiveTab("urgent")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
              activeTab === "urgent"
                ? "bg-red-600 text-white shadow-sm"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>Urgent / Rescue Needed (3)</span>
          </button>

          <button
            onClick={() => setActiveTab("verified")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
              activeTab === "verified"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified by Station (5)</span>
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
              activeTab === "pending"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending NDRF Review (4)</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by locality or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-border rounded-xl text-xs focus:ring-1 focus:ring-weather-sky outline-none"
          />
        </div>
      </div>

      {/* 3. Grid of 9 Rich Tactical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner with Badges */}
              <div className="relative h-44 w-full bg-slate-200 overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      card.severity === "CRITICAL"
                        ? "bg-red-600 text-white"
                        : card.severity === "HIGH SEVERITY"
                        ? "bg-amber-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    ● {card.severity} • {card.hazardCategory}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      card.status === "Verified IMD"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-600 text-white"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-white drop-shadow">
                      {card.location}
                    </h3>
                    <div className="text-[10px] font-mono opacity-80 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-weather-sky" />
                      <span>{card.coords}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-black/60 px-1.5 py-0.5 rounded">
                    {card.timeAgo}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="text-weather-sky font-bold">@{card.citizenId}</span>
                  <span>Geotag Confidence: 96%</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                  "{card.narrative}"
                </p>
              </div>
            </div>

            {/* Footer Agency Action Row */}
            <div className="p-3 bg-slate-50 border-t border-border flex items-center justify-between gap-2">
              <div className="flex items-center space-x-1.5 text-[10px] font-bold text-navy-900 truncate">
                {card.agencyStatusType === "urgent" && (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                )}
                {card.agencyStatusType === "verified" && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                )}
                {card.agencyStatusType === "pending" && (
                  <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                )}
                <span className="truncate">{card.agencyStatus}</span>
              </div>

              <div className="flex items-center space-x-1.5 flex-shrink-0">
                {card.status === "Pending Review" ? (
                  <button
                    onClick={() => handleVerify(card.id)}
                    className="px-2.5 py-1 bg-weather-sky hover:bg-sky-600 text-white rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Verify</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold">
                    Active
                  </span>
                )}

                <button
                  className="p-1 text-slate-400 hover:text-slate-600 rounded"
                  title="Share / Dispatch"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Protocol Guarantee Banner */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-weather-sky" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-900">
              Crowdsourced Anti-Spam & AI Geolocation Validation Active
            </h4>
            <p className="text-[11px] text-slate-500 max-w-3xl mt-0.5">
              Images processed with EXIF metadata tamper inspection, satellite cloud-cover correlation, and local sensor cross-checks. False submissions automatically penalized by trust-scoring algorithms.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
            Zero-Trust Protocol IMD-NDRF SYNC v2.4
          </span>
          <button className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition">
            <Download className="w-3.5 h-3.5" />
            <span>Export Verified Feed</span>
          </button>
        </div>
      </div>

      {/* Submit Report Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-weather-sky" />
                <h3 className="text-base font-bold text-navy-900">Submit Citizen Weather Report</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-navy-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Location (City, Locality, Landmark)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Andheri West, Mumbai near SV Road"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-border rounded-xl focus:ring-1 focus:ring-weather-sky outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Hazard Category
                  </label>
                  <select
                    value={newHazard}
                    onChange={(e) => setNewHazard(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-border rounded-xl focus:ring-1 focus:ring-weather-sky outline-none"
                  >
                    <option value="Flash Flood">Flash Flood</option>
                    <option value="Waterlogging">Waterlogging</option>
                    <option value="Severe Cyclone">Severe Cyclone</option>
                    <option value="Tree Fall">Tree Fall</option>
                    <option value="Landslide">Landslide</option>
                    <option value="Electrical Hazard">Electrical Hazard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Observed Severity
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-border rounded-xl focus:ring-1 focus:ring-weather-sky outline-none"
                  >
                    <option value="CRITICAL">Critical (Rescue Needed)</option>
                    <option value="HIGH SEVERITY">High Severity</option>
                    <option value="MEDIUM">Medium / Notice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Ground Situation Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe water depth, traffic blockage, stranded people, or infrastructure damage..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-border rounded-xl focus:ring-1 focus:ring-weather-sky outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-[11px] text-sky-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-weather-sky flex-shrink-0" />
                <span>Device GPS coordinates will be auto-attached and corroborated with IMD Doppler radar readings.</span>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-weather-sky hover:bg-sky-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
