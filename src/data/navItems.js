export const homeItems = [
  { href: "/", label: "Home" },
];

export const listingItems = [
  {
    title: "Browse",
    submenu: [
      { label: "All Properties", href: "/grid-full-4-col" },
      { label: "Properties for Sale", href: "/grid-full-3-col" },
      { label: "Properties for Rent", href: "/grid-full-2-col" },
      { label: "List View", href: "/grid-full-1-col-v1" },
      { label: "With Sidebar", href: "/grid-default" },
    ],
  },
  {
    title: "Map Search",
    submenu: [
      { label: "Map + List", href: "/map-v1" },
      { label: "Full Map", href: "/map-v2" },
      { label: "Map Sidebar", href: "/map-v3" },
    ],
  },
];

export const propertyItems = [
  {
    label: "Agents",
    subMenuItems: [
      { label: "Agents", href: "/agents" },
      { label: "Agent Profile", href: "/agent-single/1" },
      { label: "Agencies", href: "/agency" },
      { label: "Agency Profile", href: "/agency-single/1" },
    ],
  },
  {
    label: "Property Detail",
    subMenuItems: [
      { label: "Detail View", href: "/single-v6/1" },
    ],
  },
  {
    label: "Dashboard",
    subMenuItems: [
      { label: "Dashboard Home", href: "/dashboard-home" },
      { label: "Messages", href: "/dashboard-message" },
      { label: "Add Property", href: "/dashboard-add-property" },
      { label: "My Properties", href: "/dashboard-my-properties" },
      { label: "My Favourites", href: "/dashboard-my-favourites" },
      { label: "My Profile", href: "/dashboard-my-profile" },
    ],
  },
];

export const blogItems = [
  { href: "/blog-list-v1", label: "Property News" },
  { href: "/blog-list-v2", label: "Suburb Guides" },
  { href: "/blog-list-v3", label: "Buying Tips" },
];

export const pageItems = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];
