import React, { useState, useRef, useEffect } from "react";
import { Search, Radio, Bell, RefreshCw, ShieldAlert, ShieldCheck, MapPin, Sliders } from "lucide-react";
import { searchIndiaLocations, IndiaLocation } from "../../services/geoIndia";

interface TopBarProps {
  isDemoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  lastRefreshIST: string;
  onRefresh: () => void;
  onSelectLocation: (loc: IndiaLocation) => void;
  criticalAlertsCount: number;
  onOpenAdminConsole: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isDemoMode,
  onToggleDemoMode,
  lastRefreshIST,
  onRefresh,
  onSelectLocation,
  criticalAlertsCount,
  onOpenAdminConsole,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<IndiaLocation[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      const results = searchIndiaLocations(val);
      setSuggestions(results);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelect = (loc: IndiaLocation) => {
    setSearchQuery(`${loc.name}, ${loc.state}`);
    setIsDropdownOpen(false);
    onSelectLocation(loc);
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b-2 border-border px-4 flex items-center justify-between shadow-card relative z-30">
      {/* Brand & National Badge */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue to-accent-teal flex items-center justify-center text-white font-bold shadow-panel">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7 7 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7 7 0 0 1 11 3.07V3a1 1 0 0 1 2 0v.07A7 7 0 0 1 18.93 9H19a1 1 0 0 1 0 2h-.07A7 7 0 0 1 13 16.93z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-extrabold text-navy-900 tracking-tight leading-tight">
              VAYU
            </h1>
            <span className="text-[10px] text-navy-400 font-mono hidden md:inline">
              v1.0
            </span>
          </div>
          <p className="text-[10px] text-navy-500 font-medium leading-none mt-0.5">
            National Multi-Hazard Early Warning & Hydrology Platform • India Only
          </p>
        </div>
      </div>

      {/* India-Only Search Bar */}
      <div className="flex-1 max-w-md mx-6 relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="w-4 h-4 text-navy-300 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Indian state, district, or city..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            className="w-full pl-9 pr-4 py-2 text-xs bg-navy-50 border border-border rounded-lg text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all"
          />
        </div>

        {/* Search Suggestions Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-elevated max-h-60 overflow-y-auto z-50">
            <div className="p-1.5 text-[10px] font-bold text-navy-400 uppercase tracking-wider px-3 bg-navy-50 border-b border-border">
              Indian Locations ({suggestions.length} matches)
            </div>
            {suggestions.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-navy-50 border-b border-navy-50 last:border-b-0 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="font-semibold text-navy-800">{loc.name}</span>
                  <span className="text-navy-400 text-[11px]">({loc.district}, {loc.state})</span>
                </div>
                <span className="text-[10px] text-navy-400 bg-navy-50 px-1.5 py-0.5 rounded font-mono">
                  {loc.type}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* LIVE vs DEMO Status */}
        <div className="flex items-center bg-navy-50 p-0.5 rounded-lg border border-border">
          <button
            onClick={() => onToggleDemoMode(false)}
            className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md flex items-center space-x-1.5 transition-all ${
              !isDemoMode
                ? "bg-white text-accent-blue shadow-card border border-border"
                : "text-navy-400 hover:text-navy-700"
            }`}
            title="Open-Meteo Live API with IMD abstraction"
          >
            <span className={`w-2 h-2 rounded-full ${!isDemoMode ? "bg-accent-green animate-pulse" : "bg-navy-200"}`} />
            <span>LIVE API</span>
          </button>
          <button
            onClick={() => onToggleDemoMode(true)}
            className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md flex items-center space-x-1.5 transition-all ${
              isDemoMode
                ? "bg-white text-accent-orange shadow-card border border-border"
                : "text-navy-400 hover:text-navy-700"
            }`}
            title="Deterministic Indian flood demo & synthetic dataset"
          >
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? "bg-accent-orange" : "bg-navy-200"}`} />
            <span>DEMO DATA</span>
          </button>
        </div>

        {/* Last Refresh IST */}
        <div className="hidden lg:flex items-center space-x-1.5 text-[11px] text-navy-400 bg-navy-50 px-2.5 py-1.5 rounded-md border border-border">
          <span className="text-[10px] uppercase font-bold text-navy-300">Refreshed:</span>
          <span className="font-mono text-navy-700 font-medium text-[11px]">{lastRefreshIST}</span>
        </div>

        {/* Refresh Action */}
        <button
          onClick={handleRefreshClick}
          className="p-2 rounded-lg text-navy-400 hover:text-accent-blue hover:bg-navy-50 border border-border transition-all"
          title="Refresh All Real-Time India Feeds"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-accent-blue" : ""}`} />
        </button>

        {/* Active Critical Alerts */}
        <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-alert-criticalBg border border-alert-critical/30 text-alert-critical text-xs font-bold shadow-card pulse-critical">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{criticalAlertsCount}</span>
          <span className="hidden sm:inline font-medium text-[11px]">Active</span>
        </div>

        {/* Admin Console */}
        <button
          onClick={onOpenAdminConsole}
          className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-[11px] font-semibold flex items-center space-x-1.5 shadow-panel transition-all"
        >
          <Sliders className="w-3.5 h-3.5 text-weather-sky" />
          <span className="hidden md:inline">Admin & Scenario</span>
        </button>
      </div>
    </header>
  );
};
