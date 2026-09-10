import React from "react";
import { 
  Globe, 
  Database, 
  TrendingUp, 
  MessageSquareQuote,
  Shield, 
  Activity, 
  ChevronLeft, 
  ChevronRight,
  Radio
} from "lucide-react";

export type PlatformViewMode = 
  | "command_center" 
  | "data_explorer" 
  | "analytics" 
  | "social_media"
  | "citizen_reports" 
  | "system_status";

export interface PlatformNavigationItem {
  id: PlatformViewMode;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const PLATFORM_NAVIGATION_ITEMS: PlatformNavigationItem[] = [
  {
    id: "command_center",
    number: 1,
    title: "Command Center",
    shortTitle: "Map Command",
    subtitle: "India Geospatial Map & Live Telemetry",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: "data_explorer",
    number: 2,
    title: "Data Explorer",
    shortTitle: "Data Explorer",
    subtitle: "Telemetry Records & Incident Dossier",
    icon: <Database className="w-4 h-4" />,
  },
  {
    id: "analytics",
    number: 3,
    title: "Analytics & Insights",
    shortTitle: "Analytics",
    subtitle: "Climatology, Trajectories & ML Warnings",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "social_media",
    number: 4,
    title: "Social Media Monitor",
    shortTitle: "Social Signals",
    subtitle: "Vernacular NLP & Sentiment Trends",
    icon: <MessageSquareQuote className="w-4 h-4" />,
  },
  {
    id: "citizen_reports",
    number: 5,
    title: "Citizen Reports",
    shortTitle: "Crowdsource",
    subtitle: "Tactical Field Feed & Ground Verification",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "system_status",
    number: 6,
    title: "System Status",
    shortTitle: "System Mesh",
    subtitle: "Ingestion Queues, Latency & Audit Logs",
    icon: <Activity className="w-4 h-4" />,
  },
];

interface SlideNavigatorProps {
  currentView: PlatformViewMode;
  onSelectView: (view: PlatformViewMode) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const SlideNavigator: React.FC<SlideNavigatorProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`h-full bg-[#0B111E] border-r border-slate-800/80 shadow-2xl z-30 flex flex-col justify-between transition-all duration-300 select-none flex-shrink-0 text-white ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-800/80 bg-[#070D18] flex items-center justify-between">
        {!isCollapsed ? (
          <div className="w-full">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-black text-sm tracking-wider text-white flex items-center gap-1.5">
                  VAYU
                </div>
                <div className="text-[9px] font-mono text-slate-400">SIH 2026 / NAT-INTEL</div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center space-x-1.5 text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>OPERATIONAL FLIGHT LEVEL</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md">
            V
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {PLATFORM_NAVIGATION_ITEMS.map((item) => {
          const isActive = item.id === currentView;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full text-left rounded-xl transition-all duration-200 flex items-center ${
                isCollapsed ? "p-3 justify-center" : "px-3 py-2.5 space-x-3"
              } ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
              title={isCollapsed ? `${item.number}. ${item.title}` : undefined}
            >
              {/* Icon */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${
                  isActive
                    ? "bg-slate-950/20 text-slate-950 scale-105"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs tracking-tight truncate ${isActive ? "font-extrabold text-slate-950" : "font-medium text-slate-300"}`}>
                      {item.title}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate ${isActive ? "text-slate-900/80 font-semibold" : "text-slate-500"}`}>
                    {item.subtitle}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070D18] flex flex-col space-y-2">
        {!isCollapsed && (
          <div className="flex items-center justify-between text-[10px] font-mono px-1">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MET-NET GRID</span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
              99.89%
            </span>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto w-full flex items-center justify-center"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};