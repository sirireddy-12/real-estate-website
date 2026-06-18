import { Link } from "react-router-dom";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing, i) => {
        const categoryColor = listing.Category === "Buy" ? "#eb6753" : listing.Category === "Rent" ? "#1f4b7d" : "#2e7d32";
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        return (
          <div className={colstyle ? "col-sm-12" : "col-sm-6"} key={listing._idx ?? i}>
            <div
              className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}
              style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", background: "#fff", marginBottom: 20 }}
            >
              <div style={{ position: "relative" }}>
                {listing.MainPhotoURL ? (
                  <img
                    className="w-100"
                    src={listing.MainPhotoURL}
                    style={{ height: "220px", objectFit: "cover", display: "block" }}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: "220px", background: "#f0f0f0" }}>
                    <span className="flaticon-home-1 fz40 text-muted" />
                  </div>
                )}
                {listing.Category && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: categoryColor, color: "#fff", borderRadius: "4px", padding: "3px 9px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
                    {listing.Category}
                  </span>
                )}
                {listing.PriceLabel && (
                  <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.62)", color: "#fff", borderRadius: "4px", padding: "4px 9px", fontSize: "13px", fontWeight: 700 }}>
                    {listing.PriceLabel}
                  </span>
                )}
              </div>
              <div style={{ padding: "12px 14px" }}>
                {listing.PropertyType && (
                  <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase" }}>{listing.PropertyType}</span>
                )}
                <h6 style={{ margin: "4px 0 2px", fontSize: "14px", fontWeight: 600 }}>
                  <Link to={`/single-v6/${listing._idx ?? i}`} style={{ color: "#222" }}>
                    {listing.Address || "Property"}
                  </Link>
                </h6>
                {location && (
                  <p style={{ fontSize: "12px", color: "#666", margin: "0 0 8px" }}>{location}</p>
                )}
                <div className="d-flex gap-3" style={{ fontSize: "13px", color: "#444", marginBottom: 8 }}>
                  {listing.Bedrooms ? <span><span className="flaticon-bed" style={{ marginRight: 3 }} />{listing.Bedrooms} bed</span> : null}
                  {listing.Bathrooms ? <span><span className="flaticon-shower" style={{ marginRight: 3 }} />{listing.Bathrooms} bath</span> : null}
                  {listing.Parking ? <span><span className="flaticon-car" style={{ marginRight: 3 }} />{listing.Parking} park</span> : null}
                </div>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#999", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {listing.Agency || ""}
                  </span>
                  <Link to={`/single-v6/${listing._idx ?? i}`} style={{ color: "#eb6753", fontSize: "13px" }}>
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
