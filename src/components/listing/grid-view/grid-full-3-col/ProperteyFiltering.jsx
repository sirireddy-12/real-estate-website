import listings, { filterListings } from "@/utilis/listingHelpers";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import PaginationTwo from "../../PaginationTwo";

// Fix leaflet default marker icon broken in webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const activeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// City-centre coords used for approximate positioning
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
        lat: coords.lat + (index % 25) * 0.0018 - 0.022,
        lng: coords.lng + (index % 25) * 0.0022 - 0.027,
      };
    }
  }
  return {
    lat: CITY_COORDS.default.lat + (index % 25) * 0.0018,
    lng: CITY_COORDS.default.lng + (index % 25) * 0.0022,
  };
}

// Pan map to coords when activeIdx changes
function MapController({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 14, { duration: 0.8 });
    }
  }, [coords, map]);
  return null;
}

const PropertyCard = ({ listing, onClick, isActive, colStyle }) => {
  const suburb = listing.Suburb || "";
  const state  = listing.State  || "";
  const loc    = [suburb, state].filter(Boolean).join(", ");
  const agencyShort = listing.Agency ? listing.Agency.split(" - ")[0] : "";
  return (
    <div
      className={`homely-feat-card mb16${isActive ? " homely-feat-card--active" : ""}${colStyle ? " homely-feat-card--list" : ""}`}
      onClick={() => onClick(listing)}
      style={{ cursor: "pointer" }}
    >
      <Link to={`/single-v6/${listing._idx}`} className="homely-feat-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img
          src={listing.MainPhotoURL || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"}
          alt={listing.Address}
          className="homely-feat-img"
          loading="lazy"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
        />
        {listing.Category && <span className="homely-feat-badge">{listing.Category}</span>}
        {listing.PriceLabel && <span className="homely-feat-price">{listing.PriceLabel}</span>}
        <button
          className="homely-wishlist-btn"
          aria-label="Save"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <i className="flaticon-like" />
        </button>
      </Link>
      <div className="homely-feat-body">
        {listing.PropertyType && <span className="homely-feat-type">{listing.PropertyType}</span>}
        <h6 className="homely-feat-title">
          <Link to={`/single-v6/${listing._idx}`} onClick={(e) => e.stopPropagation()}>{listing.Address}</Link>
        </h6>
        {loc && <p className="homely-feat-loc"><i className="flaticon-location" /> {loc}</p>}
        <div className="homely-feat-meta">
          {listing.Bedrooms ? <span className="homely-feat-meta-item"><i className="flaticon-bed" /> {listing.Bedrooms} bed</span> : null}
          {listing.Bathrooms ? <span className="homely-feat-meta-item"><i className="flaticon-shower" /> {listing.Bathrooms} bath</span> : null}
          {listing.Parking ? <span className="homely-feat-meta-item"><i className="flaticon-car" /> {listing.Parking} car</span> : null}
        </div>
        <div className="homely-feat-footer">
          {agencyShort ? <span className="homely-feat-agency"><i className="flaticon-building" /> {agencyShort}</span> : <span />}
          <Link to={`/single-v6/${listing._idx}`} className="homely-feat-link" onClick={(e) => e.stopPropagation()}>
            View <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ProperteyFiltering() {
  const locationState = useLocation();
  const navCategory = locationState.state?.activeTab || "Buy";
  const navSearch   = locationState.state?.searchQuery || "";
  const navType     = locationState.state?.propertyType || "";

  const [listingStatus, setListingStatus] = useState(navCategory);
  const [propertyTypes, setPropertyTypes]   = useState([]);
  const [priceRange, setPriceRange]         = useState([0, 100000]);
  const [bedrooms, setBedrooms]             = useState(0);
  const [bathroms, setBathroms]             = useState(0);
  const [location, setLocation]             = useState("All Cities");
  const [squirefeet, setSquirefeet]         = useState([]);
  const [yearBuild, setyearBuild]           = useState([]);
  const [categories, setCategories]         = useState([]);
  const [searchQuery, setSearchQuery]       = useState(navSearch);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [filteredData, setFilteredData]         = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber]             = useState(1);
  const [pageItems, setPageItems]               = useState([]);
  const [pageContentTrac, setPageContentTrac]   = useState([]);
  const [colstyle, setColstyle]                 = useState(false);
  const [activeCardIdx, setActiveCardIdx]       = useState(null);
  const [mapCoords, setMapCoords]               = useState(null);

  useEffect(() => {
    setListingStatus(navCategory);
    setSearchQuery(navSearch);
    if (navType) setPropertyTypes([navType]);
  }, [navCategory, navSearch, navType]);

  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9));
    setPageContentTrac([((pageNumber - 1) * 9) + 1, pageNumber * 9, sortedFilteredData.length]);
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
    document.querySelectorAll(".filterInput").forEach((el) => { el.value = null; });
    document.querySelectorAll(".filterSelect").forEach((el) => { el.value = "All Cities"; });
  };

  const filterFunctions = {
    handlelistingStatus: (elm) => setListingStatus(elm),
    handlepropertyTypes: (elm) => {
      if (elm === "All") { setPropertyTypes([]); }
      else { setPropertyTypes((pre) => pre.includes(elm) ? pre.filter((e) => e !== elm) : [...pre, elm]); }
    },
    handlepriceRange: setPriceRange,
    handlebedrooms: setBedrooms,
    handlebathroms: setBathroms,
    handlelocation: setLocation,
    handlesquirefeet: setSquirefeet,
    handleyearBuild: setyearBuild,
    handlecategories: (elm) => {
      if (elm === "All") { setCategories([]); }
      else { setCategories((pre) => pre.includes(elm) ? pre.filter((e) => e !== elm) : [...pre, elm]); }
    },
    priceRange, listingStatus, propertyTypes, resetFilter,
    bedrooms, bathroms, location, squirefeet, yearBuild, categories,
    setPropertyTypes, setSearchQuery,
  };

  useEffect(() => {
    const result = filterListings({
      listingStatus,
      propertyTypes,
      bedrooms,
      bathroms,
      location,
      searchQuery,
    });
    setFilteredData(result);
  }, [listingStatus, propertyTypes, priceRange, bedrooms, bathroms, location, squirefeet, yearBuild, categories, searchQuery]);

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption === "Price Low") {
      setSortedFilteredData([...filteredData].sort((a, b) =>
        Number((a.PriceLabel || "").replace(/[^0-9]/g, "")) -
        Number((b.PriceLabel || "").replace(/[^0-9]/g, ""))
      ));
    } else if (currentSortingOption === "Price High") {
      setSortedFilteredData([...filteredData].sort((a, b) =>
        Number((b.PriceLabel || "").replace(/[^0-9]/g, "")) -
        Number((a.PriceLabel || "").replace(/[^0-9]/g, ""))
      ));
    } else {
      setSortedFilteredData([...filteredData]);
    }
  }, [filteredData, currentSortingOption]);

  const handleCardClick = useCallback((listing) => {
    const idx = pageItems.findIndex((p) => p._idx === listing._idx);
    setActiveCardIdx(idx);
    setMapCoords(roughCoords(listing, idx));
  }, [pageItems]);

  // True when the whole category has no data (e.g. Rent/Sold not in dataset)
  const categoryEmpty = listings.filter((l) => l.Category === listingStatus).length === 0;
  const tabHasNoData = filteredData.length === 0 && categoryEmpty;

  const defaultCenter = pageItems.length > 0
    ? roughCoords(pageItems[0], 0)
    : CITY_COORDS.melbourne;

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container-fluid px-3 px-lg-4">
        {/* Mobile sidebar */}
        <div className="offcanvas offcanvas-start p-0" tabIndex="-1" id="listingSidebarFilter">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Listing Filter</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" />
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>

        <div className="advance-feature-modal">
          <div className="modal fade" id="advanceSeachModal" tabIndex={-1} aria-hidden="true">
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>

        <div className="row">
          <TopFilterBar pageContentTrac={pageContentTrac} colstyle={colstyle} setColstyle={setColstyle} filterFunctions={filterFunctions} setCurrentSortingOption={setCurrentSortingOption} />
        </div>

        {tabHasNoData ? (
          <div className="no-properties-msg text-center py80">
            <div className="mb20">
              <span className="flaticon-home-1" style={{ fontSize: 64, color: "#ccc" }} />
            </div>
            <h4 className="mb10">No properties available</h4>
            <p className="text fz15">
              There are currently no {listingStatus.toLowerCase()} listings in the dataset. Please check back later or browse properties for sale.
            </p>
            <button className="ud-btn btn-thm mt20" onClick={() => setListingStatus("Buy")}>
              Browse Buy Listings <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        ) : (
          <div className="row" style={{ minHeight: 600 }}>
            {/* Left: property cards */}
            <div className="col-lg-5 col-xl-4 listing-scroll-col">
              {pageItems.length === 0 ? (
                <div className="no-properties-msg text-center py50">
                  <p className="fz15 text">No properties found matching your search criteria.</p>
                  <button className="ud-btn btn-thm2 mt10" onClick={resetFilter}>Clear Filters</button>
                </div>
              ) : (
                pageItems.map((listing, i) => (
                  <PropertyCard
                    key={listing._idx}
                    listing={listing}
                    isActive={activeCardIdx === i}
                    onClick={handleCardClick}
                    colStyle={colstyle}
                  />
                ))
              )}
              <div className="mt20">
                <PaginationTwo pageCapacity={9} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber} />
              </div>
            </div>

            {/* Right: Leaflet map */}
            <div
              className="col-lg-7 col-xl-8 d-none d-lg-block"
              style={{ height: "calc(100vh - 140px)", position: "sticky", top: 80 }}
            >
              <div style={{ height: "100%", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,.10)" }}>
                <MapContainer
                  center={[defaultCenter.lat, defaultCenter.lng]}
                  zoom={12}
                  style={{ width: "100%", height: "100%" }}
                  scrollWheelZoom={true}
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
                              <img src={listing.MainPhotoURL} alt={listing.Address} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 6 }} />
                            )}
                            <p style={{ fontWeight: 700, fontSize: 12, margin: "0 0 3px", color: "#181a20" }}>{listing.Address}</p>
                            {listing.PriceLabel && (
                              <p style={{ fontSize: 12, margin: "0 0 4px", color: "#ff1f5a", fontWeight: 700 }}>{listing.PriceLabel}</p>
                            )}
                            <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>
                              {listing.Bedrooms ? `${listing.Bedrooms} bed · ` : ""}
                              {listing.Bathrooms ? `${listing.Bathrooms} bath` : ""}
                            </div>
                            <Link to={`/single-v6/${listing._idx}`} style={{ fontSize: 12, color: "#ff1f5a", fontWeight: 700, textDecoration: "none" }}>
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
        )}
      </div>
    </section>
  );
}
