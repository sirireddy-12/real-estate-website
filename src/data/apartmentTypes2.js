import listings from "./listings";

const typeMeta = [
  { key: "House", imageSrc: "/images/listings/as-1.jpg" },
  { key: "Apartment", imageSrc: "/images/listings/as-2.jpg" },
  { key: "Townhouse", imageSrc: "/images/listings/as-3.jpg" },
  { key: "Villa", imageSrc: "/images/listings/as-4.jpg" },
  { key: "Unit", imageSrc: "/images/listings/as-5.jpg" },
  { key: "Acreage", imageSrc: "/images/listings/as-2.jpg" },
  { key: "Residential land", imageSrc: "/images/listings/as-3.jpg" },
  { key: "Townhouse", imageSrc: "/images/listings/as-4.jpg" },
  { key: "Duplex/semi-detached", imageSrc: "/images/listings/as-5.jpg" },
  { key: "Lifestyle", imageSrc: "/images/listings/as-5.jpg" },
];

const appertments = typeMeta.map((t) => ({
  title: t.key,
  imageSrc: t.imageSrc,
  properties: listings.filter((l) => l.PropertyType === t.key).length,
}));

export default appertments;
