import apartmentType from "@/data/apartmentType";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Map display title back to the PropertyType key used in data
const TYPE_KEY_MAP = {
  "Houses":     "House",
  "Apartments": "Apartment",
  "Townhouses": "Townhouse",
  "Units":      "Unit",
  "Villas":     "Villa",
  "Acreage":    "Acreage",
  "Land":       "Residential land",
};

const ApartmentType = () => {
  const navigate = useNavigate();

  return (
    <Swiper
      className="overflow-visible"
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{ nextEl: ".next__active", prevEl: ".prev__active" }}
      pagination={{ el: ".pagination__active", clickable: true }}
      breakpoints={{
        300:  { slidesPerView: 2, spaceBetween: 15 },
        768:  { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      }}
    >
      {apartmentType.map((type) => {
        const typeKey = TYPE_KEY_MAP[type.title] || type.title;
        return (
          <SwiperSlide key={type.id}>
            <div className="item">
              <div
                className="iconbox-style1"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/grid-full-3-col", {
                    state: { propertyType: typeKey, activeTab: "Buy" },
                  })
                }
              >
                <span className={`icon ${type.icon}`} />
                <div className="iconbox-content">
                  <h6 className="title">{type.title}</h6>
                  <p className="text mb-0">
                    {type.count > 0 ? `${type.count} Properties` : "Browse"}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ApartmentType;
