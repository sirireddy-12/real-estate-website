import listings from "@/utilis/listingHelpers";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const NearbySimilarProperty = ({ currentId, category }) => {
  const similar = listings
    .filter((l) => l._idx !== Number(currentId) && (!category || l.Category === category))
    .slice(0, 6);

  return (
    <>
      <Swiper
        spaceBetween={24}
        modules={[Navigation, Pagination]}
        navigation={{ nextEl: ".featured-next__active", prevEl: ".featured-prev__active" }}
        pagination={{ el: ".featured-pagination__active", clickable: true }}
        breakpoints={{
          300:  { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {similar.map((listing) => {
          const loc = [listing.Suburb, listing.State].filter(Boolean).join(", ");
          const agencyShort = listing.Agency ? listing.Agency.split(" - ")[0] : "";
          return (
            <SwiperSlide key={listing._idx}>
              <div className="homely-feat-card">
                <Link to={`/single-v6/${listing._idx}`} className="homely-feat-img-wrap">
                  <img
                    src={listing.MainPhotoURL || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"}
                    alt={listing.Address}
                    className="homely-feat-img"
                    loading="lazy"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                  />
                  {listing.Category && <span className="homely-feat-badge">{listing.Category}</span>}
                  {listing.PriceLabel && <span className="homely-feat-price">{listing.PriceLabel}</span>}
                </Link>
                <div className="homely-feat-body">
                  {listing.PropertyType && <span className="homely-feat-type">{listing.PropertyType}</span>}
                  <h6 className="homely-feat-title">
                    <Link to={`/single-v6/${listing._idx}`}>{listing.Address}</Link>
                  </h6>
                  {loc && <p className="homely-feat-loc"><i className="flaticon-location" /> {loc}</p>}
                  <div className="homely-feat-meta">
                    {listing.Bedrooms ? <span className="homely-feat-meta-item"><i className="flaticon-bed" /> {listing.Bedrooms} bed</span> : null}
                    {listing.Bathrooms ? <span className="homely-feat-meta-item"><i className="flaticon-shower" /> {listing.Bathrooms} bath</span> : null}
                    {listing.Parking ? <span className="homely-feat-meta-item"><i className="flaticon-car" /> {listing.Parking} car</span> : null}
                  </div>
                  <div className="homely-feat-footer">
                    {agencyShort ? <span className="homely-feat-agency"><i className="flaticon-building" /> {agencyShort}</span> : <span />}
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
    </>
  );
};

export default NearbySimilarProperty;
