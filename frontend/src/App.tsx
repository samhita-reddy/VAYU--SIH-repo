import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TopBar } from "./components/layout/TopBar";
import { LayerControls } from "./components/map/LayerControls";
import { IndiaMap } from "./components/map/IndiaMap";
import { RightAlertsPanel } from "./components/panels/RightAlertsPanel";
import { BottomAnalytics } from "./components/panels/BottomAnalytics";
import { LocationDetailDrawer } from "./components/map/LocationDetailDrawer";
import { AdminReviewModal } from "./components/admin/AdminReviewModal";

// Sidebar & Operational Views
import { 
  SlideNavigator, 
  PlatformViewMode 
} from "./components/layout/SlideNavigator";
import { DataExplorerView } from "./components/views/DataExplorerView";
import { AnalyticsInsightsView } from "./components/views/AnalyticsInsightsView";
import { CitizenReportsView } from "./components/views/CitizenReportsView";
import { SystemStatusView } from "./components/views/SystemStatusView";
import { SocialMediaMonitorView } from "./components/views/SocialMediaMonitorView";

import { 
  WeatherEvent, 
  LiveWeatherParameters, 
  RiverGaugeReading, 
  IndiaLocation, 
  VerificationStatus 
} from "./types/weather";
import { MapLayerToggles, DashboardFilters, HeatmapPoint } from "./types/layers";
import { NationalKPIs, StateDistrictImpact, TimelineDataPoint } from "./types/alert";

import { INITIAL_WEATHER_EVENTS } from "./data/mockEvents";
import { CWC_RIVER_GAUGES } from "./data/riverBasins";
import { DISTRICT_IMPACT_RANKINGS, TIMELINE_7_DAYS, INDIA_HEATMAP_POINTS } from "./data/districtStats";
import { MAJOR_INDIAN_LOCATIONS, isWithinIndia } from "./services/geoIndia";
import { activeWeatherProvider, getSimulatedFallbackWeather } from "./services/weatherProvider";

export const App: React.FC = () => {
  // State Management
  const [events, setEvents] = useState<WeatherEvent[]>(INITIAL_WEATHER_EVENTS);
  const [riverGauges, setRiverGauges] = useState<RiverGaugeReading[]>(CWC_RIVER_GAUGES);
  const [districtRankings, setDistrictRankings] = useState<StateDistrictImpact[]>(DISTRICT_IMPACT_RANKINGS);
  const [timelineData] = useState<TimelineDataPoint[]>(TIMELINE_7_DAYS);
  const [heatmapPoints, setHeatmapPoints] = useState<HeatmapPoint[]>(INDIA_HEATMAP_POINTS);
  const [currentView, setCurrentView] = useState<PlatformViewMode>("command_center");
  const [isNavRailCollapsed, setIsNavRailCollapsed] = useState(false);

  // Layer Toggles
  const [layers, setLayers] = useState<MapLayerToggles>({
    rainfallIntensity: true,
    floodRisk: true,
    riverLevels: true,
    lightning: false,
    heatwaveRisk: false,
    verifiedReports: true,
    citizenReports: true,
  });

  // Filters
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    selectedState: "",
    selectedDistrict: "",
    selectedEventType: "",
    selectedSeverity: "",
    selectedStatus: "",
    selectedSourceCategory: "",
    dateRange: "all",
  });

  // Selected State
  const [selectedLocation, setSelectedLocation] = useState<IndiaLocation | null>(MAJOR_INDIAN_LOCATIONS[0]); // New Delhi
  const [selectedEvent, setSelectedEvent] = useState<WeatherEvent | null>(null);
  const [selectedGauge, setSelectedGauge] = useState<RiverGaugeReading | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Live Weather Telemetry State
  const [liveWeather, setLiveWeather] = useState<LiveWeatherParameters | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lastRefreshIST, setLastRefreshIST] = useState<string>("");

  // Update IST Refresh Time
  const updateRefreshTime = useCallback(() => {
    const now = new Date();
    setLastRefreshIST(
      now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + " IST"
    );
  }, []);

  useEffect(() => {
    updateRefreshTime();
  }, [updateRefreshTime]);

  // Fetch Current Weather Telemetry for Target Location
  const fetchWeatherForLocation = useCallback(
    async (lat: number, lon: number, name?: string) => {
      if (!isWithinIndia(lat, lon)) {
        console.warn("Attempted weather fetch outside India bounds:", lat, lon);
        return;
      }

      setIsLoadingWeather(true);
      try {
        if (isDemoMode) {
          const sim = getSimulatedFallbackWeather(lat, lon, name);
          setLiveWeather(sim);
        } else {
          const data = await activeWeatherProvider.fetchCurrentWeather(lat, lon, name);
          setLiveWeather(data);
        }
      } catch (err) {
        console.warn("Weather fetch error, using simulated fallback:", err);
        const sim = getSimulatedFallbackWeather(lat, lon, name);
        setLiveWeather(sim);
      } finally {
        setIsLoadingWeather(false);
      }
    },
    [isDemoMode]
  );

  // Initial Weather Load for Default Location
  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherForLocation(selectedLocation.lat, selectedLocation.lon, selectedLocation.name);
    }
  }, [selectedLocation, fetchWeatherForLocation]);

  // URL Sync for Shareable Views
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");
    const severityParam = params.get("severity");
    const eventTypeParam = params.get("type");

    if (stateParam || severityParam || eventTypeParam) {
      setFilters((prev) => ({
        ...prev,
        selectedState: stateParam || prev.selectedState,
        selectedSeverity: severityParam || prev.selectedSeverity,
        selectedEventType: eventTypeParam || prev.selectedEventType,
      }));
    }
  }, []);

  const updateFiltersAndUrl = (newFilters: Partial<DashboardFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      const params = new URLSearchParams();
      if (updated.selectedState) params.set("state", updated.selectedState);
      if (updated.selectedSeverity) params.set("severity", updated.selectedSeverity);
      if (updated.selectedEventType) params.set("type", updated.selectedEventType);
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedState: "",
      selectedDistrict: "",
      selectedEventType: "",
      selectedSeverity: "",
      selectedStatus: "",
      selectedSourceCategory: "",
      dateRange: "all",
    });
    window.history.replaceState({}, "", window.location.pathname);
  };

  const handleToggleLayer = (key: keyof MapLayerToggles) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Selection Handlers
  const handleSelectLocation = (loc: IndiaLocation) => {
    setSelectedLocation(loc);
    setSelectedEvent(null);
    setSelectedGauge(null);
    setIsDrawerOpen(true);
    fetchWeatherForLocation(loc.lat, loc.lon, loc.name);
  };

  const handleSelectEvent = (evt: WeatherEvent) => {
    setSelectedEvent(evt);
    setSelectedGauge(null);
    setSelectedLocation({
      id: evt.id,
      name: evt.city,
      district: evt.district,
      state: evt.state,
      lat: evt.lat,
      lon: evt.lon,
      type: "CITY",
    });
    setIsDrawerOpen(true);
    fetchWeatherForLocation(evt.lat, evt.lon, evt.city);
  };

  const handleSelectMapCoordinate = (lat: number, lon: number, name?: string) => {
    setSelectedEvent(null);
    setSelectedGauge(null);
    setSelectedLocation({
      id: `coord-${lat.toFixed(3)}-${lon.toFixed(3)}`,
      name: name || `Station [${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E]`,
      district: "Local Station",
      state: "Republic of India",
      lat,
      lon,
      type: "CITY",
    });
    setIsDrawerOpen(true);
    fetchWeatherForLocation(lat, lon, name);
  };

  const handleSelectRiverGauge = (gauge: RiverGaugeReading) => {
    setSelectedGauge(gauge);
    setSelectedEvent(null);
    setSelectedLocation({
      id: gauge.id,
      name: `${gauge.riverName} (${gauge.stationName})`,
      district: gauge.district,
      state: gauge.state,
      lat: gauge.lat,
      lon: gauge.lon,
      type: "RIVER_GAUGE",
    });
    setIsDrawerOpen(true);
    fetchWeatherForLocation(gauge.lat, gauge.lon, gauge.stationName);
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (filters.selectedState && evt.state !== filters.selectedState) return false;
      if (filters.selectedSeverity && evt.severity !== filters.selectedSeverity) return false;
      if (filters.selectedEventType && evt.eventType !== filters.selectedEventType) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          evt.title.toLowerCase().includes(q) ||
          evt.city.toLowerCase().includes(q) ||
          evt.state.toLowerCase().includes(q) ||
          evt.district.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [events, filters]);

  // Critical Alerts
  const criticalAlerts = useMemo(() => {
    return events.filter((e) => e.severity === "CRITICAL");
  }, [events]);

  // National KPIs Calculation
  const nationalKPIs: NationalKPIs = useMemo(() => {
    const total = events.length;
    const critical = events.filter((e) => e.severity === "CRITICAL").length;
    const warnings = events.filter((e) => e.severity === "WARNING").length;
    const verified = events.filter((e) => e.verificationStatus === "VERIFIED").length;
    const pending = events.filter((e) => e.verificationStatus === "PENDING").length;
    const activeRiver = riverGauges.filter((g) => g.status === "DANGER" || g.status === "WARNING").length;

    return {
      totalEvents: total,
      criticalAlertsCount: critical,
      warningsCount: warnings,
      verifiedCount: verified,
      verifiedPercentage: total > 0 ? Math.round((verified / total) * 100) : 0,
      pendingReviewCount: pending,
      activeRiverFloodCount: activeRiver,
      lastUpdatedIST: lastRefreshIST,
      sourceBreakdown: {
        official: events.filter((e) => e.sourceCategory === "OFFICIAL OBSERVATION").length,
        satellite: events.filter((e) => e.sourceCategory === "SATELLITE ESTIMATE").length,
        citizen: events.filter((e) => e.sourceCategory === "CITIZEN REPORT").length,
        simulated: events.filter((e) => e.sourceCategory === "SIMULATED DEMO DATA").length,
      },
    };
  }, [events, riverGauges, lastRefreshIST]);

  // Verification Console Handlers
  const handleUpdateEventStatus = (id: string, newStatus: VerificationStatus) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, verificationStatus: newStatus } : e))
    );
  };

  // Deterministic India Flood Demo Scenario
  const handleTriggerFloodScenario = (scenarioCity: "mumbai" | "guwahati" | "wayanad" | "chennai") => {
    const scenarioConfigs = {
      mumbai: {
        title: "CRITICAL: Extreme Cloudburst Deluge in Mumbai Central & Kurla",
        state: "Maharashtra",
        district: "Mumbai Suburban",
        city: "Mumbai (Hindmata & Gandhi Market)",
        lat: 19.0178,
        lon: 72.8478,
        rainfall: 142.0,
        temp: 26.5,
        desc: "Automated Doppler Radar tracks stationary convective mesocyclone cell. Rainfall rate: 65 mm/hour. Severe street waterlogging (3.5 ft) and railway track submergence.",
      },
      guwahati: {
        title: "CRITICAL: Severe Brahmaputra Catchment Flash Flooding",
        state: "Assam",
        district: "Kamrup Metropolitan",
        city: "Guwahati (Bharalumukh)",
        lat: 26.1735,
        lon: 91.7345,
        rainfall: 98.0,
        temp: 27.2,
        desc: "Brahmaputra gauge crossed Danger Mark by 0.65 m. Inundation of lower Assam floodplains. Evacuation underway by SDRF.",
      },
      wayanad: {
        title: "CRITICAL: Escarpment Runoff & Debris Hazard Escalation",
        state: "Kerala",
        district: "Wayanad",
        city: "Wayanad (Chooralmala & Meppadi)",
        lat: 11.5512,
        lon: 76.1284,
        rainfall: 210.0,
        temp: 21.8,
        desc: "Sustained heavy deluge exceeding 200 mm. Catchment hillslope saturation critical with flash torrents.",
      },
      chennai: {
        title: "CRITICAL: Bay of Bengal Cyclonic Cloudburst Band",
        state: "Tamil Nadu",
        district: "Chennai",
        city: "Chennai (Velachery & Tambaram)",
        lat: 12.9815,
        lon: 80.2180,
        rainfall: 115.0,
        temp: 28.0,
        desc: "High-intensity precipitation band moving onshore. Severe micro-basin waterlogging reported along Velachery lake overflow channels.",
      },
    };

    const target = scenarioConfigs[scenarioCity];
    const newEvent: WeatherEvent = {
      id: `sim-scenario-${scenarioCity}-${Date.now()}`,
      title: target.title,
      eventType: "FLOOD",
      severity: "CRITICAL",
      state: target.state,
      district: target.district,
      city: target.city,
      lat: target.lat,
      lon: target.lon,
      timestampIST: "08-Sep-2026 20:00 IST",
      source: "IMD RADAR",
      sourceCategory: "OFFICIAL OBSERVATION",
      description: target.desc,
      credibilityScore: 99,
      classificationConfidence: 98,
      verificationStatus: "VERIFIED",
      contributingReportsCount: 52,
      liveParameters: {
        temperature: target.temp,
        feelsLike: target.temp + 4,
        humidity: 98,
        rainfall: target.rainfall,
        windSpeed: 38.0,
        windDirection: 240,
        windDirectionCardinal: "WSW",
        pressure: 998,
        cloudCover: 100,
        uvIndex: 1.0,
        observationTimeIST: "08-Sep-2026 20:00 IST",
      },
      aiEvidence: {
        sourceReliabilityScore: 99,
        weatherConsistencyScore: 98,
        spatialCorroborationScore: 98,
        temporalScore: 97,
        rationale: `Extreme precipitation anomaly corroborated by Doppler Radar and ${target.state} State Disaster Management Authority emergency alert.`,
      },
    };

    setEvents((prev) => [newEvent, ...prev]);
    handleSelectEvent(newEvent);
  };

  const handleResetToDefault = () => {
    setEvents(INITIAL_WEATHER_EVENTS);
    setRiverGauges(CWC_RIVER_GAUGES);
    setDistrictRankings(DISTRICT_IMPACT_RANKINGS);
    setHeatmapPoints(INDIA_HEATMAP_POINTS);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-navy-800 font-sans">
      {/* 1. Global Top Navigation Bar */}
      <TopBar
        isDemoMode={isDemoMode}
        onToggleDemoMode={setIsDemoMode}
        lastRefreshIST={lastRefreshIST}
        onRefresh={() => {
          updateRefreshTime();
          if (selectedLocation) {
            fetchWeatherForLocation(selectedLocation.lat, selectedLocation.lon, selectedLocation.name);
          }
        }}
        onSelectLocation={handleSelectLocation}
        criticalAlertsCount={criticalAlerts.length}
        onOpenAdminConsole={() => setIsAdminOpen(true)}
      />

      {/* 2. Main Platform Shell: Left Sidebar Rail + Active Operational View */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Navigation Sidebar */}
        <SlideNavigator
          currentView={currentView}
          onSelectView={setCurrentView}
          isCollapsed={isNavRailCollapsed}
          onToggleCollapse={() => setIsNavRailCollapsed(!isNavRailCollapsed)}
        />

        {/* VIEW 1: Command Center (Interactive India Geospatial Map + Telemetry + Bottom Analytics) */}
        {currentView === "command_center" && (
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-1 flex overflow-hidden relative">
              {/* Left Map Controls & Filters */}
              <LayerControls
                layers={layers}
                onToggleLayer={handleToggleLayer}
                filters={filters}
                onChangeFilters={updateFiltersAndUrl}
                onResetFilters={handleResetFilters}
              />

              {/* Center Main Panel: India Map (Strictly Clamped to India) */}
              <IndiaMap
                events={filteredEvents}
                riverGauges={riverGauges}
                heatmapPoints={heatmapPoints}
                layers={layers}
                selectedLocation={selectedLocation}
                selectedEvent={selectedEvent}
                onSelectEvent={handleSelectEvent}
                onSelectMapCoordinate={handleSelectMapCoordinate}
                onSelectRiverGauge={handleSelectRiverGauge}
              />

              {/* Right Alerts & Telemetry Panel */}
              <RightAlertsPanel
                criticalAlerts={criticalAlerts}
                selectedLocationName={selectedLocation ? selectedLocation.name : "All-India Center"}
                selectedLocationState={selectedLocation?.state}
                liveWeather={liveWeather}
                isLoadingWeather={isLoadingWeather}
                onRefreshWeather={() => {
                  if (selectedLocation) {
                    fetchWeatherForLocation(selectedLocation.lat, selectedLocation.lon, selectedLocation.name);
                  }
                }}
                kpis={nationalKPIs}
                districtImpacts={districtRankings}
                onSelectEvent={handleSelectEvent}
              />

              {/* Slide-out Location Detail Drawer */}
              <LocationDetailDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                event={selectedEvent}
                selectedGauge={selectedGauge}
                locationName={selectedLocation ? selectedLocation.name : "Selected Indian Station"}
                liveWeather={liveWeather}
                isLoadingWeather={isLoadingWeather}
              />
            </div>

            {/* Bottom Analytics & Timeline */}
            <BottomAnalytics
              timelineData={timelineData}
              districtRankings={districtRankings}
              recentEvents={filteredEvents}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        )}

        {/* VIEW 2: Data Explorer */}
        {currentView === "data_explorer" && (
          <div className="flex-1 h-full overflow-hidden">
            <DataExplorerView />
          </div>
        )}

        {/* VIEW 3: Analytics & Predictive Insights */}
        {currentView === "analytics" && (
          <div className="flex-1 h-full overflow-hidden">
            <AnalyticsInsightsView />
          </div>
        )}

        {/* VIEW 4: Social Media Monitor */}
        {currentView === "social_media" && (
          <div className="flex-1 h-full overflow-hidden">
            <SocialMediaMonitorView />
          </div>
        )}

        {/* VIEW 5: Citizen Crowdsourced Weather Intelligence */}
        {currentView === "citizen_reports" && (
          <div className="flex-1 h-full overflow-hidden">
            <CitizenReportsView />
          </div>
        )}

        {/* VIEW 6: System Health & Ingestion Mesh */}
        {currentView === "system_status" && (
          <div className="flex-1 h-full overflow-hidden">
            <SystemStatusView />
          </div>
        )}
      </div>

      {/* 4. Admin Incident Review Console & Scenario Trigger Modal */}
      <AdminReviewModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        pendingEvents={events.filter((e) => e.verificationStatus === "PENDING")}
        onUpdateEventStatus={handleUpdateEventStatus}
        onTriggerFloodScenario={handleTriggerFloodScenario}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
};
