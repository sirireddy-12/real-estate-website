import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const HeroContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "sold", label: "Sold" },
  ];

  const tabToCategory = { buy: "Buy", rent: "Rent", sold: "Sold" };

  const handleSearch = () => {
    navigate("/map-v1", {
      state: { searchQuery, activeTab: tabToCategory[activeTab] || "Buy" },
    });
  };

  return (
    <div className="advance-search-tab animate-up-3">
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        <div className="active tab-pane">
          <div className="advance-content-style1">
              <div className="row align-items-center">
                <div className="col-md-8 col-lg-9">
                  <div className="advance-search-field position-relative text-start">
                    <form
                      className="form-search position-relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                    >
                      <div className="box-search">
                        <span className="icon flaticon-home-1" />
                        <input
                          className="form-control bgc-f7 bdrs12"
                          type="text"
                          name="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={`Search by address, suburb or postcode`}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-md-4 col-lg-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModal"
                    >
                      <span className="flaticon-settings" /> Filters
                    </button>
                    <button
                      className="advance-search-icon ud-btn btn-thm ms-3"
                      onClick={handleSearch}
                      type="button"
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
