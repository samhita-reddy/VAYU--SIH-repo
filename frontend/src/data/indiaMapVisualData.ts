export interface StateLabel {
  name: string;
  lat: number;
  lon: number;
  size?: "sm" | "md" | "lg";
}

export interface SeaLabel {
  name: string;
  lat: number;
  lon: number;
}

export interface CityCalloutData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  pinColor: "#DC2626" | "#EA580C" | "#0284C7" | "#D97706";
  temp: number;
  condition: "sunny" | "rainy" | "cloudy" | "thunder";
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainfall: number;
  dateStr: string;
  cardOffset: { x: number; y: number }; // Offset in pixels from projected marker or quadrant
  quadrant: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const SEA_LABELS: SeaLabel[] = [
  { name: "Arabian Sea", lat: 15.0, lon: 68.2 },
  { name: "Bay of Bengal", lat: 14.5, lon: 88.0 },
  { name: "Indian Ocean", lat: 6.2, lon: 77.5 },
];

export const STATE_LABELS: StateLabel[] = [
  { name: "JAMMU & KASHMIR", lat: 34.0, lon: 75.0 },
  { name: "HIMACHAL PRADESH", lat: 31.8, lon: 77.2, size: "sm" },
  { name: "PUNJAB", lat: 31.0, lon: 75.2, size: "sm" },
  { name: "HARYANA", lat: 29.2, lon: 76.0, size: "sm" },
  { name: "RAJASTHAN", lat: 26.5, lon: 73.5, size: "lg" },
  { name: "UTTAR PRADESH", lat: 27.2, lon: 80.8, size: "lg" },
  { name: "BIHAR", lat: 25.8, lon: 85.8, size: "md" },
  { name: "JHARKHAND", lat: 23.6, lon: 85.3, size: "sm" },
  { name: "WEST BENGAL", lat: 23.2, lon: 88.0, size: "sm" },
  { name: "ODISHA", lat: 20.5, lon: 84.4, size: "md" },
  { name: "CHHATTISGARH", lat: 21.3, lon: 81.8, size: "sm" },
  { name: "MADHYA PRADESH", lat: 23.5, lon: 78.5, size: "lg" },
  { name: "GUJARAT", lat: 22.5, lon: 71.3, size: "lg" },
  { name: "MAHARASHTRA", lat: 19.5, lon: 75.8, size: "lg" },
  { name: "TELANGANA", lat: 17.8, lon: 79.2, size: "md" },
  { name: "ANDHRA PRADESH", lat: 15.5, lon: 79.8, size: "sm" },
  { name: "KARNATAKA", lat: 14.5, lon: 75.8, size: "md" },
  { name: "KERALA", lat: 10.5, lon: 76.3, size: "sm" },
  { name: "TAMIL NADU", lat: 11.0, lon: 78.5, size: "sm" },
  { name: "ASSAM", lat: 26.2, lon: 92.8, size: "md" },
  { name: "MEGHALAYA", lat: 25.4, lon: 91.3, size: "sm" },
  { name: "TRIPURA", lat: 23.8, lon: 91.5, size: "sm" },
  { name: "MIZORAM", lat: 23.2, lon: 92.8, size: "sm" },
  { name: "MANIPUR", lat: 24.8, lon: 93.9, size: "sm" },
  { name: "NAGALAND", lat: 26.1, lon: 94.5, size: "sm" },
];

export const REFERENCE_CITY_CALLOUTS: CityCalloutData[] = [
  {
    id: "delhi-callout",
    name: "Delhi",
    lat: 28.6139,
    lon: 77.2090,
    pinColor: "#EA580C", // Amber/orange pin like image
    temp: 34,
    condition: "sunny",
    humidity: 42,
    windSpeed: 12,
    windDirection: "W",
    rainfall: 0,
    dateStr: "Mon 14 Oct, 10:30",
    cardOffset: { x: -160, y: -130 },
    quadrant: "top-left",
  },
  {
    id: "guwahati-callout",
    name: "Guwahati",
    lat: 26.1445,
    lon: 91.7362,
    pinColor: "#DC2626", // Red pin like image
    temp: 28,
    condition: "rainy",
    humidity: 88,
    windSpeed: 8,
    windDirection: "E",
    rainfall: 32,
    dateStr: "Mon 14 Oct, 10:30",
    cardOffset: { x: 140, y: -120 },
    quadrant: "top-right",
  },
  {
    id: "mumbai-callout",
    name: "Mumbai",
    lat: 19.0760,
    lon: 72.8777,
    pinColor: "#DC2626", // Red pin like image
    temp: 30,
    condition: "rainy",
    humidity: 78,
    windSpeed: 18,
    windDirection: "SW",
    rainfall: 24,
    dateStr: "Mon 14 Oct, 10:30",
    cardOffset: { x: -160, y: 70 },
    quadrant: "bottom-left",
  },
  {
    id: "hyderabad-callout",
    name: "Hyderabad",
    lat: 17.3850,
    lon: 78.4867,
    pinColor: "#EA580C", // Amber/orange pin like image
    temp: 33,
    condition: "sunny",
    humidity: 51,
    windSpeed: 14,
    windDirection: "SE",
    rainfall: 2,
    dateStr: "Mon 14 Oct, 10:30",
    cardOffset: { x: 140, y: 60 },
    quadrant: "bottom-right",
  },
];

// Stylized State Boundaries GeoJSON-like path coordinates
export const STATE_BORDER_LINES: [number, number][][] = [
  // Rajasthan border
  [[24.5, 71.5], [26.0, 70.0], [28.0, 72.0], [29.5, 74.0], [28.5, 76.0], [27.0, 77.0], [25.0, 76.5], [24.0, 74.0], [24.5, 71.5]],
  // Gujarat border
  [[24.5, 71.5], [23.5, 68.5], [22.5, 69.0], [21.0, 70.0], [20.5, 72.5], [21.5, 73.5], [22.5, 74.5], [24.0, 74.0]],
  // Maharashtra border
  [[21.5, 73.5], [20.5, 72.8], [18.5, 73.0], [16.0, 73.5], [16.0, 75.0], [18.0, 77.5], [19.5, 80.0], [21.5, 79.0], [21.5, 76.0], [21.5, 73.5]],
  // Madhya Pradesh central divider
  [[24.0, 74.0], [25.0, 76.5], [27.0, 77.0], [26.5, 79.0], [25.0, 81.5], [23.5, 82.5], [21.5, 80.5], [21.5, 76.0]],
  // Karnataka border
  [[16.0, 73.5], [14.0, 74.5], [12.0, 75.0], [12.0, 77.0], [13.5, 78.0], [15.5, 77.0], [16.5, 77.0], [16.0, 75.0]],
  // Kerala border
  [[12.0, 75.0], [10.5, 75.8], [8.5, 77.0], [8.8, 77.5], [10.0, 77.2], [11.5, 76.5], [12.0, 75.0]],
  // Tamil Nadu border
  [[8.5, 77.0], [8.8, 77.5], [10.0, 77.2], [11.5, 76.5], [12.0, 77.0], [13.0, 78.0], [13.5, 80.2], [10.5, 79.8], [9.2, 79.0]],
  // Andhra & Telangana divider
  [[18.0, 77.5], [19.0, 78.5], [19.0, 80.0], [17.5, 81.0], [16.8, 80.5], [16.5, 77.0]],
  // Odisha & Bengal
  [[19.0, 84.5], [20.5, 86.5], [21.5, 87.5], [22.5, 86.5], [22.0, 84.0], [20.0, 82.5], [19.0, 84.5]],
  // Northeast Assam & Meghalaya
  [[26.0, 90.0], [26.5, 93.0], [27.5, 95.5], [26.8, 95.0], [25.5, 93.0], [25.0, 91.0], [26.0, 90.0]],
];