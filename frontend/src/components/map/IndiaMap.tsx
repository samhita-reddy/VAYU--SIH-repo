import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { WeatherEvent, RiverGaugeReading, IndiaLocation } from "../../types/weather";
import { MapLayerToggles, HeatmapPoint } from "../../types/layers";
import { INDIA_BOUNDS, MAJOR_INDIAN_LOCATIONS, isWithinIndia } from "../../services/geoIndia";

interface IndiaMapProps {
  events: WeatherEvent[];
  riverGauges: RiverGaugeReading[];
  heatmapPoints: HeatmapPoint[];
  layers: MapLayerToggles;
  selectedLocation: IndiaLocation | null;
  selectedEvent: WeatherEvent | null;
  onSelectEvent: (event: WeatherEvent) => void;
  onSelectMapCoordinate: (lat: number, lon: number, name?: string) => void;
  onSelectRiverGauge: (gauge: RiverGaugeReading) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  events,
  riverGauges,
  heatmapPoints,
  layers,
  selectedLocation,
  selectedEvent,
  onSelectEvent,
  onSelectMapCoordinate,
  onSelectRiverGauge,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const riverGaugesGroupRef = useRef<L.LayerGroup | null>(null);
  const citiesLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map clamped strictly to India
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const southWest = L.latLng(INDIA_BOUNDS.minLat, INDIA_BOUNDS.minLon);
    const northEast = L.latLng(INDIA_BOUNDS.maxLat, INDIA_BOUNDS.maxLon);
    const indiaBounds = L.latLngBounds(southWest, northEast);

    const map = L.map(mapContainerRef.current, {
      center: INDIA_BOUNDS.center,
      zoom: INDIA_BOUNDS.defaultZoom,
      minZoom: 4,
      maxZoom: 13,
      maxBounds: indiaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    });

    // Clean OpenStreetMap tile layer (no watermark, no API key required)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Survey of India Reference Boundaries',
      subdomains: "abc",
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    markersLayerGroupRef.current = L.layerGroup().addTo(map);
    heatmapLayerGroupRef.current = L.layerGroup().addTo(map);
    riverGaugesGroupRef.current = L.layerGroup().addTo(map);
    citiesLayerGroupRef.current = L.layerGroup().addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      if (isWithinIndia(lat, lng)) {
        onSelectMapCoordinate(lat, lng, `India [${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E]`);
      }
    });

    mapInstanceRef.current = map;

    // Automatic resize observer so map never comes out of frame on tab or panel changes
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && selectedLocation) {
      mapInstanceRef.current.flyTo([selectedLocation.lat, selectedLocation.lon], 8, {
        duration: 1.2,
      });
    }
  }, [selectedLocation]);

  // Update Event Markers
  useEffect(() => {
    const lg = markersLayerGroupRef.current;
    if (!lg) return;
    lg.clearLayers();

    events.forEach((evt) => {
      if (evt.sourceCategory === "CITIZEN REPORT" && !layers.citizenReports) return;
      if (evt.verificationStatus === "VERIFIED" && !layers.verifiedReports) return;

      const isSelected = selectedEvent?.id === evt.id;

      const sevColor =
        evt.severity === "CRITICAL"
          ? "#C62828"
          : evt.severity === "WARNING"
          ? "#E65100"
          : "#0077CC";

      const iconHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 transition-transform hover:scale-110 ${
            isSelected ? "ring-4 ring-blue-400/40 scale-110 z-50" : ""
          }" style="background:${sevColor}; border-color: white; color: white;">
            <span class="text-[11px] font-bold">!</span>
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-1.5 py-0.5 rounded shadow-md text-[9px] font-bold text-gray-800 border border-gray-200 pointer-events-none">
            ${evt.city.split("(")[0].trim()}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-event-marker",
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([evt.lat, evt.lon], { icon: customIcon });

      marker.bindPopup(`
        <div class="p-2.5 min-w-[220px] text-xs">
          <div class="flex items-center justify-between mb-1.5">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold" style="background:${
              evt.severity === "CRITICAL" ? "#FFEBEE" : "#FFF3E0"
            }; color:${evt.severity === "CRITICAL" ? "#C62828" : "#E65100"}">${evt.severity}</span>
            <span class="text-[10px] text-gray-500 font-mono">${evt.timestampIST.split(" ")[1]}</span>
          </div>
          <h4 class="font-bold text-gray-900 mb-1 text-xs">${evt.title}</h4>
          <p class="text-gray-600 text-[11px] mb-2">${evt.city}, ${evt.state}</p>
          <div class="text-[10px] text-gray-500 border-t border-gray-200 pt-1.5 flex justify-between">
            <span>Source: <strong class="text-gray-900">${evt.source}</strong></span>
            <span class="font-semibold" style="color:#0077CC">Cred: ${evt.credibilityScore}%</span>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onSelectEvent(evt);
      });

      lg.addLayer(marker);
    });
  }, [events, layers, selectedEvent]);

  // Update CWC River Gauges
  useEffect(() => {
    const rGroup = riverGaugesGroupRef.current;
    if (!rGroup) return;
    rGroup.clearLayers();

    if (!layers.riverLevels) return;

    riverGauges.forEach((gauge) => {
      const isDanger = gauge.status === "DANGER";
      const isWarning = gauge.status === "WARNING";
      const markerColor = isDanger ? "#C62828" : isWarning ? "#E65100" : "#0077CC";

      const gaugeHtml = `
        <div class="flex items-center justify-center cursor-pointer group">
          <div class="w-6 h-6 rounded-md bg-white border-2 flex items-center justify-center shadow-md transition-all hover:scale-125" style="border-color: ${markerColor}">
            <div class="w-3 h-3 rounded-sm" style="background:${markerColor}; ${isDanger ? "animation: pulse 2s ease-in-out infinite" : ""}"></div>
          </div>
        </div>
      `;

      const gaugeIcon = L.divIcon({
        className: "cwc-gauge-icon",
        html: gaugeHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([gauge.lat, gauge.lon], { icon: gaugeIcon });

      marker.bindPopup(`
        <div class="p-2.5 min-w-[220px] text-xs">
          <div class="flex items-center justify-between mb-1">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold" style="background:#E3F2FD; color:#0D47A1; border:1px solid #BBDEFB">
              CWC River Gauge
            </span>
            <span class="text-[10px] font-bold" style="color:${isDanger ? "#C62828" : "#E65100"}">
              ${gauge.status}
            </span>
          </div>
          <h4 class="font-bold text-gray-900">${gauge.riverName} River — ${gauge.stationName}</h4>
          <p class="text-gray-500 text-[11px] mb-2">${gauge.basinName} (${gauge.state})</p>
          <div class="grid grid-cols-2 gap-1.5 bg-gray-50 p-2 rounded border border-gray-200 text-[11px]">
            <div>Level: <strong class="text-gray-900 font-mono">${gauge.currentLevelM} m</strong></div>
            <div>Danger: <span class="text-gray-600 font-mono">${gauge.dangerLevelM} m</span></div>
            <div>Trend: <strong style="color:${gauge.trend === "RISING" ? "#C62828" : "#2E7D32"}">${gauge.trend}</strong></div>
            <div>HFL: <span class="text-gray-600 font-mono">${gauge.hflM} m</span></div>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onSelectRiverGauge(gauge);
      });

      rGroup.addLayer(marker);
    });
  }, [riverGauges, layers.riverLevels]);

  // Major Cities Markers
  useEffect(() => {
    const cGroup = citiesLayerGroupRef.current;
    if (!cGroup) return;
    cGroup.clearLayers();

    MAJOR_INDIAN_LOCATIONS.forEach((city) => {
      const cityHtml = `
        <div class="flex items-center space-x-1 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all">
          <div class="w-2 h-2 rounded-full bg-gray-600 border border-white shadow"></div>
          <span class="text-[10px] font-semibold text-gray-700 bg-white/90 px-1 rounded shadow-sm border border-gray-200">${city.name}</span>
        </div>
      `;

      const cityIcon = L.divIcon({
        className: "major-city-icon",
        html: cityHtml,
        iconSize: [60, 20],
        iconAnchor: [5, 10],
      });

      const marker = L.marker([city.lat, city.lon], { icon: cityIcon });
      marker.on("click", () => {
        onSelectMapCoordinate(city.lat, city.lon, `${city.name}, ${city.state}`);
      });

      cGroup.addLayer(marker);
    });
  }, []);

  // Heatmap / Risk Circles Overlay
  useEffect(() => {
    const hGroup = heatmapLayerGroupRef.current;
    if (!hGroup) return;
    hGroup.clearLayers();

    heatmapPoints.forEach((pt) => {
      let isVisible = false;
      let fillColor = "#0077CC";

      if (pt.type === "rainfall" && layers.rainfallIntensity) {
        isVisible = true;
        fillColor = pt.intensity > 0.85 ? "#0D47A1" : "#1565C0";
      } else if (pt.type === "flood_risk" && layers.floodRisk) {
        isVisible = true;
        fillColor = pt.intensity > 0.85 ? "#C62828" : "#E65100";
      } else if (pt.type === "heatwave" && layers.heatwaveRisk) {
        isVisible = true;
        fillColor = "#E65100";
      }

      if (!isVisible) return;

      const circle = L.circle([pt.lat, pt.lon], {
        radius: 35000 + pt.intensity * 40000,
        fillColor: fillColor,
        fillOpacity: 0.2 * pt.intensity,
        color: fillColor,
        weight: 1.5,
        opacity: 0.5,
      });

      circle.bindTooltip(`
        <div class="text-xs">
          <strong>${pt.locationName}</strong> (${pt.state})<br/>
          <span class="text-gray-600 capitalize">${pt.type.replace("_", " ")}: ${pt.valueDescription}</span>
        </div>
      `);

      hGroup.addLayer(circle);
    });
  }, [heatmapPoints, layers]);

  return (
    <div className="relative w-full h-full flex-1 bg-navy-50 overflow-hidden isolate z-0">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Legend */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-border px-3 py-2.5 rounded-xl shadow-panel text-[11px] z-10 flex flex-col space-y-2 max-w-[200px]">
        <div className="font-bold text-navy-800 flex items-center justify-between border-b border-border pb-1.5">
          <span>Map Legend</span>
          <span className="text-[9px] text-accent-blue font-bold uppercase">GIS Live</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-navy-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-red" />
            <span>Critical Alert</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-orange" />
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-md bg-white border-2 border-accent-red" />
            <span>CWC Gauge</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-blue opacity-50 border border-accent-blue" />
            <span>Hazard Zone</span>
          </div>
        </div>
        <div className="text-[9px] text-navy-300 pt-0.5 border-t border-border">
          Click any Indian location to inspect.
        </div>
      </div>
    </div>
  );
};
