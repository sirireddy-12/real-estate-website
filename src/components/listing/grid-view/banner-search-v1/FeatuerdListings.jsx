import { Link } from "react-router-dom";

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing, i) => (
        <div className={`${colstyle ? "col-sm-12" : "col-sm-6"}`} key={listing._idx ?? i}>
          <div className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}>
            <div className="list-thumb">
              {listing.MainPhotoURL ? (
                <img
                  className="cover"
                  src={listing.MainPhotoURL}
                  alt={listing.Address || "Property"}
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                />
              ) : (
                <div className="w-100 h-100 bgc-f7 d-flex align-items-center justify-content-center">
                  <span className="flaticon-home-1 fz40 text-muted" />
                </div>
              )}
              <div className="sale-sticker-wrap">
                {listing.Category && (
                  <div className="list-tag fz12">{listing.Category}</div>
                )}
              </div>
              {listing.PriceLabel && (
                <div className="list-price">{listing.PriceLabel}</div>
              )}
            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link to={`/single-v6/${listing._idx ?? i}`}>
                  {listing.Address || "Property"}
                </Link>
              </h6>
              <p className="list-text mb-1">
                {[listing.Suburb, listing.State].filter(Boolean).join(", ")}
              </p>
              {listing.PropertyType && (
                <p className="fz12 text-muted mb-1">{listing.PropertyType}</p>
              )}
              <div className="list-meta d-flex align-items-center flex-wrap gap-2">
                {listing.Bedrooms && (
                  <span><span className="flaticon-bed pe-1" />{listing.Bedrooms} bed</span>
                )}
                {listing.Bathrooms && (
                  <span><span className="flaticon-shower pe-1" />{listing.Bathrooms} bath</span>
                )}
                {listing.Parking && (
                  <span><span className="flaticon-car pe-1" />{listing.Parking} park</span>
                )}
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what fz12">{listing.Agency || listing.Category || ""}</span>
                <div className="icons d-flex align-items-center gap-1">
                  <Link to={`/single-v6/${listing._idx ?? i}`}>
                    <span className="flaticon-fullscreen" />
                  </Link>
                  <a href="#"><span className="flaticon-like" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
