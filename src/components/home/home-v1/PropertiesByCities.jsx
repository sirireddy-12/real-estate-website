import cities from "@/data/propertyByCities";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const PropertiesByCities = () => {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        navigation={{
          nextEl: ".property-by-city-next__active",
          prevEl: ".property-by-city-prev__active",
        }}
        breakpoints={{
          300:  { slidesPerView: 2, spaceBetween: 15 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {cities.map((city) => (
          <SwiperSlide key={city.id}>
            <div
              className="item"
              onClick={() => navigate("/grid-full-3-col", { state: { searchQuery: city.name, activeTab: "Buy" } })}
              style={{ cursor: "pointer" }}
            >
              <div className="feature-style1">
                <div className="feature-img">
                  <img
                    className="w-100 h-100 cover"
                    src={city.image}
                    alt={city.name}
                  />
                </div>
                <div className="feature-content">
                  <div className="top-area">
                    <h6 className="title mb-1">{city.name}</h6>
                    <p className="text">
                      {city.propertyCount > 0
                        ? `${city.propertyCount} Properties`
                        : "Browse listings"}
                    </p>
                  </div>
                  <div className="bottom-area">
                    <span className="ud-btn2" style={{ color: "#fff" }}>
                      View listings
                      <i className="fal fa-arrow-right-long" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="rounded-arrow arrowY-center-position">
        <button className="property-by-city-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        <button className="property-by-city-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default PropertiesByCities;
