import listings from "@/utilis/listingHelpers";

const CITY_NAMES = ["Melbourne", "Perth", "Hobart", "Darwin", "Brisbane", "Adelaide"];

const cities = CITY_NAMES.map((name, idx) => {
  const matched = listings.filter(
    (l) =>
      (l.Address || "").toLowerCase().includes(name.toLowerCase()) ||
      (l.Suburb || "").toLowerCase().includes(name.toLowerCase())
  );
  const image =
    (matched.find((l) => l.MainPhotoURL) || {}).MainPhotoURL ||
    listings.find((l) => l.MainPhotoURL)?.MainPhotoURL ||
    "";
  return { id: idx + 1, name, image, propertyCount: matched.length };
});

export default cities;
