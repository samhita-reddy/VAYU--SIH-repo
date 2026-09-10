import React, { useState } from "react";
import {
  PlayCircle,
  Radio,
  Send,
  Shield,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  Flame,
  CloudRain,
  Waves,
  Compass,
  Building,
  Volume2
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  hazardType: "Flood" | "Cyclone" | "Landslide" | "Cloudburst";
  location: string;
  state: string;
  severity: "CRITICAL" | "HIGH";
  rainfallRate: string;
  affectedPopulation: string;
  deployedNDRF: string;
  description: string;
  recommendedAction: string;
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    id: "scen_mumbai",
    name: "Mumbai Coastal Deluge & High-Tide Surge",
    hazardType: "Flood",
    location: "Mithi River / Dadar / Kurla",
    state: "Maharashtra",
    severity: "CRITICAL",
    rainfallRate: "284 mm / 24h",
    affectedPopulation: "1.45 Million",
    deployedNDRF: "6 Battalions (NDRF 5th Bn Pune)",
    description:
      "Extreme cloudburst coinciding with 4.87m Arabian Sea high tide. Mithi River exceeds danger mark by 1.4m. Major arterial roads and local train corridors submerged.",
    recommendedAction:
      "Activate pumping stations at Love Grove & Cleveland Bunder. Evacuate low-lying slums to 42 municipal school shelters.",
  },
  {
    id: "scen_assam",
    name: "Brahmaputra Flood Peak Wave",
    hazardType: "Flood",
    location: "Dhubri & Majuli Island",
    state: "Assam",
    severity: "CRITICAL",
    rainfallRate: "192 mm / 24h",
    affectedPopulation: "2.10 Million",
    deployedNDRF: "9 Battalions (NDRF 1st Bn Guwahati)",
    description:
      "Brahmaputra flowing 1.82m above Highest Flood Level (HFL). Over 18 embankments breached across Dhubri, Barpeta, and Morigaon districts.",
    recommendedAction:
      "Deploy 45 motorized rescue boats. Airdrop emergency food packets in isolated riverine chars. Fortify animal highlands in Kaziranga.",
  },
  {
    id: "scen_wayanad",
    name: "Western Ghats Saturated Debris Flow",
    hazardType: "Landslide",
    location: "Meppadi & Chooralmala",
    state: "Kerala",
    severity: "CRITICAL",
    rainfallRate: "372 mm / 24h",
    affectedPopulation: "38,000",
    deployedNDRF: "4 Battalions + Madras Sappers",
    description:
      "Continuous torrential precipitation causes catastrophic slope failure and debris flow. Road connectivity cut across Iruvaipuzha river bridge.",
    recommendedAction:
      "Construct Bailey bridge. Ground-penetrating radar rescue teams mobilized. Drone mapping of active crack progression.",
  },
  {
    id: "scen_odisha",
    name: "Bay of Bengal Super-Cyclonic Landfall",
    hazardType: "Cyclone",
    location: "Puri & Jagatsinghpur Coast",
    state: "Odisha",
    severity: "CRITICAL",
    rainfallRate: "310 mm / 24h (Winds 165 km/h)",
    affectedPopulation: "3.20 Million",
    deployedNDRF: "14 Battalions (ODRAF + NDRF)",
    description:
      "Category 4 equivalent tropical cyclone making landfall with 3.8m astronomical storm surge. Power grid and mobile towers vulnerable.",
    recommendedAction:
      "Mass pre-emptive evacuation to 800 cyclone shelters. Activate satellite amateur radio network and satellite phones.",
  },
];

interface OperationsSlideProps {
  onLoadScenarioToMap?: (scenario: Scenario) => void;
}

export const OperationsSlide: React.FC<OperationsSlideProps> = ({ onLoadScenarioToMap }) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(PRESET_SCENARIOS[0]);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [targetChannel, setTargetChannel] = useState<"all" | "sms" | "siren" | "cell">("all");
  const [alertSeverity, setAlertSeverity] = useState<"extreme" | "severe" | "moderate">("extreme");
  const [alertMessage, setAlertMessage] = useState(
    "IMD/CWC CRITICAL ALERT: Flash flood threat imminent in your zone. Move to designated high ground immediately. Follow SDRF instructions."
  );

  const handleTriggerBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-full bg-red-100 text-red-700 tracking-wide">
              Slide 6: Emergency Command & Scenarios
            </span>
            <span className="text-xs text-slate-400 font-mono">CAP-Compliant Dispatch</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-navy-900 mt-1.5">
            Emergency Operations & Deterministic Disaster Scenarios
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-3xl">
            Execute real-time incident coordination, mobilize NDRF/SDRF response assets, and simulate catastrophic India weather events using deterministic hydrological models.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] uppercase font-bold text-emerald-700">National Hotlines</div>
            <div className="text-sm font-mono font-bold text-emerald-900 flex items-center justify-end space-x-1">
              <PhoneCall className="w-3.5 h-3.5 mr-1" />
              <span>1070 / 1077 (NDMA)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Grid: Scenarios Selector & Scenario Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Scenarios List (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-4 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center space-x-2">
                <PlayCircle className="w-4 h-4 text-weather-sky" />
                <h3 className="text-sm font-bold text-navy-900">Deterministic Scenario Walkthroughs</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">4 Scenarios Ready</span>
            </div>

            <div className="space-y-2.5">
              {PRESET_SCENARIOS.map((scen) => {
                const isSelected = selectedScenario.id === scen.id;
                return (
                  <button
                    key={scen.id}
                    onClick={() => setSelectedScenario(scen)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-sky-50 border-sky-300 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {scen.hazardType === "Flood" && <Waves className="w-4 h-4 text-blue-600" />}
                        {scen.hazardType === "Cyclone" && <Compass className="w-4 h-4 text-purple-600" />}
                        {scen.hazardType === "Landslide" && <Flame className="w-4 h-4 text-amber-600" />}
                        <span className="text-xs font-bold text-navy-900">{scen.name}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        {scen.severity}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{scen.location}, {scen.state}</span>
                      <span className="font-mono font-medium text-navy-800">{scen.rainfallRate}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={() => onLoadScenarioToMap && onLoadScenarioToMap(selectedScenario)}
              className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <PlayCircle className="w-4 h-4 text-weather-sky" />
              <span>Load Selected Scenario to National Map</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Col: Active Scenario Tactical Brief (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tactical Incident Overview
                </span>
                <h2 className="text-base font-bold text-navy-900 mt-0.5">
                  {selectedScenario.name}
                </h2>
              </div>
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-red-50 text-red-600 border border-red-200">
                {selectedScenario.state.toUpperCase()} SECTOR
              </span>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-slate-50 border border-border rounded-xl p-3">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Precipitation Peak</div>
                <div className="text-sm font-bold text-navy-900 mt-0.5 font-mono">{selectedScenario.rainfallRate}</div>
              </div>
              <div className="bg-slate-50 border border-border rounded-xl p-3">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Exposed Population</div>
                <div className="text-sm font-bold text-navy-900 mt-0.5 font-mono">{selectedScenario.affectedPopulation}</div>
              </div>
              <div className="bg-slate-50 border border-border rounded-xl p-3">
                <div className="text-[10px] text-slate-500 uppercase font-medium">NDRF Mobilization</div>
                <div className="text-xs font-bold text-navy-900 mt-0.5 truncate">{selectedScenario.deployedNDRF}</div>
              </div>
            </div>

            {/* Incident Narrative */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Situation Report (SITREP)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-border">
                  {selectedScenario.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Action Plan (IAP)
                </h4>
                <div className="flex items-start space-x-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{selectedScenario.recommendedAction}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick status badges */}
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulated T-Zero: 15 mins ago</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Standard Operating Procedure Act 2005</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Common Alerting Protocol (CAP) Broadcast & Inter-Agency Coordination */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CAP Alert Broadcast Console (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-bold text-navy-900">
                Common Alerting Protocol (CAP) Public Warning Console
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              NDMA Sachet Engine
            </span>
          </div>

          <div className="space-y-4">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Warning Severity
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["extreme", "severe", "moderate"] as const).map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setAlertSeverity(sev)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-lg uppercase transition-all ${
                        alertSeverity === sev
                          ? sev === "extreme"
                            ? "bg-red-600 text-white shadow-sm"
                            : sev === "severe"
                            ? "bg-amber-600 text-white shadow-sm"
                            : "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Dissemination Channels
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["all", "sms", "cell", "siren"] as const).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setTargetChannel(ch)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-lg uppercase transition-all text-center ${
                        targetChannel === ch
                          ? "bg-navy-900 text-white font-bold"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alert Message Text */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Broadcast Copy (Multi-Lingual Ready)
              </label>
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-weather-sky resize-none text-navy-900"
              />
            </div>

            {/* Action Button & Status */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-500">
                Targeted: <span className="font-bold text-navy-800">{selectedScenario.state}</span> Emergency Geo-Fences
              </div>

              <button
                onClick={handleTriggerBroadcast}
                disabled={broadcastSent}
                className={`py-2 px-5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  broadcastSent
                    ? "bg-emerald-600 text-white cursor-default"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                }`}
              >
                {broadcastSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Broadcast Transmitted Successfully</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Authorize & Push CAP Broadcast</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Agency Response Teams (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-weather-sky" />
              <h3 className="text-sm font-bold text-navy-900">Multi-Agency Response Matrix</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Live Roster</span>
          </div>

          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-border flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                  NDRF
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-900">National Disaster Response Force</div>
                  <div className="text-[10px] text-slate-500">16 Battalions active nationwide</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Standby / Deployed
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-border flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  SDRF
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-900">State Disaster Response Forces</div>
                  <div className="text-[10px] text-slate-500">District disaster management cells</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Mobilized
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-border flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  ICG
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-900">Indian Coast Guard & Navy (ENC/WNC)</div>
                  <div className="text-[10px] text-slate-500">Offshore patrol & aerial reconnaissance</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                High Alert
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-border flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  IMD
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-900">IMD Nowcast & Warning Division</div>
                  <div className="text-[10px] text-slate-500">3-hour interval radar bulletin delivery</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Active Feed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
