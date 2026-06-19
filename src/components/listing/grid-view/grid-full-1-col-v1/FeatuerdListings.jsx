import { Link } from "react-router-dom";

const FeaturedListings = ({ data }) => {
  return (
    <>
      {data.map((listing, i) => {
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        const agencyShort = listing.Agency ? listing.Agency.split(" - ")[0] : "";
        const detailPath = `/single-v6/${listing._idx ?? i}`;
        return (
          <div className="col-md-12" key={listing._idx ?? i}>
            <div className="homely-feat-card homely-feat-card--list mb20">
              <Link to={detailPath} className="homely-feat-img-wrap">
                {listing.MainPhotoURL ? (
                  <img
                    className="homely-feat-img"
                    src={listing.MainPhotoURL}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: "#f0f0f0" }}>
                    <span className="flaticon-home-1 fz40 text-muted" />
                  </div>
                )}
                {listing.Category && (
                  <span className="homely-feat-badge">{listing.Category}</span>
                )}
              </Link>
              <div className="homely-feat-body">
                {listing.PropertyType && (
                  <span className="homely-feat-type">{listing.PropertyType}</span>
                )}
                <h6 className="homely-feat-title">
                  <Link to={detailPath}>{listing.Address || "Property"}</Link>
                </h6>
                {location && (
                  <p className="homely-feat-loc"><i className="flaticon-location" /> {location}</p>
                )}
                {listing.PriceLabel && (
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#eb6753", margin: "0 0 8px" }}>{listing.PriceLabel}</p>
                )}
                <div className="homely-feat-meta">
                  {listing.Bedrooms ? <span className="homely-feat-meta-item"><i className="flaticon-bed" /> {listing.Bedrooms} bed</span> : null}
                  {listing.Bathrooms ? <span className="homely-feat-meta-item"><i className="flaticon-shower" /> {listing.Bathrooms} bath</span> : null}
                  {listing.Parking ? <span className="homely-feat-meta-item"><i className="flaticon-car" /> {listing.Parking} park</span> : null}
                </div>
                <div className="homely-feat-footer">
                  {agencyShort ? <span className="homely-feat-agency"><i className="flaticon-building" /> {agencyShort}</span> : <span />}
                  <Link to={detailPath} className="ud-btn btn-thm" style={{ padding: "6px 16px", fontSize: 12 }}>View Details</Link>
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
