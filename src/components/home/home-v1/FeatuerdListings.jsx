import listings from "@/utilis/listingHelpers";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const VALID_TYPES = ["House","Apartment","Townhouse","Unit","Villa","Acreage","Flat","Studio","Duplex","Duplex/semi-detached","Residential land","Lifestyle","Block of units"];

// Pick up to 9 Buy listings — one per unique MainPhotoURL to guarantee variety
const uniqueFeatured = (() => {
  const seenPhoto = new Set();
  const result = [];
  for (const l of listings) {
    if (result.length >= 9) break;
    if (l.Category !== "Buy") continue;
    if (!l.MainPhotoURL) continue;
    if (seenPhoto.has(l.MainPhotoURL)) continue;
    seenPhoto.add(l.MainPhotoURL);
    result.push(l);
  }
  return result;
})();

const FeaturedListings = () => (
  <>
    <Swiper
      spaceBetween={24}
      modules={[Navigation, Pagination]}
      navigation={{ nextEl: ".featured-next__active", prevEl: ".featured-prev__active" }}
      pagination={{ el: ".featured-pagination__active", clickable: true }}
      breakpoints={{
        300: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
    >
      {uniqueFeatured.map((l) => {
        const suburb = l.Suburb || "";
        const state  = l.State || "";
        const loc    = [suburb, state].filter(Boolean).join(", ");
        const propType = VALID_TYPES.includes(l.PropertyType) ? l.PropertyType : "Property";
        const agencyShort = l.Agency ? l.Agency.split(" - ")[0] : "";

        return (
          <SwiperSlide key={l._idx}>
            <div className="homely-feat-card">
              {/* Image */}
              <Link to={`/single-v6/${l._idx}`} className="homely-feat-img-wrap">
                <img
                  src={l.MainPhotoURL}
                  alt={l.Address}
                  className="homely-feat-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"; }}
                />
                <span className="homely-feat-badge">For {l.Category}</span>
                {l.PriceLabel && (
                  <span className="homely-feat-price">{l.PriceLabel}</span>
                )}
              </Link>

              {/* Body */}
              <div className="homely-feat-body">
                <span className="homely-feat-type">{propType}</span>
                <h6 className="homely-feat-title">
                  <Link to={`/single-v6/${l._idx}`}>{l.Address}</Link>
                </h6>
                {loc && (
                  <p className="homely-feat-loc">
                    <i className="flaticon-location" /> {loc}
                  </p>
                )}

                <div className="homely-feat-meta">
                  {l.Bedrooms ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-bed" /> {l.Bedrooms} bed
                    </span>
                  ) : null}
                  {l.Bathrooms ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-shower" /> {l.Bathrooms} bath
                    </span>
                  ) : null}
                  {l.Parking ? (
                    <span className="homely-feat-meta-item">
                      <i className="flaticon-car" /> {l.Parking} car
                    </span>
                  ) : null}
                </div>

                <div className="homely-feat-footer">
                  {agencyShort ? (
                    <span className="homely-feat-agency">
                      <i className="flaticon-building" /> {agencyShort}
                    </span>
                  ) : <span />}
                  <Link to={`/single-v6/${l._idx}`} className="homely-feat-link">
                    View <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 24 }}>
      <button className="featured-prev__active swiper_button"><i className="far fa-arrow-left-long" /></button>
      <div className="pagination swiper--pagination featured-pagination__active" />
      <button className="featured-next__active swiper_button"><i className="far fa-arrow-right-long" /></button>
    </div>
  </>
);

export default FeaturedListings;
