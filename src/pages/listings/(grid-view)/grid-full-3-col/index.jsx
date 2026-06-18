import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/grid-full-3-col/ProperteyFiltering";
import React from "react";
import MetaData from "@/components/common/MetaData";
import { useLocation, Link } from "react-router-dom";

const metaInformation = {
  title: "Property Search | Australian Real Estate",
};

const GridFull3Col = () => {
  const locationState = useLocation();
  const searchQuery = locationState.state?.searchQuery || "";
  const activeTab   = locationState.state?.activeTab   || "Buy";
  const heading = searchQuery
    ? `Properties ${activeTab === "Buy" ? "for Sale" : activeTab === "Rent" ? "for Rent" : "Sold"} in ${searchQuery}`
    : `All Properties ${activeTab === "Buy" ? "for Sale" : activeTab === "Rent" ? "for Rent" : "Sold"}`;

  return (
    <>
      <MetaData meta={metaInformation} />
      <DefaultHeader />
      <MobileMenu />

      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="fz22">{heading}</h2>
                <div className="breadcumb-list">
                  <Link to="/">Home</Link>
                  <a href="#">Properties</a>
                  {searchQuery && <a href="#">{searchQuery}</a>}
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProperteyFiltering />

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default GridFull3Col;
