import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PopularListings from "./PopularListings";
import listings from "@/utilis/listingHelpers";

export default function PopulerProperty() {
  const [pageData, setPageData] = useState([]);
  const [currentType, setCurrentType] = useState("Buy");

  useEffect(() => {
    setPageData(listings.filter((elm) => elm.Category === currentType));
  }, [currentType]);

  const tabs = [
    { key: "Buy",  label: "For Sale" },
    { key: "Rent", label: "For Rent" },
    { key: "Sold", label: "Sold" },
  ];

  const seeAllLabel =
    currentType === "Buy"  ? "Properties for Sale" :
    currentType === "Rent" ? "Rental Properties"   : "Sold Properties";

  const hasData = pageData.length > 0;

  return (
    <section className="pt60 pb60 bgc-f7">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-9">
            <div className="main-title2">
              <h2 className="title">Discover Popular Properties</h2>
              <p className="paragraph">Browse properties across Australia</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-start text-lg-end mt-0 mt-lg-4 mb-4">
              <ul className="nav nav-pills justify-content-start justify-content-lg-end">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.key} onClick={() => setCurrentType(tab.key)}>
                    <button
                      className={`nav-link${tab.key === "Sold" ? " me-0" : ""}${currentType === tab.key ? " active" : ""}`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-12">
            {!hasData ? (
              <div className="no-properties-msg">
                <span className="flaticon-home-1" style={{ fontSize: 48, color: "#ddd", display: "block", marginBottom: 12 }} />
                <p className="fz18 mb-2 fw500">No {currentType === "Rent" ? "rental" : "sold"} properties available</p>
                <p className="fz14 text" style={{ color: "#aaa" }}>
                  This portal currently lists properties for sale.
                  Check back soon for {currentType === "Rent" ? "rental" : "sold"} listings.
                </p>
                <button className="ud-btn btn-thm mt20" onClick={() => setCurrentType("Buy")}>
                  Browse Buy Listings <i className="fal fa-arrow-right-long" />
                </button>
              </div>
            ) : (
              <>
                <PopularListings data={pageData.slice(0, 8)} />
                <div className="text-center mt30">
                  <Link
                    to="/grid-full-3-col"
                    state={{ activeTab: currentType }}
                    className="ud-btn btn-thm"
                  >
                    See All {seeAllLabel} <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
