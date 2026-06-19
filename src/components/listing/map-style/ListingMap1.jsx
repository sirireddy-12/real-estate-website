import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import listings from "@/utilis/listingHelpers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

// Fix leaflet default icon paths (Vite asset issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// City coordinates for Australian capital cities derived from listing content
const CITY_COORDS = [
  { name: "Melbourne",  lat: -37.8136,  lng: 144.9631 },
  { name: "Perth",      lat: -31.9505,  lng: 115.8605 },
  { name: "Brisbane",   lat: -27.4698,  lng: 153.0251 },
  { name: "Hobart",     lat: -42.8821,  lng: 147.3272 },
  { name: "Darwin",     lat: -12.4634,  lng: 130.8456 },
  { name: "Adelaide",   lat: -34.9285,  lng: 138.6007 },
  { name: "Sydney",     lat: -33.8688,  lng: 151.2093 },
];

export default function ListingMap1() {
  // Count listings per city for popup info
  const cityStats = useMemo(() => {
    return CITY_COORDS.map((city) => {
      const cityListings = listings.filter((l) =>
        (l.Address || "").toLowerCase().includes(city.name.toLowerCase()) ||
        (l.Suburb  || "").toLowerCase().includes(city.name.toLowerCase())
      );
      const sample = cityListings[0];
      return { ...city, count: cityListings.length, sample };
    }).filter((c) => c.count > 0);
  }, []);

  return (
    <MapContainer
      center={[-27.0, 133.0]}
      zoom={4}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cityStats.map((city) => (
        <Marker key={city.name} position={[city.lat, city.lng]}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong style={{ fontSize: 14 }}>{city.name}</strong>
              <p style={{ margin: "4px 0 8px", fontSize: 12, color: "#666" }}>
                {city.count} {city.count === 1 ? "property" : "properties"} available
              </p>
              {city.sample && (
                <>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: "#222" }}>
                    {city.sample.PriceLabel || "Contact Agent"}
                  </div>
                  <Link
                    to={`/single-v6/${city.sample._idx}`}
                    style={{ color: "#ff1f5a", fontSize: 12, fontWeight: 600 }}
                  >
                    View listing →
                  </Link>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
