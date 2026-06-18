import rawListings from "@/data/listings";

// Derive real state from ListingURL — dataset has "VIC" hardcoded for all records
function deriveState(listing) {
  if (!listing.ListingURL) return listing.State || "";
  const m = listing.ListingURL.match(/property-[^-]+-([a-z]+)-/i);
  if (!m) return listing.State || "";
  const code = m[1].toUpperCase();
  const map = { VIC: "VIC", NSW: "NSW", QLD: "QLD", WA: "WA", SA: "SA", TAS: "TAS", NT: "NT", ACT: "ACT" };
  return map[code] || listing.State || "";
}

// Derive suburb from Address when Suburb field is empty
function deriveSuburb(listing) {
  if (listing.Suburb) return listing.Suburb;
  const addr = listing.Address || "";
  const parts = addr.split(",");
  return parts.length > 1 ? parts[parts.length - 1].trim() : "";
}

// Normalise PropertyType — some entries have price text in PropertyType field
function derivePropertyType(listing) {
  const pt = listing.PropertyType || "";
  if (pt.startsWith("Indicative") || pt.startsWith("$")) return "Apartment";
  return pt;
}

// Derive PriceLabel — handle entries where price is embedded in PropertyType
function derivePriceLabel(listing) {
  if (listing.PriceLabel) return listing.PriceLabel;
  const pt = listing.PropertyType || "";
  if (pt.startsWith("Indicative") || pt.startsWith("$")) return pt;
  return "";
}

// Deduplicate by ListingURL to remove duplicate agency records
const seen = new Set();
const dedupedListings = rawListings.filter((l) => {
  const key = l.ListingURL || l.Address;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// All listings with corrected fields + stable index for routing
const listings = dedupedListings.map((l, i) => ({
  ...l,
  _idx: i,
  State: deriveState(l),
  Suburb: deriveSuburb(l),
  PropertyType: derivePropertyType(l),
  PriceLabel: derivePriceLabel(l),
}));

export default listings;

export function filterListings({
  listingStatus = "All",
  propertyTypes = [],
  bedrooms = 0,
  bathroms = 0,
  location = "All Cities",
  searchQuery = "",
} = {}) {
  let result = listings.filter((elm) =>
    listingStatus === "All" ? true : elm.Category === listingStatus
  );
  if (propertyTypes.length > 0)
    result = result.filter((elm) => propertyTypes.includes(elm.PropertyType));
  if (bedrooms > 0)
    result = result.filter((el) => Number(el.Bedrooms) >= bedrooms);
  if (bathroms > 0)
    result = result.filter((el) => Number(el.Bathrooms) >= bathroms);
  if (location !== "All Cities") {
    const loc = location.toLowerCase();
    result = result.filter(
      (el) =>
        (el.Suburb || "").toLowerCase().includes(loc) ||
        (el.Address || "").toLowerCase().includes(loc) ||
        (el.State || "").toLowerCase().includes(loc) ||
        (el.Postcode || "").includes(loc)
    );
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (el) =>
        (el.Address || "").toLowerCase().includes(q) ||
        (el.Suburb || "").toLowerCase().includes(q) ||
        (el.State || "").toLowerCase().includes(q) ||
        (el.Postcode || "").includes(q) ||
        (el.Agency || "").toLowerCase().includes(q) ||
        (el.PropertyType || "").toLowerCase().includes(q)
    );
  }
  return result;
}
