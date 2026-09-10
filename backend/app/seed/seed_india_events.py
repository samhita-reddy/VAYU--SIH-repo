import json
import random
import os
from datetime import datetime, timedelta

INDIAN_STATES_DATA = [
    {"state": "Maharashtra", "districts": ["Mumbai Suburban", "Pune", "Thane", "Nashik", "Nagpur", "Ratnagiri"], "lat": 19.0760, "lon": 72.8777},
    {"state": "Assam", "districts": ["Kamrup Metropolitan", "Dibrugarh", "Cachar", "Darrang", "Sonitpur"], "lat": 26.1445, "lon": 91.7362},
    {"state": "Kerala", "districts": ["Wayanad", "Ernakulam", "Idukki", "Kottayam", "Kozhikode"], "lat": 10.1076, "lon": 76.3516},
    {"state": "Delhi (NCT)", "districts": ["Central Delhi", "North Delhi", "East Delhi", "South Delhi"], "lat": 28.6139, "lon": 77.2090},
    {"state": "Tamil Nadu", "districts": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Kanchipuram"], "lat": 13.0827, "lon": 80.2707},
    {"state": "Karnataka", "districts": ["Bengaluru Urban", "Dakshina Kannada", "Udupi", "Mysuru", "Belagavi"], "lat": 12.9716, "lon": 77.5946},
    {"state": "West Bengal", "districts": ["Kolkata", "Howrah", "North 24 Parganas", "South 24 Parganas", "Darjeeling"], "lat": 22.5726, "lon": 88.3639},
    {"state": "Telangana", "districts": ["Hyderabad", "Bhadradri Kothagudem", "Warangal", "Nizamabad"], "lat": 17.3850, "lon": 78.4867},
    {"state": "Uttarakhand", "districts": ["Dehradun", "Uttarkashi", "Chamoli", "Nainital", "Rudraprayag"], "lat": 30.3165, "lon": 78.0322},
    {"state": "Bihar", "districts": ["Patna", "Muzaffarpur", "Bhagalpur", "Gaya", "Darbhanga"], "lat": 25.6127, "lon": 85.1442},
    {"state": "Odisha", "districts": ["Khurda", "Cuttack", "Puri", "Balasore", "Ganjam"], "lat": 20.2961, "lon": 85.8245},
    {"state": "Rajasthan", "districts": ["Jaipur", "Jodhpur", "Bikaner", "Udaipur", "Kota"], "lat": 26.9124, "lon": 75.7873},
    {"state": "Gujarat", "districts": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Kutch"], "lat": 23.0225, "lon": 72.5714},
    {"state": "Himachal Pradesh", "districts": ["Shimla", "Kullu", "Mandi", "Kangra"], "lat": 31.1048, "lon": 77.1734},
    {"state": "Jammu and Kashmir", "districts": ["Srinagar", "Jammu", "Anantnag", "Baramulla"], "lat": 34.0837, "lon": 74.7973},
]

EVENT_TYPES = ["FLOOD", "FLASH_FLOOD", "HEAVY_RAIN", "RIVER_ALERT", "LIGHTNING", "HEATWAVE", "THUNDERSTORM", "FOG"]
SOURCES = [
    ("IMD AWS/ARG", "OFFICIAL OBSERVATION"),
    ("IMD RADAR", "OFFICIAL OBSERVATION"),
    ("CWC River Gauge", "OFFICIAL OBSERVATION"),
    ("MOSDAC / ISRO", "SATELLITE ESTIMATE"),
    ("NASA GPM IMERG", "SATELLITE ESTIMATE"),
    ("Citizen Report", "CITIZEN REPORT"),
    ("Simulated Demo Data", "SIMULATED DEMO DATA")
]

def generate_india_synthetic_events(count: int = 2000):
    events = []
    base_time = datetime.now()
    
    for i in range(1, count + 1):
        st_data = random.choice(INDIAN_STATES_DATA)
        district = random.choice(st_data["districts"])
        ev_type = random.choice(EVENT_TYPES)
        
        # Determine severity
        sev = random.choices(["CRITICAL", "WARNING", "WATCH", "NORMAL"], weights=[15, 30, 40, 15])[0]
        src, src_cat = random.choice(SOURCES)
        
        lat_offset = (random.random() - 0.5) * 1.5
        lon_offset = (random.random() - 0.5) * 1.5
        lat = round(st_data["lat"] + lat_offset, 4)
        lon = round(st_data["lon"] + lon_offset, 4)

        hours_ago = random.randint(0, 168)
        event_time = base_time - timedelta(hours=hours_ago)
        time_str = event_time.strftime("%d-%b-%Y %H:%M IST")

        cred = round(random.uniform(70.0, 99.0), 1) if "OFFICIAL" in src_cat else round(random.uniform(50.0, 92.0), 1)
        status = "VERIFIED" if cred >= 80.0 else ("PENDING" if cred >= 60.0 else "REJECTED")

        temp = round(random.uniform(22.0, 38.0), 1)
        rain = round(random.uniform(15.0, 120.0), 1) if ev_type in ["FLOOD", "HEAVY_RAIN", "FLASH_FLOOD"] else 0.0

        ev = {
            "id": f"IND-EVT-{i:05d}",
            "source": src,
            "source_type": src_cat,
            "timestamp": time_str,
            "latitude": lat,
            "longitude": lon,
            "state": st_data["state"],
            "district": district,
            "city": f"{district} Center",
            "event_type": ev_type,
            "severity": sev,
            "description": f"{sev} {ev_type.replace('_', ' ')} incident recorded in {district}, {st_data['state']}. Automated sensors tracking regional impact.",
            "temperature": temp,
            "feels_like_temperature": round(temp + 3.0, 1),
            "humidity": round(random.uniform(60.0, 98.0), 1),
            "rainfall": rain,
            "wind_speed": round(random.uniform(10.0, 45.0), 1),
            "wind_direction": random.randint(0, 360),
            "pressure": random.randint(995, 1015),
            "cloud_cover": random.randint(40, 100),
            "visibility": 10.0 if rain < 10 else 4.0,
            "uv_index": round(random.uniform(1.0, 9.0), 1),
            "weather_code": 65 if rain > 20 else 2,
            "credibility_score": cred,
            "classification_confidence": round(random.uniform(85.0, 99.0), 1),
            "verification_status": status,
            "is_duplicate": random.random() < 0.08,
            "created_at": event_time.isoformat()
        }
        events.append(ev)

    out_dir = os.path.dirname(__file__)
    file_path = os.path.join(out_dir, "india_events_seed.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2)
    print(f"Successfully generated {len(events)} India-only synthetic weather events at {file_path}")
    return events

if __name__ == "__main__":
    generate_india_synthetic_events(2000)