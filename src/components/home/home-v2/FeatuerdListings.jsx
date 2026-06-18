import listings from "@/utilis/listingHelpers";

import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
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
            slidesPerView: 3,
          },
        }}
      >
        {listings.slice(0, 4).map((listing) => (
          <SwiperSlide key={listing.ID}>
            <div className="item">
              <div className="listing-style1 mb-0">
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
                    <Link to={`/single-v1/${listing.ID}`}>
                      {listing.Title || listing.Address}
                    </Link>
                  </h6>

                  <p className="list-text">
                    {listing.FullAddress || listing.Address}
                  </p>

                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.Bedrooms} bed
                    </a>

                    <a href="#">
                      <span className="flaticon-shower" /> {listing.Bathrooms} bath
                    </a>

                    <a href="#">
                      <span className="flaticon-garage" /> {listing.Parking || 0} park
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

      <div className="rounded-arrow arrowY-center-position">
        <button className="featured-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>

        <button className="featured-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default FeaturedListings;