
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import "photoswipe/dist/photoswipe.css";
import listings from "@/utilis/listingHelpers";
import Map from "./Map";

// Curated fallback gallery images (real estate interiors/exteriors)
const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
];

const PropertyGallery = ({ id }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];
  // Build a gallery: main photo + fallback images to show a realistic gallery
  const mainPhoto = data?.MainPhotoURL;
  const images = mainPhoto
    ? [mainPhoto, ...FALLBACK_GALLERY]
    : FALLBACK_GALLERY;
  return (
    <>
      <div className="row">
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <div className="ps-v4-hero-tab position-relative">
            <ul
              className="nav nav-pills justify-content-end"
              id="pills-tab2"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active mr10"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <span className="flaticon-images text-white fz20" />
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link mr10"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <span className="flaticon-map text-white fz20" />
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  <span className="flaticon-maps-1 text-white fz20" />
                </button>
              </li>
            </ul>
          </div>
          {/* End .ps-v4-hero-tab */}

          <div className="ps-v4-hero-tab">
            <div
              className="tab-content overflow-visible"
              id="pills-tabContent2"
            >
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="container p-0">
                  <div className="row" data-aos="fade-up" data-aos-delay="300">
                    <div className="col-lg-12">
                      <div className="ps-v6-slider nav_none slider-1-grid owl-theme owl-carousel">
                        <Swiper
                          loop={true}
                          spaceBetween={10}
                          navigation={{
                            prevEl: ".prev-btn",
                            nextEl: ".next-btn",
                          }}
                          thumbs={{
                            swiper:
                              thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                          }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper2"
                        >
                          {images.map((item, i) => (
                            <SwiperSlide key={i}>
                              <img
                                src={item}
                                alt="gallery"
                                style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 12, display: "block" }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <div className="row">
                          <div className="col-lg-7 col-md-8">
                            <Swiper
                              onSwiper={setThumbsSwiper}
                              loop={true}
                              spaceBetween={10}
                              slidesPerView={4}
                              freeMode={true}
                              watchSlidesProgress={true}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className="mySwiper mt20"
                            >
                              {images.map((item, i) => (
                                <SwiperSlide key={i}>
                                  <img
                                    src={item}
                                    alt="image"
                                    style={{ width: "100%", height: 72, objectFit: "cover", borderRadius: 8, display: "block", cursor: "pointer" }}
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End tab-pane */}

              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <Map />
              </div>
              {/* End map type listing */}

              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <iframe
                  className="h510 w-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405117647!2d144.9630576!3d-37.8136176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {/* End map locatoin fnder */}
            </div>
          </div>
          {/* End ps-v4-hero-tab content */}
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default PropertyGallery;
