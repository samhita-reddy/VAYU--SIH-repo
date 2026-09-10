import React from "react";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass, 
  Gauge, 
  SunMedium, 
  Eye, 
  CloudRain, 
  MapPin, 
  Radio, 
  AlertCircle 
} from "lucide-react";
import { LiveWeatherParameters } from "../../types/weather";

interface LiveWeatherCardProps {
  locationName: string;
  stateName?: string;
  parameters: LiveWeatherParameters | null;
  isLoading: boolean;
  onRefreshLocationWeather: () => void;
}

export const LiveWeatherCard: React.FC<LiveWeatherCardProps> = ({
  locationName,
  stateName,
  parameters,
  isLoading,
  onRefreshLocationWeather,
}) => {
  return (
    <div className="bg-white rounded-xl border border-border p-3 shadow-card space-y-2.5">
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-1 text-xs mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-accent-blue" />
            <span className="font-semibold text-navy-800">{locationName}</span>
            {stateName && <span className="text-navy-400 text-[11px]">({stateName})</span>}
          </div>
          <h3 className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">
            Live Meteorological Parameters
          </h3>
        </div>

        {parameters && (
          <div className="text-right">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                parameters.isLive
                  ? "bg-alert-verifiedBg text-accent-green border border-accent-green/30"
                  : "bg-alert-warningBg text-accent-orange border border-accent-orange/30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1 ${
                  parameters.isLive ? "bg-accent-green animate-pulse" : "bg-accent-orange"
                }`}
              />
              {parameters.isLive ? "Live API" : "Fallback Demo"}
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="py-6 text-center text-navy-300 space-y-2">
          <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[11px]">Fetching live sensors...</p>
        </div>
      ) : parameters ? (
        <>
          {/* Main Temp & Condition */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 p-2.5 rounded-lg border border-blue-100">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-navy-900 tracking-tight">
                  {parameters.temperature}°C
                </span>
                <span className="text-[11px] text-navy-500 font-medium">
                  Feels {parameters.feelsLike}°C
                </span>
              </div>
              <div className="text-[11px] font-semibold text-accent-blue mt-0.5">
                {parameters.weatherDescription}
              </div>
            </div>

            <div className="text-right bg-white px-2 py-1.5 rounded-lg border border-blue-200 shadow-card">
              <div className="flex items-center justify-end space-x-1 text-xs font-bold text-navy-800">
                <CloudRain className="w-3.5 h-3.5 text-accent-blue" />
                <span>{parameters.rainfall} mm</span>
              </div>
              <div className="text-[10px] text-navy-400">Rainfall</div>
            </div>
          </div>

          {/* Parameter Grid */}
          <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <Droplets className="w-3.5 h-3.5 text-accent-blue mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">Humidity</div>
              <div className="font-bold text-navy-800">{parameters.humidity}%</div>
            </div>

            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <Wind className="w-3.5 h-3.5 text-accent-teal mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">Wind</div>
              <div className="font-bold text-navy-800">{parameters.windSpeed} <span className="text-[9px] font-normal text-navy-400">km/h</span></div>
            </div>

            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <Compass className="w-3.5 h-3.5 text-accent-blue mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">Direction</div>
              <div className="font-bold text-navy-800">{parameters.windDirectionCardinal} <span className="text-[9px] font-normal text-navy-300">({parameters.windDirection}°)</span></div>
            </div>

            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <Gauge className="w-3.5 h-3.5 text-accent-teal mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">Pressure</div>
              <div className="font-bold text-navy-800 font-mono text-[11px]">{parameters.pressure} <span className="text-[9px] font-normal text-navy-400">hPa</span></div>
            </div>

            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <SunMedium className="w-3.5 h-3.5 text-accent-amber mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">UV Index</div>
              <div className="font-bold text-navy-800">{parameters.uvIndex}</div>
            </div>

            <div className="p-2 bg-navy-50 rounded-lg border border-border">
              <Eye className="w-3.5 h-3.5 text-navy-400 mx-auto mb-0.5" />
              <div className="text-[10px] text-navy-400">Visibility</div>
              <div className="font-bold text-navy-800">{parameters.visibility} <span className="text-[9px] font-normal text-navy-400">km</span></div>
            </div>
          </div>

          {/* Source Attribution */}
          <div className="p-2 bg-navy-50 rounded-lg border border-border text-[10px] space-y-0.5 text-navy-500">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-400 uppercase">Provider:</span>
              <span className="font-semibold text-navy-700">{parameters.source}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-400 uppercase">Category:</span>
              <span className="text-navy-500">{parameters.sourceCategory}</span>
            </div>
            <div className="flex items-center justify-between pt-0.5 border-t border-border">
              <span className="font-bold text-navy-400 uppercase">Observation:</span>
              <span className="font-mono text-navy-700">{parameters.observationTimeIST}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 bg-navy-50 rounded-lg text-center text-navy-400 text-xs">
          Click any Indian station or city to inspect live parameters.
        </div>
      )}
    </div>
  );
};
