import { Link } from "react-router-dom";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing, i) => {
        const categoryColor = listing.Category === "Buy" ? "#eb6753" : listing.Category === "Rent" ? "#1f4b7d" : "#2e7d32";
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        return (
          <div
            className={colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4 col-xl-3"}
            key={listing._idx ?? i}
          >
            <div
              style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "#fff", marginBottom: 20 }}
            >
              <div style={{ position: "relative" }}>
                {listing.MainPhotoURL ? (
                  <img
                    className="w-100"
                    src={listing.MainPhotoURL}
                    style={{ height: "180px", objectFit: "cover", display: "block" }}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: "180px", background: "#f0f0f0" }}>
                    <span className="flaticon-home-1 fz40 text-muted" />
                  </div>
                )}
                {listing.Category && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: categoryColor, color: "#fff", borderRadius: "4px", padding: "3px 9px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
                    {listing.Category}
                  </span>
                )}
                {listing.PriceLabel && (
                  <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.62)", color: "#fff", borderRadius: "4px", padding: "4px 9px", fontSize: "12px", fontWeight: 700 }}>
                    {listing.PriceLabel}
                  </span>
                )}
              </div>
              <div style={{ padding: "12px 14px" }}>
                {listing.PropertyType && (
                  <span style={{ fontSize: "10px", color: "#888", textTransform: "uppercase" }}>{listing.PropertyType}</span>
                )}
                <h6 style={{ margin: "4px 0 2px", fontSize: "13px", fontWeight: 600 }}>
                  <Link to={`/single-v6/${listing._idx ?? i}`} style={{ color: "#222" }}>
                    {listing.Address || "Property"}
                  </Link>
                </h6>
                {location && (
                  <p style={{ fontSize: "11px", color: "#666", margin: "0 0 6px" }}>{location}</p>
                )}
                <div className="d-flex gap-2 flex-wrap" style={{ fontSize: "12px", color: "#444", marginBottom: 8 }}>
                  {listing.Bedrooms ? <span><span className="flaticon-bed" style={{ marginRight: 2 }} />{listing.Bedrooms} bed</span> : null}
                  {listing.Bathrooms ? <span><span className="flaticon-shower" style={{ marginRight: 2 }} />{listing.Bathrooms} bath</span> : null}
                  {listing.Parking ? <span><span className="flaticon-car" style={{ marginRight: 2 }} />{listing.Parking} park</span> : null}
                </div>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 7, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "#999", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {listing.Agency || ""}
                  </span>
                  <Link to={`/single-v6/${listing._idx ?? i}`} style={{ color: "#eb6753", fontSize: "12px" }}>
                    View <span className="flaticon-fullscreen" />
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
