import { Link } from "react-router-dom";

/**
 * Homely-style property card used across all sections.
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
  const categoryColor = Category === "Buy" ? "#eb6753" : Category === "Rent" ? "#1f4b7d" : "#2e7d32";

  return (
    <div className={colStyle ? "col-sm-12" : "col-sm-6 col-lg-6"}>
      <div
        className={
          colStyle
            ? "listing-style1 listCustom listing-type"
            : "listing-style1"
        }
        style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", background: "#fff" }}
      >
        {/* Image */}
        <div className="list-thumb" style={{ position: "relative" }}>
          {MainPhotoURL ? (
            <img
              className="w-100"
              style={{ height: "220px", objectFit: "cover", display: "block" }}
              src={MainPhotoURL}
              alt={Address || "Property"}
              loading="lazy"
            />
          ) : (
            <div
              className="w-100 bgc-f7 d-flex align-items-center justify-content-center"
              style={{ height: "220px", background: "#f0f0f0" }}
            >
              <span className="flaticon-home-1 fz40 text-muted" />
            </div>
          )}
          {Category && (
            <span
              style={{
                position: "absolute", top: 12, left: 12,
                background: categoryColor, color: "#fff",
                borderRadius: "4px", padding: "3px 10px",
                fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {Category}
            </span>
          )}
          {PriceLabel && (
            <span
              style={{
                position: "absolute", bottom: 12, left: 12,
                background: "rgba(0,0,0,0.65)", color: "#fff",
                borderRadius: "4px", padding: "4px 10px",
                fontSize: "13px", fontWeight: 700,
              }}
            >
              {PriceLabel}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="list-content" style={{ padding: "14px 16px" }}>
          {PropertyType && (
            <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {PropertyType}
            </span>
          )}
          <h6 className="list-title" style={{ margin: "4px 0 2px", fontSize: "14px", fontWeight: 600, lineHeight: 1.3 }}>
            <Link to={`/single-v6/${_idx}`} style={{ color: "#222" }}>
              {Address || "Property"}
            </Link>
          </h6>
          {location && (
            <p style={{ fontSize: "12px", color: "#666", margin: "0 0 8px" }}>
              <span className="flaticon-location" style={{ marginRight: 4 }} />
              {location}
            </p>
          )}

          {/* Beds / Baths / Parking */}
          <div className="d-flex align-items-center gap-3" style={{ fontSize: "13px", color: "#444", marginBottom: 10 }}>
            {Bedrooms ? (
              <span><span className="flaticon-bed" style={{ marginRight: 3 }} />{Bedrooms} bed</span>
            ) : null}
            {Bathrooms ? (
              <span><span className="flaticon-shower" style={{ marginRight: 3 }} />{Bathrooms} bath</span>
            ) : null}
            {Parking ? (
              <span><span className="flaticon-car" style={{ marginRight: 3 }} />{Parking} park</span>
            ) : null}
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "#999", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {Agency || ""}
            </span>
            <div className="d-flex align-items-center gap-2">
              <Link to={`/single-v6/${_idx}`} style={{ color: "#eb6753" }}>
                <span className="flaticon-fullscreen" />
              </Link>
              <a href="#" style={{ color: "#aaa" }}>
                <span className="flaticon-like" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
