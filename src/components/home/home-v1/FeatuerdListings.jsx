import listings from "@/data/listings";
const indexedListings = listings.map((l, i) => ({ ...l, _idx: i }));
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  return (
    <>
      <Swiper
        spaceBetween={24}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {indexedListings.slice(0, 8).map((listing, i) => (
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
                    <Link to={`/single-v6/${listing._idx}`}>{listing.Address}</Link>
                  </h6>
                  <p className="list-text">
                    {listing.Suburb} {listing.State}
                  </p>
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
                    {listing.Parking && (
                      <a href="#">
                        <span className="flaticon-car" /> {listing.Parking}
                      </a>
                    )}
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">{listing.Category || "Buy"}</span>
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

      <div className="row align-items-center justify-content-center mt-3">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturedListings;
