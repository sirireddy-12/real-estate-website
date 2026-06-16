import listings from "@/data/listings";

/**
 * Central filter function — works with the new 390-property dataset.
 * All field names match the real dataset: Category, Address, Suburb, State,
 * Bedrooms, Bathrooms, PropertyType, PriceLabel, Agency, MainPhotoURL.
 */
export function filterListings({
  listingStatus = "All",
  propertyTypes = [],
  bedrooms = 0,
  bathroms = 0,
  location = "All Cities",
  categories = [],
  searchQuery = "",
}) {
  let result = listings.filter((elm) => {
    if (listingStatus === "All") return true;
    return elm.Category === listingStatus;
  });

  if (propertyTypes.length > 0) {
    result = result.filter((elm) => propertyTypes.includes(elm.PropertyType));
  }

  if (bedrooms > 0) {
    result = result.filter((el) => Number(el.Bedrooms) >= bedrooms);
  }

  if (bathroms > 0) {
    result = result.filter((el) => Number(el.Bathrooms) >= bathroms);
  }

  if (location !== "All Cities") {
    result = result.filter(
      (el) =>
        (el.Suburb || "").toLowerCase().includes(location.toLowerCase()) ||
        (el.Address || "").toLowerCase().includes(location.toLowerCase())
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (el) =>
        (el.Address || "").toLowerCase().includes(q) ||
        (el.Suburb || "").toLowerCase().includes(q) ||
        (el.State || "").toLowerCase().includes(q) ||
        (el.Agency || "").toLowerCase().includes(q) ||
        (el.PropertyType || "").toLowerCase().includes(q)
    );
  }

  return result;
}

export default listings;
