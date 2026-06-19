import listings, { filterListings } from "@/utilis/listingHelpers";
import React, { useState, useEffect } from "react";
import TopFilterBar from "./TopFilterBar";
import TopFilterBar2 from "./TopFilterBar2";
import FeaturedListings from "./FeatuerdListings";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import PaginationTwo from "../../PaginationTwo";
import { useLocation, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const CITY_COORDS = {
  melbourne: { lat: -37.8136, lng: 144.9631 },
  perth:     { lat: -31.9505, lng: 115.8605 },
  hobart:    { lat: -42.8821, lng: 147.3272 },
  darwin:    { lat: -12.4634, lng: 130.8456 },
  brisbane:  { lat: -27.4698, lng: 153.0251 },
  adelaide:  { lat: -34.9285, lng: 138.6007 },
  sydney:    { lat: -33.8688, lng: 151.2093 },
  default:   { lat: -33.8688, lng: 151.2093 },
};

function roughCoords(listing, index) {
  const combined = ((listing.Address || "") + " " + (listing.Suburb || "")).toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (city === "default") continue;
    if (combined.includes(city)) {
      return {
        lat: coords.lat + (index % 20) * 0.003 - 0.028,
        lng: coords.lng + (index % 20) * 0.003 - 0.028,
      };
    }
  }
  return {
    lat: CITY_COORDS.default.lat + (index % 20) * 0.003,
    lng: CITY_COORDS.default.lng + (index % 20) * 0.003,
  };
}

function MapController({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo([coords.lat, coords.lng], 13, { duration: 0.8 });
  }, [coords, map]);
  return null;
}

const VALID_TABS = ["Buy", "Rent", "Sold", "All"];
const PAGE_SIZE  = 6;

export default function PropertyFilteringTwo() {
  const locationState = useLocation();

  // Resolve tab from router state — normalise capitalisation
  const rawTab = locationState.state?.activeTab || "All";
  const resolvedTab = VALID_TABS.includes(rawTab)
    ? rawTab
    : VALID_TABS.find(
        (t) => t.toLowerCase() === rawTab.toLowerCase()
      ) || "All";

  const [listingStatus,       setListingStatus]       = useState(resolvedTab);
  const [propertyTypes,       setPropertyTypes]       = useState([]);
  const [priceRange,          setPriceRange]          = useState([0, 100000]);
  const [bedrooms,            setBedrooms]            = useState(0);
  const [bathroms,            setBathroms]            = useState(0);
  const [location,            setLocation]            = useState("All Cities");
  const [squirefeet,          setSquirefeet]          = useState([]);
  const [yearBuild,           setyearBuild]           = useState([]);
  const [categories,          setCategories]          = useState([]);
  const [searchQuery,         setSearchQuery]         = useState(locationState.state?.searchQuery || "");
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [colstyle,            setColstyle]            = useState(false);
  const [filteredData,        setFilteredData]        = useState([]);
  const [sortedFilteredData,  setSortedFilteredData]  = useState([]);
  const [pageNumber,          setPageNumber]          = useState(1);
  const [pageItems,           setPageItems]           = useState([]);
  const [pageContentTrac,     setPageContentTrac]     = useState([]);
  const [activeCardIdx,       setActiveCardIdx]       = useState(null);
  const [mapCoords,           setMapCoords]           = useState(null);

  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE));
    setPageContentTrac([
      (pageNumber - 1) * PAGE_SIZE + 1,
      pageNumber * PAGE_SIZE,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    setSearchQuery("");
    document.querySelectorAll(".filterInput").forEach((el) => { el.value = null; });
    document.querySelectorAll(".filterSelect").forEach((el) => { el.value = "All Cities"; });
  };

  const filterFunctions = {
    handlelistingStatus: setListingStatus,
    handlepropertyTypes: (elm) => {
      if (elm === "All") setPropertyTypes([]);
      else setPropertyTypes((p) => p.includes(elm) ? p.filter((e) => e !== elm) : [...p, elm]);
    },
    handlepriceRange:  setPriceRange,
    handlebedrooms:    setBedrooms,
    handlebathroms:    setBathroms,
    handlelocation:    setLocation,
    handlesquirefeet:  setSquirefeet,
    handleyearBuild:   setyearBuild,
    handlecategories:  (elm) => {
      if (elm === "All") setCategories([]);
      else setCategories((p) => p.includes(elm) ? p.filter((e) => e !== elm) : [...p, elm]);
    },
    priceRange, listingStatus, propertyTypes, resetFilter,
    bedrooms, bathroms, location, squirefeet, yearBuild, categories,
    setPropertyTypes, setSearchQuery,
  };

  useEffect(() => {
    const result = filterListings({ listingStatus, propertyTypes, bedrooms, bathroms, location, searchQuery });
    setFilteredData(result);
  }, [listingStatus, propertyTypes, priceRange, bedrooms, bathroms, location, squirefeet, yearBuild, categories, searchQuery]);

  useEffect(() => {
    setPageNumber(1);
    setSortedFilteredData([...filteredData]);
  }, [filteredData, currentSortingOption]);

  // Determine whether this is a category with no data at all
  const categoryHasNoData =
    filteredData.length === 0 &&
    (listingStatus === "Rent" || listingStatus === "Sold");

  // Map center — based on first page item or default Sydney
  const mapCenter =
    pageItems.length > 0
      ? [roughCoords(pageItems[0], 0).lat, roughCoords(pageItems[0], 0).lng]
      : [-33.8688, 151.2093];

  return (
    <>
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal filterFunctions={filterFunctions} />
        </div>
      </div>

      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">
            {/* ── Left: listings panel ── */}
            <div className="col-lg-5">
              <div className="half_map_area_content mt30" style={{ paddingBottom: 40 }}>
                {/* Filter bar */}
                <div className="col-lg-12">
                  <div className="advance-search-list d-flex justify-content-between">
                    <div className="dropdown-lists">
                      <ul className="p-0 mb-0">
                        <TopFilterBar2 filterFunctions={filterFunctions} />
                      </ul>
                    </div>
                  </div>
                </div>

                <h4 className="mb-1 mt20">
                  {listingStatus !== "All" ? `${listingStatus} Properties` : "All Properties"}
                  <small className="text-muted fz14 ms-2">({sortedFilteredData.length} listings)</small>
                </h4>

                <div className="row align-items-center mb10">
                  <TopFilterBar
                    pageContentTrac={pageContentTrac}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    setCurrentSortingOption={setCurrentSortingOption}
                  />
                </div>

                {/* No-data state for Rent / Sold */}
                {categoryHasNoData ? (
                  <div className="no-properties-msg" style={{ padding: "60px 20px", textAlign: "center" }}>
                    <i className="flaticon-home-1" style={{ fontSize: 48, color: "#ddd", display: "block", marginBottom: 16 }} />
                    <p style={{ fontSize: 17, fontWeight: 600, color: "#444", marginBottom: 8 }}>
                      No {listingStatus.toLowerCase()} properties available
                    </p>
                    <p style={{ fontSize: 14, color: "#999", marginBottom: 20 }}>
                      This portal currently lists properties for sale. Check back soon for {listingStatus.toLowerCase()} listings.
                    </p>
                    <button
                      className="ud-btn btn-thm"
                      onClick={() => { setListingStatus("All"); }}
                    >
                      Browse All Listings <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    <FeaturedListings colstyle={colstyle} data={pageItems} />
                  </div>
                )}

                {!categoryHasNoData && (
                  <div className="row text-center">
                    <PaginationTwo
                      pageCapacity={PAGE_SIZE}
                      data={sortedFilteredData}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: map ── */}
            <div
              className="col-lg-7 d-none d-lg-block"
              style={{ height: "calc(100vh - 80px)", position: "sticky", top: 80 }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,.10)",
                }}
              >
                <MapContainer
                  center={mapCenter}
                  zoom={12}
                  style={{ width: "100%", height: "100%" }}
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  {mapCoords && <MapController coords={mapCoords} />}
                  {pageItems.map((listing, i) => {
                    const pos = roughCoords(listing, i);
                    return (
                      <Marker
                        key={listing._idx}
                        position={[pos.lat, pos.lng]}
                        icon={activeCardIdx === i ? activeIcon : new L.Icon.Default()}
                        eventHandlers={{
                          click: () => {
                            setActiveCardIdx(i);
                            setMapCoords(pos);
                          },
                        }}
                      >
                        <Popup>
                          <div style={{ maxWidth: 200 }}>
                            {listing.MainPhotoURL && (
                              <img
                                src={listing.MainPhotoURL}
                                alt={listing.Address}
                                style={{
                                  width: "100%", height: 90,
                                  objectFit: "cover", borderRadius: 6, marginBottom: 8,
                                }}
                              />
                            )}
                            <p style={{ fontWeight: 700, fontSize: 12, margin: "0 0 4px", color: "#181a20", lineHeight: 1.4 }}>
                              {listing.Address}
                            </p>
                            {listing.PriceLabel && (
                              <p style={{ fontSize: 13, margin: "0 0 4px", color: "#ff1f5a", fontWeight: 700 }}>
                                {listing.PriceLabel}
                              </p>
                            )}
                            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                              {listing.Bedrooms ? `${listing.Bedrooms} bed` : ""}
                              {listing.Bedrooms && listing.Bathrooms ? " · " : ""}
                              {listing.Bathrooms ? `${listing.Bathrooms} bath` : ""}
                            </div>
                            <Link
                              to={`/single-v6/${listing._idx}`}
                              style={{ fontSize: 12, color: "#ff1f5a", fontWeight: 700, textDecoration: "none" }}
                            >
                              View Property →
                            </Link>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
