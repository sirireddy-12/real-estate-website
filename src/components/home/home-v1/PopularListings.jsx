
import listings from "@/data/listings";

import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PopularListings = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {listings.slice(0, 8).map((listing) => (
          <SwiperSlide key={listing.ID}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <img
         
                    className="w-100 h-100 cover"
                    src={listing.MainPhotoURL}
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap">
                    {listing.Category === "Rent" && (
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    )}
                  </div>

                  <div className="list-price">
                    {listing.PriceLabel}
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link to={`/single-v2/${listing.ID}`}>{listing.Title}</Link>
                  </h6>
                  {/* <p className="list-text">{listing.FullAddress}</p> */}
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.Bedrooms} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> {listing.Bathrooms} bath
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">{listing.Category}</span>
                    <div className="icons d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-fullscreen" />
                      </a>
                      <a href="#">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a href="#">
                        <span className="flaticon-like" />
                      </a>
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
