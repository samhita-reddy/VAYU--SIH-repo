import React, { useState } from "react";
import { Brain, CheckCircle2, AlertOctagon, HelpCircle, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { evaluateCredibility, classifyReportText } from "../../services/aiVerification";
import { LiveWeatherParameters } from "../../types/weather";

export const AiIntelligenceSlide: React.FC = () => {
  const [inputText, setInputText] = useState(
    "Severe cloudburst in Kurla and Hindmata, water level reached 3 feet, traffic completely stopped."
  );
  const [sourceType, setSourceType] = useState("Citizen Report");
  const [simulatedRain, setSimulatedRain] = useState(48);
  const [simulatedHumidity, setSimulatedHumidity] = useState(92);
  const [simulatedTemp, setSimulatedTemp] = useState(28);

  const mockObserved: LiveWeatherParameters = {
    temperature: simulatedTemp,
    feelsLike: simulatedTemp + 4,
    humidity: simulatedHumidity,
    rainfall: simulatedRain,
    windSpeed: 24,
    windDirection: 240,
    windDirectionCardinal: "WSW",
    pressure: 1004,
    cloudCover: 95,
    visibility: 4.5,
    uvIndex: 2.0,
    weatherCode: 65,
    weatherDescription: "Heavy Rain",
    observationTimeIST: "08-Sep-2026 22:30 IST",
    source: "IMD AWS/ARG",
    sourceCategory: "OFFICIAL OBSERVATION",
    isLive: true,
  };

  const aiResult = evaluateCredibility(inputText, sourceType, mockObserved, 4);

  const presets = [
    {
      title: "Mumbai Heavy Deluge (Valid)",
      text: "Torrential downpour in Kurla and Hindmata, water level reached 3 feet, traffic stopped.",
      source: "Citizen Report",
      rain: 55,
      humidity: 94,
    },
    {
      title: "Heatwave Claim (Discrepancy)",
      text: "Extreme heatwave in Jaipur, sunstroke conditions, temperature feeling like 48 degrees.",
      source: "Citizen Report",
      rain: 0,
      humidity: 30,
      temp: 26, // Intentional mismatch
    },
    {
      title: "Brahmaputra Overflow (Official Telemetry)",
      text: "CWC telemetry alert: Brahmaputra gauge crossed warning level by 0.35m at Pandu station.",
      source: "CWC River Gauge",
      rain: 42,
      humidity: 90,
    },
    {
      title: "Western Ghats Landslide Runoff",
      text: "Massive debris and hillside flood water rushing through Chooralmala valley.",
      source: "Citizen Report",
      rain: 110,
      humidity: 98,
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 space-y-6 text-xs animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Explainable AI Engine • Grounded in Weather Telemetry</span>
          </div>
          <h2 className="text-xl font-bold text-navy-900 tracking-tight">
            AI Incident Verification & Cross-Corroboration Studio
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Transparent NLP classification and automated cross-referencing of citizen field reports against active IMD ground stations and Doppler radar.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            No Black-Box Decisions
          </span>
        </div>
      </div>

      {/* Preset Test Scenarios */}
      <div>
        <div className="text-xs font-bold text-navy-900 mb-2">
          Select or Test Live Validation Presets:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((p) => (
            <button
              key={p.title}
              onClick={() => {
                setInputText(p.text);
                setSourceType(p.source);
                setSimulatedRain(p.rain);
                setSimulatedHumidity(p.humidity);
                if (p.temp) setSimulatedTemp(p.temp);
              }}
              className="p-3 bg-white hover:bg-sky-50 border border-border hover:border-sky-300 rounded-xl text-left transition-all shadow-sm group"
            >
              <div className="font-bold text-navy-900 text-xs group-hover:text-weather-sky transition-colors">
                {p.title}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate">
                {p.source}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Testing Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input Text & Station Parameters */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-border shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy-900 text-sm">
              Input Incident Text & Ground Truth Telemetry
            </h3>
            <span className="text-[10px] text-slate-400">Step 1: Input</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Field Report Description:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-border rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-weather-sky font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">
                Report Source:
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-border rounded-lg text-xs font-semibold"
              >
                <option value="Citizen Report">Citizen Mobile Portal</option>
                <option value="IMD AWS/ARG">IMD AWS/ARG (Official)</option>
                <option value="CWC River Gauge">CWC River Gauge (Official)</option>
                <option value="MOSDAC / ISRO">MOSDAC Satellite Product</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">
                Observed Rain (mm):
              </label>
              <input
                type="number"
                value={simulatedRain}
                onChange={(e) => setSimulatedRain(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-border rounded-lg text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            <strong>Cross-Corroboration Logic:</strong> If an incident claims extreme rain/flood, but the nearest IMD AWS reports 0 mm and low humidity, credibility score is automatically penalised and flagged for review.
          </div>
        </div>

        {/* Right: AI Explainability Card ("Why this status?") */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-border shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy-900 text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Verification Output ("Why this status?")</span>
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              aiResult.suggestedStatus === "VERIFIED"
                ? "bg-emerald-100 text-emerald-800"
                : aiResult.suggestedStatus === "REJECTED"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-800"
            }`}>
              {aiResult.suggestedStatus}
            </span>
          </div>

          {/* Key Classification */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-border">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Classified Hazard</span>
              <strong className="text-base font-bold text-navy-900">{aiResult.classifiedType}</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Confidence: {aiResult.confidence}%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-border">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Credibility Score</span>
              <strong className="text-base font-bold text-emerald-700">{aiResult.credibilityScore} / 100</strong>
              <span className="text-[10px] text-slate-500 block mt-0.5">Weighted Multi-Source</span>
            </div>
          </div>

          {/* Evidence Scoring Breakdown */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Source Trust Factor:</span>
              <span className="font-bold font-mono text-navy-900">{aiResult.evidence.sourceReliabilityScore}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Meteorological Consistency:</span>
              <span className="font-bold font-mono text-navy-900">{aiResult.evidence.weatherConsistencyScore}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Spatial Cluster Corroboration:</span>
              <span className="font-bold font-mono text-navy-900">{aiResult.evidence.spatialCorroborationScore}%</span>
            </div>
          </div>

          {/* Explainable Decision Support Rationale Box */}
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-900 text-xs leading-relaxed">
            <strong className="block text-navy-900 mb-1">Decision Support Rationale:</strong>
            {aiResult.evidence.rationale}
            <div className="mt-2 text-[11px] text-slate-600 pt-2 border-t border-emerald-200/60">
              <strong>Live Telemetry Evidence:</strong> {aiResult.evidence.liveParameterEvidence}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};