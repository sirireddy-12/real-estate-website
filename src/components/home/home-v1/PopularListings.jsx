import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PopularListings = ({ data = [] }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        300:  { slidesPerView: 1 },
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1200: { slidesPerView: 4 },
      }}
    >
      {data.map((listing) => {
        const categoryColor = listing.Category === "Buy" ? "#ff1f5a" : listing.Category === "Rent" ? "#4a90d9" : "#2e7d32";
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        return (
          <SwiperSlide key={listing._idx ?? listing.Address}>
            <div className="homely-feat-card" style={{ marginBottom: 8 }}>
              <Link to={`/single-v6/${listing._idx}`} className="homely-feat-img-wrap">
                {listing.MainPhotoURL ? (
                  <img
                    className="homely-feat-img"
                    src={listing.MainPhotoURL}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center w-100 h-100" style={{ background: "#f0f0f0" }}>
                    <span className="flaticon-home-1 fz40 text-muted" />
                  </div>
                )}
                {listing.Category && (
                  <span className="homely-feat-badge" style={{ background: categoryColor }}>{listing.Category}</span>
                )}
                {listing.PriceLabel && (
                  <span className="homely-feat-price">{listing.PriceLabel}</span>
                )}
              </Link>

              <div className="homely-feat-body">
                {listing.PropertyType && (
                  <span className="homely-feat-type">{listing.PropertyType}</span>
                )}
                <h6 className="homely-feat-title">
                  <Link to={`/single-v6/${listing._idx}`}>{listing.Address || "Property"}</Link>
                </h6>
                {location && (
                  <p className="homely-feat-loc"><i className="flaticon-location" /> {location}</p>
                )}
                <div className="homely-feat-meta">
                  {listing.Bedrooms ? <span className="homely-feat-meta-item"><i className="flaticon-bed" /> {listing.Bedrooms} bed</span> : null}
                  {listing.Bathrooms ? <span className="homely-feat-meta-item"><i className="flaticon-shower" /> {listing.Bathrooms} bath</span> : null}
                  {listing.Parking ? <span className="homely-feat-meta-item"><i className="flaticon-car" /> {listing.Parking} park</span> : null}
                </div>
                <div className="homely-feat-footer">
                  <span className="homely-feat-agency">
                    {listing.Agency ? listing.Agency.split(" - ")[0] : ""}
                  </span>
                  <Link to={`/single-v6/${listing._idx}`} className="homely-feat-link">
                    View <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PopularListings;
