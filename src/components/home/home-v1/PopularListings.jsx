import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PopularListings = ({ data = [] }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        300: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2 },
        1200: { slidesPerView: 4 },
      }}
    >
      {data.map((listing) => {
        const categoryColor = listing.Category === "Buy" ? "#eb6753" : listing.Category === "Rent" ? "#4a90d9" : "#2e7d32";
        const location = [listing.Suburb, listing.State].filter(Boolean).join(", ");
        return (
          <SwiperSlide key={listing._idx ?? listing.Address}>
            <div
              style={{ borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.1)", marginBottom: 8 }}
            >
              <div style={{ position: "relative" }}>
                {listing.MainPhotoURL ? (
                  <img
                    className="w-100"
                    style={{ height: "200px", objectFit: "cover", display: "block" }}
                    src={listing.MainPhotoURL}
                    alt={listing.Address || "Property"}
                    loading="lazy"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ height: "200px", background: "#2a3446" }}>
                    <span className="flaticon-home-1 fz40" style={{ color: "#555" }} />
                  </div>
                )}
                {listing.Category && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: categoryColor, color: "#fff", borderRadius: "4px", padding: "3px 9px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>
                    {listing.Category}
                  </span>
                )}
                {listing.PriceLabel && (
                  <span style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.65)", color: "#fff", borderRadius: "4px", padding: "4px 9px", fontSize: "12px", fontWeight: 700 }}>
                    {listing.PriceLabel}
                  </span>
                )}
              </div>
              <div style={{ padding: "12px 14px" }}>
                {listing.PropertyType && (
                  <span style={{ fontSize: "10px", color: "#aaa", textTransform: "uppercase" }}>{listing.PropertyType}</span>
                )}
                <h6 style={{ margin: "4px 0 3px", fontSize: "13px", fontWeight: 600 }}>
                  <Link to={`/single-v6/${listing._idx}`} style={{ color: "#fff" }}>
                    {listing.Address || "Property"}
                  </Link>
                </h6>
                {location && (
                  <p style={{ fontSize: "12px", color: "#bbb", margin: "0 0 8px" }}>{location}</p>
                )}
                <div className="d-flex gap-3" style={{ fontSize: "12px", color: "#ccc", marginBottom: 8 }}>
                  {listing.Bedrooms ? <span><span className="flaticon-bed" style={{ marginRight: 3 }} />{listing.Bedrooms} bed</span> : null}
                  {listing.Bathrooms ? <span><span className="flaticon-shower" style={{ marginRight: 3 }} />{listing.Bathrooms} bath</span> : null}
                  {listing.Parking ? <span><span className="flaticon-car" style={{ marginRight: 3 }} />{listing.Parking} park</span> : null}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#999", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {listing.Agency || ""}
                  </span>
                  <Link to={`/single-v6/${listing._idx}`} style={{ color: "#eb6753", fontSize: "12px" }}>
                    View <span className="flaticon-fullscreen" />
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
