import { Link } from "react-router-dom";

const FeaturedListings = ({ data }) => {
  return (
    <>
      {data.map((listing, i) => {
        const categoryColor = listing.Category === "Buy" ? "#eb6753" : listing.Category === "Rent" ? "#1f4b7d" : "#2e7d32";
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        return (
          <div className="col-md-12" key={listing._idx ?? i}>
            <div
              style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "#fff", marginBottom: 20, display: "flex", flexDirection: "row" }}
            >
              {/* Image */}
              <div style={{ position: "relative", flexShrink: 0, width: "280px" }}>
                {listing.MainPhotoURL ? (
                  <img
                    src={listing.MainPhotoURL}
                    style={{ width: "280px", height: "200px", objectFit: "cover", display: "block" }}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ width: "280px", height: "200px", background: "#f0f0f0" }}>
                    <span className="flaticon-home-1 fz40 text-muted" />
                  </div>
                )}
                {listing.Category && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: categoryColor, color: "#fff", borderRadius: "4px", padding: "3px 9px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
                    {listing.Category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  {listing.PropertyType && (
                    <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase" }}>{listing.PropertyType}</span>
                  )}
                  <h6 style={{ margin: "4px 0 4px", fontSize: "15px", fontWeight: 600 }}>
                    <Link to={`/single-v6/${listing._idx ?? i}`} style={{ color: "#222" }}>
                      {listing.Address || "Property"}
                    </Link>
                  </h6>
                  {location && (
                    <p style={{ fontSize: "13px", color: "#666", margin: "0 0 8px" }}>
                      <span className="flaticon-location" style={{ marginRight: 4 }} />{location}
                    </p>
                  )}
                  {listing.PriceLabel && (
                    <p style={{ fontSize: "16px", fontWeight: 700, color: "#eb6753", margin: "0 0 8px" }}>
                      {listing.PriceLabel}
                    </p>
                  )}
                  <div className="d-flex gap-3" style={{ fontSize: "13px", color: "#444" }}>
                    {listing.Bedrooms ? <span><span className="flaticon-bed" style={{ marginRight: 3 }} />{listing.Bedrooms} bed</span> : null}
                    {listing.Bathrooms ? <span><span className="flaticon-shower" style={{ marginRight: 3 }} />{listing.Bathrooms} bath</span> : null}
                    {listing.Parking ? <span><span className="flaticon-car" style={{ marginRight: 3 }} />{listing.Parking} park</span> : null}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10, marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>{listing.Agency || ""}</span>
                  <Link to={`/single-v6/${listing._idx ?? i}`} className="ud-btn btn-thm" style={{ padding: "6px 16px", fontSize: "12px" }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeaturedListings;
