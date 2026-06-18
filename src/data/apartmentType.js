import listings from "@/utilis/listingHelpers";

const typeMeta = [
  { key: "House", icon: "flaticon-home", title: "Houses" },
  { key: "Apartment", icon: "flaticon-corporation", title: "Apartments" },
  { key: "Townhouse", icon: "flaticon-chat", title: "Townhouses" },
  { key: "Unit", icon: "flaticon-network", title: "Units" },
  { key: "Villa", icon: "flaticon-garden", title: "Villas" },
  { key: "Acreage", icon: "flaticon-window", title: "Acreage" },
  { key: "Residential land", icon: "flaticon-bird-house", title: "Land" },
];

const appertmentsTypes = typeMeta.map((t, i) => ({
  id: i + 1,
  icon: t.icon,
  title: t.title,
  count: listings.filter((l) => l.PropertyType === t.key).length,
}));

export default appertmentsTypes;