import { IndiaLocation } from "../types/weather";
export type { IndiaLocation };

export const INDIA_BOUNDS: {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
  center: [number, number];
  defaultZoom: number;
} = {
  minLat: 6.5,
  maxLat: 37.5,
  minLon: 68.0,
  maxLon: 97.5,
  center: [22.9734, 78.6569], // India geographic center (near Jabalpur)
  defaultZoom: 5,
};

export function isWithinIndia(lat: number, lon: number): boolean {
  return (
    lat >= INDIA_BOUNDS.minLat &&
    lat <= INDIA_BOUNDS.maxLat &&
    lon >= INDIA_BOUNDS.minLon &&
    lon <= INDIA_BOUNDS.maxLon
  );
}

export const INDIAN_STATES_AND_UTS: string[] = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const MAJOR_INDIAN_LOCATIONS: IndiaLocation[] = [
  { id: "delhi", name: "New Delhi", district: "Central Delhi", state: "Delhi (NCT)", lat: 28.6139, lon: 77.2090, type: "METRO" },
  { id: "mumbai", name: "Mumbai", district: "Mumbai City", state: "Maharashtra", lat: 19.0760, lon: 72.8777, type: "METRO" },
  { id: "chennai", name: "Chennai", district: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, type: "METRO" },
  { id: "bengaluru", name: "Bengaluru", district: "Bengaluru Urban", state: "Karnataka", lat: 12.9716, lon: 77.5946, type: "METRO" },
  { id: "hyderabad", name: "Hyderabad", district: "Hyderabad", state: "Telangana", lat: 17.3850, lon: 78.4867, type: "METRO" },
  { id: "kolkata", name: "Kolkata", district: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, type: "METRO" },
  { id: "guwahati", name: "Guwahati", district: "Kamrup Metropolitan", state: "Assam", lat: 26.1445, lon: 91.7362, type: "CITY" },
  { id: "jaipur", name: "Jaipur", district: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, type: "CITY" },
  { id: "kochi", name: "Kochi", district: "Ernakulam", state: "Kerala", lat: 9.9312, lon: 76.2673, type: "CITY" },
  { id: "srinagar", name: "Srinagar", district: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lon: 74.7973, type: "CITY" },
  { id: "ahmedabad", name: "Ahmedabad", district: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714, type: "CITY" },
  { id: "pune", name: "Pune", district: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567, type: "CITY" },
  { id: "lucknow", name: "Lucknow", district: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462, type: "CITY" },
  { id: "patna", name: "Patna", district: "Patna", state: "Bihar", lat: 25.6127, lon: 85.1442, type: "CITY" },
  { id: "bhopal", name: "Bhopal", district: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lon: 77.4126, type: "CITY" },
  { id: "bhubaneswar", name: "Bhubaneswar", district: "Khurda", state: "Odisha", lat: 20.2961, lon: 85.8245, type: "CITY" },
  { id: "wayanad", name: "Wayanad (Kalpetta)", district: "Wayanad", state: "Kerala", lat: 11.6050, lon: 76.0827, type: "DISTRICT_HQ" },
  { id: "dehradun", name: "Dehradun", district: "Dehradun", state: "Uttarakhand", lat: 30.3165, lon: 78.0322, type: "CITY" },
  { id: "shimla", name: "Shimla", district: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lon: 77.1734, type: "CITY" },
  { id: "visakhapatnam", name: "Visakhapatnam", district: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lon: 83.2185, type: "CITY" },
  { id: "shillong", name: "Shillong", district: "East Khasi Hills", state: "Meghalaya", lat: 25.5788, lon: 91.8933, type: "CITY" },
  { id: "leh", name: "Leh", district: "Leh", state: "Ladakh", lat: 34.1526, lon: 77.5771, type: "CITY" },
];

export function searchIndiaLocations(query: string): IndiaLocation[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  return MAJOR_INDIAN_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.district.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q)
  );
}