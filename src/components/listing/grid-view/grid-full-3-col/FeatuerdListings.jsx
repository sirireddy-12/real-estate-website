import { Link } from "react-router-dom";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing, i) => {
        const suburb = listing.Suburb || "";
        const state  = listing.State  || "";
        const loc    = [suburb, state].filter(Boolean).join(", ");
        const agencyShort = listing.Agency ? listing.Agency.split(" - ")[0] : "";
        const detailPath = `/single-v6/${listing._idx ?? i}`;

        return (
          <div
            className={colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"}
            key={listing._idx ?? i}
          >
            <div className={`homely-feat-card mb20${colstyle ? " homely-feat-card--list" : ""}`}>
              {/* Image */}
              <Link to={detailPath} className="homely-feat-img-wrap" style={colstyle ? { height: 180 } : {}}>
                <img
                  src={listing.MainPhotoURL || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"}
                  alt={listing.Address}
                  className="homely-feat-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                />
                {listing.Category && (
                  <span className="homely-feat-badge">{listing.Category}</span>
                )}
                {listing.PriceLabel && (
                  <span className="homely-feat-price">{listing.PriceLabel}</span>
                )}
                <button
                  className="homely-wishlist-btn"
                  aria-label="Save"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="flaticon-like" />
                </button>
              </Link>

              {/* Body */}
              <div className="homely-feat-body">
                {listing.PropertyType && (
                  <span className="homely-feat-type">{listing.PropertyType}</span>
                )}
                <h6 className="homely-feat-title">
                  <Link to={detailPath}>{listing.Address}</Link>
                </h6>
                {loc && (
                  <p className="homely-feat-loc">
                    <i className="flaticon-location" /> {loc}
                  </p>
                )}

                <div className="homely-feat-meta">
                  {listing.Bedrooms ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-bed" /> {listing.Bedrooms} bed
                    </span>
                  ) : null}
                  {listing.Bathrooms ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-shower" /> {listing.Bathrooms} bath
                    </span>
                  ) : null}
                  {listing.Parking ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-car" /> {listing.Parking} car
                    </span>
                  ) : null}
                </div>

                <div className="homely-feat-footer">
                  {agencyShort ? (
                    <span className="homely-feat-agency">
                      <i className="flaticon-building" /> {agencyShort}
                    </span>
                  ) : <span />}
                  <Link to={detailPath} className="homely-feat-link">
                    View <i className="fal fa-arrow-right-long" />
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
