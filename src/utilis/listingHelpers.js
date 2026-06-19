import rawListings from "@/data/listings";

// Derive real state from ListingURL — dataset has "VIC" hardcoded for all records
function deriveState(listing) {
  if (!listing.ListingURL) return listing.State || "";
  const m = listing.ListingURL.match(/property-[^/]+-([a-z]{2,3})-/i);
  if (!m) return listing.State || "";
  const code = m[1].toUpperCase();
  const map = { VIC: "VIC", NSW: "NSW", QLD: "QLD", WA: "WA", SA: "SA", TAS: "TAS", NT: "NT", ACT: "ACT" };
  return map[code] || listing.State || "";
}

// City aliases for search
const CITY_ALIASES = {
  darwin: ["darwin city", "darwin", "larrakeyah", "tiwi", "nightcliff", "casuarina", "muirhead", "moulden", "gunn", "farrar", "blackmore", "durack", "rosebery", "bellamack", "lyons", "woodroffe", "noonamah", "howard springs", "stuart park", "katherine", "gillen", "wycliffe well"],
  brisbane: ["brisbane", "mcdowall", "ashgrove", "geebung", "inala", "bracken ridge", "mackenzie", "loganlea", "richlands", "reedy creek", "burpengary", "robina", "park ridge", "yarrabilba", "fig tree pocket", "blackstone", "south townsville", "idalia", "kawana island", "mooloolah valley", "sanctuary cove"],
  perth: ["perth", "subiaco", "scarborough", "wembley downs", "caversham", "nedlands", "como", "south perth", "margaret river", "baldivis", "gwelup", "clarkson", "cable beach", "broome", "rockingham", "gosnells", "barragup", "girrawheen", "willetton", "hannans", "dunsborough", "piara waters", "wellard", "high wycombe", "south bunbury"],
  adelaide: ["adelaide", "unley park", "sheidow park", "plympton", "hillbank", "port pirie", "nairne", "mount barker", "munno para", "roxby downs", "berri", "mannum", "waitpinga", "moonta", "glossop", "port lincoln"],
  hobart: ["hobart", "battery point", "mount stuart", "kettering", "devonport", "launceston", "legana", "riverside", "newstead", "northdown", "shearwater", "somerset", "swansea", "orford", "lawitta", "newnham", "whitemark", "bridgenorth", "devon hills"],
  melbourne: ["melbourne"],
  sydney: ["sydney", "parramatta", "blacktown", "marrickville", "botany", "matraville", "greystanes", "panania", "werrington", "tallawong", "kellyville ridge", "cordeaux heights", "warners bay", "girraween", "jordan springs", "east gosford", "gosford", "kootingal", "culburra beach", "bellambi", "swansea", "bathurst"],
};

// Derive suburb from Address — use second-to-last comma segment (actual suburb)
// "603/135 A'Beckett Street, Melbourne" → "Melbourne"
// "28 Bullich Place, Margaret River"   → "Margaret River"
// "16 Bivouac Street, Jordan Springs"  → "Jordan Springs"
function deriveSuburb(listing) {
  if (listing.Suburb) return listing.Suburb;
  const addr = listing.Address || "";
  const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    // Last segment is always the suburb (addresses only have street, suburb)
    const raw = parts[parts.length - 1];
    // Strip leading unit/lot numbers e.g. "4007/633 " prefix if somehow present
    return raw.replace(/^[\d/]+\s+/, "").trim();
  }
  return "";
}

// Known valid property types
const VALID_PROP_TYPES = new Set([
  "House","Apartment","Townhouse","Unit","Villa","Acreage","Flat","Studio",
  "Duplex","Duplex/semi-detached","Residential land","Lifestyle",
  "Block of units","Mixed farming","Other",
]);

// Normalise PropertyType — some entries have price text in PropertyType field
function derivePropertyType(listing) {
  const pt = (listing.PropertyType || "").trim();
  if (!pt) return "Property";
  if (VALID_PROP_TYPES.has(pt)) return pt;
  if (pt.startsWith("Indicative") || pt.startsWith("$") || /^[0-9]/.test(pt)) return "Apartment";
  return pt;
}

// Derive PriceLabel — handle entries where price is embedded in PropertyType
function derivePriceLabel(listing) {
  if (listing.PriceLabel) return listing.PriceLabel;
  const pt = listing.PropertyType || "";
  if (pt.startsWith("Indicative") || pt.startsWith("$")) return pt;
  return "";
}

// Clean the scraped Open Home Date field — removes duplicated "Inspection…Inspection…" text
// and truncates long promo/junk text that the scraper captured
function deriveOpenHome(listing) {
  const raw = listing["Open Home Date"] || listing.OpenHomeDate || "";
  if (!raw) return "";
  // Remove duplicated "InspectionXXXInspection" pattern
  let cleaned = raw.replace(/^(Inspection[^I]{0,60})(Inspection\s*)/i, "$1").trim();
  // Strip leading "Inspection " prefix
  cleaned = cleaned.replace(/^Inspection\s+/i, "").trim();
  // If still over 80 chars it's promo garbage — discard
  if (cleaned.length > 80) return "";
  return cleaned;
}

// Deduplicate by Address AND ListingURL
const seenAddr = new Set();
const seenUrl  = new Set();
const dedupedListings = rawListings.filter((l) => {
  const addrKey = (l.Address || "").toLowerCase().trim();
  const urlKey  = l.ListingURL || "";
  if (addrKey && seenAddr.has(addrKey)) return false;
  if (urlKey  && seenUrl.has(urlKey))   return false;
  if (addrKey) seenAddr.add(addrKey);
  if (urlKey)  seenUrl.add(urlKey);
  return true;
});

// All listings with corrected fields + stable index for routing
const listings = dedupedListings.map((l, i) => ({
  ...l,
  _idx: i,
  State:        deriveState(l),
  Suburb:       deriveSuburb(l),
  PropertyType: derivePropertyType(l),
  PriceLabel:   derivePriceLabel(l),
  OpenHomeCleaned: deriveOpenHome(l),
}));

export default listings;

function makeHaystack(el) {
  return [
    el.Address || "",
    el.Suburb  || "",
    el.State   || "",
    el.Postcode || "",
    el.Agency  || "",
    el.PropertyType || "",
  ].join(" ").toLowerCase();
}

export function filterListings({
  listingStatus = "All",
  propertyTypes = [],
  bedrooms  = 0,
  bathroms  = 0,
  location  = "All Cities",
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
    const aliasTokens = CITY_ALIASES[loc] || [loc];
    result = result.filter((el) => {
      const hs = makeHaystack(el);
      return aliasTokens.some((token) => hs.includes(token));
    });
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    const aliasTokens = CITY_ALIASES[q] || [q];
    result = result.filter((el) => {
      const hs = makeHaystack(el);
      return aliasTokens.some((token) => hs.includes(token));
    });
  }
  return result;
}
