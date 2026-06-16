import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PopularListings from "./PopularListings";
import listings from "../../../data/listings";

const indexedListings = listings.map((l, i) => ({ ...l, _idx: i }));

export default function PopulerProperty() {
  const [pageData, setPageData] = useState([]);
  const [currentType, setCurrentType] = useState("Buy");

  useEffect(() => {
    setPageData(indexedListings.filter((elm) => elm.Category === currentType));
  }, [currentType]);

  return (
    <section className="bgc-dark">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title text-white">Discover Popular Properties</h2>
              <p className="paragraph text-white">
                Browse properties across Australia
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="dark-light-navtab text-start text-lg-end mt-0 mt-lg-4 mb-4">
              <ul className="nav nav-pills justify-content-start justify-content-lg-end">
                {["Buy", "Rent", "Sold"].map((type) => (
                  <li
                    className="nav-item"
                    key={type}
                    onClick={() => setCurrentType(type)}
                  >
                    <button
                      className={`nav-link ${type !== "Sold" ? "" : "me-0"} ${
                        currentType === type ? "active" : ""
                      }`}
                    >
                      {type === "Buy" ? "For Sale" : type === "Rent" ? "For Rent" : "Sold"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-12">
            {pageData.length === 0 ? (
              <p className="no-properties-msg text-white text-center py-4">
                No {currentType} properties found. Check back soon.
              </p>
            ) : (
              <PopularListings data={pageData} />
            )}
            <div className="d-grid d-md-block text-center mt30 mt0-md">
              <Link to="/grid-full-4-col" className="ud-btn btn-thm">
                See All Properties<i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
