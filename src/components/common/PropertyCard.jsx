import { Link } from "react-router-dom";

/**
 * Homely-style property card used across legacy listing sections.
 * Props: listing (dataset object with _idx), colStyle (bool)
 */
const PropertyCard = ({ listing, colStyle = false }) => {
  if (!listing) return null;
  const {
    _idx,
    MainPhotoURL,
    Category,
    PriceLabel,
    Address,
    Suburb,
    State,
    Bedrooms,
    Bathrooms,
    Parking,
    PropertyType,
    Agency,
  } = listing;

  const location = [Suburb, State].filter(Boolean).join(", ");
  const agencyShort = Agency ? Agency.split(" - ")[0] : "";
  const badgeColor = Category === "Buy" ? "#ff1f5a" : Category === "Rent" ? "#1f4b7d" : "#2e7d32";

  return (
    <div className={colStyle ? "col-sm-12" : "col-sm-6 col-lg-6"}>
      <div className={`homely-feat-card mb20${colStyle ? " homely-feat-card--list" : ""}`}>
        {/* Image */}
        <Link to={`/single-v6/${_idx}`} className="homely-feat-img-wrap" style={colStyle ? { width: 220, flexShrink: 0, height: "auto" } : {}}>
          {MainPhotoURL ? (
            <img
              className="homely-feat-img"
              src={MainPhotoURL}
              alt={Address || "Property"}
              loading="lazy"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f0f0" }}>
              <span className="flaticon-home-1 fz40 text-muted" />
            </div>
          )}
          {Category && (
            <span className="homely-feat-badge" style={{ background: badgeColor }}>
              {Category}
            </span>
          )}
          {PriceLabel && (
            <span className="homely-feat-price">{PriceLabel}</span>
          )}
          <button className="homely-wishlist-btn" aria-label="Save" onClick={(e) => e.preventDefault()}>
            <i className="flaticon-like" />
          </button>
        </Link>

        {/* Content */}
        <div className="homely-feat-body">
          {PropertyType && <span className="homely-feat-type">{PropertyType}</span>}
          <h6 className="homely-feat-title">
            <Link to={`/single-v6/${_idx}`}>{Address || "Property"}</Link>
          </h6>
          {location && (
            <p className="homely-feat-loc">
              <i className="flaticon-location" /> {location}
            </p>
          )}
          <div className="homely-feat-meta">
            {Bedrooms ? <span className="homely-feat-meta-item"><i className="flaticon-bed" /> {Bedrooms} bed</span> : null}
            {Bathrooms ? <span className="homely-feat-meta-item"><i className="flaticon-shower" /> {Bathrooms} bath</span> : null}
            {Parking ? <span className="homely-feat-meta-item"><i className="flaticon-car" /> {Parking} park</span> : null}
          </div>
          <div className="homely-feat-footer">
            <span className="homely-feat-agency">
              {agencyShort ? <><i className="flaticon-building" /> {agencyShort}</> : ""}
            </span>
            <Link to={`/single-v6/${_idx}`} className="homely-feat-link">
              View <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
