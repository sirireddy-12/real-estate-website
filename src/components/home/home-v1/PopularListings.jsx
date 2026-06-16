import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PopularListings = ({ data = [] }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1200: { slidesPerView: 4 },
        }}
      >
        {data.map((listing, i) => (
          <SwiperSlide key={i}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <img
                    className="w-100 h-100 cover"
                    src={listing.MainPhotoURL}
                    alt={listing.Address}
                  />
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
                    <Link to={`/single-v6/${listing._idx ?? i}`}>{listing.Address}</Link>
                  </h6>
                  <p className="list-text">{listing.Suburb} {listing.State}</p>
                  <div className="list-meta d-flex align-items-center">
                    {listing.Bedrooms && (
                      <a href="#">
                        <span className="flaticon-bed" /> {listing.Bedrooms} bed
                      </a>
                    )}
                    {listing.Bathrooms && (
                      <a href="#">
                        <span className="flaticon-shower" /> {listing.Bathrooms} bath
                      </a>
                    )}
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">{listing.Category}</span>
                    <div className="icons d-flex align-items-center">
                      <a href="#"><span className="flaticon-fullscreen" /></a>
                      <a href="#"><span className="flaticon-like" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PopularListings;
