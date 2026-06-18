import listings from "@/utilis/listingHelpers";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = () => {
  const featured = listings.slice(0, 8);

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
        {featured.map((listing) => {
          const categoryColor =
            listing.Category === "Buy"
              ? "#eb6753"
              : listing.Category === "Rent"
              ? "#1f4b7d"
              : "#2e7d32";
          const location = [listing.Suburb, listing.State]
            .filter(Boolean)
            .join(", ");

          return (
            <SwiperSlide key={listing._idx}>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
                  background: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {listing.MainPhotoURL ? (
                    <img
                      src={listing.MainPhotoURL}
                      alt={listing.Address || "Property"}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "220px",
                        background: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span className="flaticon-home-1 fz40 text-muted" />
                    </div>
                  )}
                  {listing.Category && (
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: categoryColor,
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {listing.Category}
                    </span>
                  )}
                  {listing.PriceLabel && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        background: "rgba(0,0,0,0.65)",
                        color: "#fff",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        fontSize: "13px",
                        fontWeight: 700,
                      }}
                    >
                      {listing.PriceLabel}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "16px 18px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {listing.PropertyType && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {listing.PropertyType}
                      </span>
                    )}
                    <h6
                      style={{
                        margin: "5px 0 4px",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      <Link
                        to={`/single-v6/${listing._idx}`}
                        style={{ color: "#222" }}
                      >
                        {listing.Address || "Property"}
                      </Link>
                    </h6>
                    {location && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          margin: "0 0 10px",
                        }}
                      >
                        <span
                          className="flaticon-location"
                          style={{ marginRight: 4, fontSize: 11 }}
                        />
                        {location}
                      </p>
                    )}

                    {/* Beds / Baths / Parking */}
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        fontSize: "13px",
                        color: "#444",
                      }}
                    >
                      {listing.Bedrooms ? (
                        <span>
                          <span
                            className="flaticon-bed"
                            style={{ marginRight: 3 }}
                          />
                          {listing.Bedrooms} bed
                        </span>
                      ) : null}
                      {listing.Bathrooms ? (
                        <span>
                          <span
                            className="flaticon-shower"
                            style={{ marginRight: 3 }}
                          />
                          {listing.Bathrooms} bath
                        </span>
                      ) : null}
                      {listing.Parking ? (
                        <span>
                          <span
                            className="flaticon-car"
                            style={{ marginRight: 3 }}
                          />
                          {listing.Parking} park
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: 10,
                      marginTop: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        maxWidth: "70%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {listing.Agency || ""}
                    </span>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Link
                        to={`/single-v6/${listing._idx}`}
                        style={{ color: "#eb6753" }}
                      >
                        <span className="flaticon-fullscreen" />
                      </Link>
                      <a href="#" style={{ color: "#aaa" }}>
                        <span className="flaticon-like" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 24,
        }}
      >
        <button className="featured-prev__active swiper_button">
          <i className="far fa-arrow-left-long" />
        </button>
        <div className="pagination swiper--pagination featured-pagination__active" />
        <button className="featured-next__active swiper_button">
          <i className="far fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default FeaturedListings;
