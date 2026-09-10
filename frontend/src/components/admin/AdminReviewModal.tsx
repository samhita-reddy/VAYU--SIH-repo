import React, { useState } from "react";
import { 
  X, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Copy, 
  AlertOctagon, 
  Play, 
  RotateCcw, 
  Brain, 
  MapPin, 
  Clock, 
  Sliders,
  Check
} from "lucide-react";
import { WeatherEvent, VerificationStatus } from "../../types/weather";

interface AdminReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingEvents: WeatherEvent[];
  onUpdateEventStatus: (id: string, status: VerificationStatus) => void;
  onTriggerFloodScenario: (scenarioCity: "mumbai" | "guwahati" | "wayanad" | "chennai") => void;
  onResetToDefault: () => void;
}

export const AdminReviewModal: React.FC<AdminReviewModalProps> = ({
  isOpen,
  onClose,
  pendingEvents,
  onUpdateEventStatus,
  onTriggerFloodScenario,
  onResetToDefault,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    pendingEvents[0]?.id || ""
  );
  const [scenarioSuccess, setScenarioSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentEvent = pendingEvents.find((e) => e.id === selectedEventId) || pendingEvents[0];

  const handleScenarioClick = (city: "mumbai" | "guwahati" | "wayanad" | "chennai") => {
    onTriggerFloodScenario(city);
    setScenarioSuccess(`Triggered monsoon inundation scenario for ${city.toUpperCase()}.`);
    setTimeout(() => setScenarioSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl border border-border shadow-elevated flex flex-col overflow-hidden text-xs">
        {/* Header */}
        <div className="h-14 px-6 border-b border-border bg-navy-50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white">
              <Sliders className="w-4 h-4 text-weather-sky" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-navy-900">Incident Review Console</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-blue text-white uppercase">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-navy-400">
                Verification & scenario simulator • Republic of India
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-navy-300 hover:text-navy-800 hover:bg-navy-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Queue */}
          <div className="w-72 border-r border-border bg-navy-50 flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-border bg-white flex items-center justify-between">
              <span className="font-bold text-navy-800">Verification Queue</span>
              <span className="px-1.5 py-0.5 rounded-md bg-alert-warningBg text-accent-orange font-bold font-mono text-[10px] border border-accent-orange/20">
                {pendingEvents.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {pendingEvents.map((evt) => {
                const isSelected = evt.id === currentEvent?.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-white border-accent-blue/30 shadow-card text-navy-800"
                        : "bg-white/60 border-border text-navy-500 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        evt.severity === "CRITICAL" ? "bg-alert-criticalBg text-alert-critical" : "bg-alert-warningBg text-accent-orange"
                      }`}>
                        {evt.severity}
                      </span>
                      <span className="text-[10px] text-navy-300 font-mono">
                        {evt.timestampIST.split(" ")[1]}
                      </span>
                    </div>
                    <div className="font-bold text-navy-800 line-clamp-1 text-[11px]">{evt.title}</div>
                    <div className="text-[10px] text-navy-400 mt-0.5">{evt.city}, {evt.state}</div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px]">
                      <span className="text-navy-300">Credibility:</span>
                      <span className="font-bold text-accent-green">{evt.credibilityScore}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scenario Simulator */}
            <div className="p-3 border-t border-border bg-white space-y-2 flex-shrink-0">
              <div className="flex items-center space-x-1.5 font-bold text-navy-800">
                <Play className="w-3.5 h-3.5 text-accent-blue" />
                <span>Demo Scenarios</span>
              </div>
              <p className="text-[10px] text-navy-400">
                Trigger escalating monsoon flood sequences:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleScenarioClick("mumbai")}
                  className="px-2 py-1.5 bg-navy-50 hover:bg-accent-blue/5 hover:text-accent-blue border border-border rounded-lg font-medium text-[11px] transition-colors text-navy-600"
                >
                  Mumbai Deluge
                </button>
                <button
                  onClick={() => handleScenarioClick("guwahati")}
                  className="px-2 py-1.5 bg-navy-50 hover:bg-accent-blue/5 hover:text-accent-blue border border-border rounded-lg font-medium text-[11px] transition-colors text-navy-600"
                >
                  Brahmaputra
                </button>
                <button
                  onClick={() => handleScenarioClick("wayanad")}
                  className="px-2 py-1.5 bg-navy-50 hover:bg-accent-blue/5 hover:text-accent-blue border border-border rounded-lg font-medium text-[11px] transition-colors text-navy-600"
                >
                  Wayanad Runoff
                </button>
                <button
                  onClick={() => handleScenarioClick("chennai")}
                  className="px-2 py-1.5 bg-navy-50 hover:bg-accent-blue/5 hover:text-accent-blue border border-border rounded-lg font-medium text-[11px] transition-colors text-navy-600"
                >
                  Chennai Coastal
                </button>
              </div>

              <button
                onClick={onResetToDefault}
                className="w-full mt-1 px-2 py-1.5 bg-navy-50 hover:bg-navy-100 text-navy-400 rounded-lg border border-border flex items-center justify-center space-x-1 text-[10px] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Local State</span>
              </button>
            </div>
          </div>

          {/* Right: Inspection */}
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto bg-white">
            {scenarioSuccess && (
              <div className="mb-4 p-3 bg-alert-verifiedBg border border-accent-green/20 rounded-xl text-accent-green flex items-center space-x-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">{scenarioSuccess}</span>
              </div>
            )}

            {currentEvent ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-border pb-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-alert-warningBg text-accent-orange border border-accent-orange/20">
                      {currentEvent.verificationStatus}
                    </span>
                    <span className="text-navy-300 font-mono text-[11px]">{currentEvent.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{currentEvent.title}</h3>
                  <div className="flex items-center space-x-2 text-navy-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                    <span>{currentEvent.city}, {currentEvent.district}, {currentEvent.state}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-navy-300" />
                    <span className="font-mono">{currentEvent.timestampIST}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-navy-400 font-bold uppercase text-[10px] mb-1 tracking-wider">
                    Incident Description:
                  </label>
                  <p className="p-3 bg-navy-50 border border-border rounded-xl text-navy-700 leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                {/* AI Corroboration */}
                <div className="p-4 bg-blue-50/40 rounded-xl border border-accent-blue/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-navy-800">
                      <Brain className="w-4 h-4 text-accent-blue" />
                      <span>AI Corroboration Analysis</span>
                    </div>
                    <span className="text-accent-green font-bold bg-white px-2 py-0.5 rounded-lg border border-accent-green/20">
                      Score: {currentEvent.credibilityScore} / 100
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white p-2.5 rounded-xl border border-accent-blue/10">
                      <div className="text-[10px] text-navy-400 uppercase font-bold">Source Trust</div>
                      <div className="text-base font-bold text-navy-800">{currentEvent.aiEvidence?.sourceReliabilityScore || 85}%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-accent-blue/10">
                      <div className="text-[10px] text-navy-400 uppercase font-bold">Weather Match</div>
                      <div className="text-base font-bold text-navy-800">{currentEvent.aiEvidence?.weatherConsistencyScore || 90}%</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-accent-blue/10">
                      <div className="text-[10px] text-navy-400 uppercase font-bold">Spatial Cluster</div>
                      <div className="text-base font-bold text-navy-800">{currentEvent.aiEvidence?.spatialCorroborationScore || 88}%</div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-accent-blue/10 text-navy-600 text-xs">
                    <strong className="text-navy-800 block mb-1">Decision Rationale:</strong>
                    {currentEvent.aiEvidence?.rationale || "Automated corroboration validated against regional AWS telemetry."}
                  </div>
                </div>

                {/* Ground Station Telemetry */}
                {currentEvent.liveParameters && (
                  <div className="p-3 bg-navy-50 rounded-xl border border-border">
                    <span className="text-[10px] font-bold text-navy-400 uppercase block mb-1.5 tracking-wider">
                      Ground Station Telemetry:
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      <div className="bg-white p-2 rounded-lg border border-border">
                        <span className="text-navy-300 text-[10px] block">Temp</span>
                        <span className="font-bold text-navy-800">{currentEvent.liveParameters.temperature}°C</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-border">
                        <span className="text-navy-300 text-[10px] block">Rainfall</span>
                        <span className="font-bold text-navy-800">{currentEvent.liveParameters.rainfall} mm</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-border">
                        <span className="text-navy-300 text-[10px] block">Humidity</span>
                        <span className="font-bold text-navy-800">{currentEvent.liveParameters.humidity}%</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-border">
                        <span className="text-navy-300 text-[10px] block">Wind</span>
                        <span className="font-bold text-navy-800">{currentEvent.liveParameters.windSpeed} km/h</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-navy-300 py-12">
                No items selected in queue.
              </div>
            )}

            {/* Action Bar */}
            {currentEvent && (
              <div className="pt-4 border-t border-border flex items-center justify-between mt-4">
                <div className="text-[11px] text-navy-300">
                  Actions propagate to National Early Warning map & alerts.
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateEventStatus(currentEvent.id, "REJECTED")}
                    className="px-3 py-2 rounded-xl bg-alert-criticalBg text-alert-critical hover:bg-red-100 border border-alert-critical/15 font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => onUpdateEventStatus(currentEvent.id, "DUPLICATE")}
                    className="px-3 py-2 rounded-xl bg-navy-50 text-navy-600 hover:bg-navy-100 border border-border font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Duplicate</span>
                  </button>

                  <button
                    onClick={() => onUpdateEventStatus(currentEvent.id, "ESCALATED")}
                    className="px-3 py-2 rounded-xl bg-alert-warningBg text-accent-orange hover:bg-orange-100 border border-accent-orange/15 font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <AlertOctagon className="w-4 h-4" />
                    <span>Escalate</span>
                  </button>

                  <button
                    onClick={() => onUpdateEventStatus(currentEvent.id, "VERIFIED")}
                    className="px-4 py-2 rounded-xl bg-accent-green text-white hover:bg-green-700 font-bold flex items-center space-x-1.5 shadow-card transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Verify & Broadcast</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
