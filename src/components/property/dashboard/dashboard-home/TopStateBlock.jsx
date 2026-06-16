import React from "react";
import listings from "@/data/listings";

const statisticsData = [
  {
    text: "All Properties",
    title: String(listings.length),
    icon: "flaticon-home",
  },
  {
    text: "For Sale",
    title: String(listings.filter((l) => l.Category === "Buy").length),
    icon: "flaticon-search-chart",
  },
  {
    text: "For Rent",
    title: String(listings.filter((l) => l.Category === "Rent").length),
    icon: "flaticon-review",
  },
  {
    text: "Sold",
    title: String(listings.filter((l) => l.Category === "Sold").length),
    icon: "flaticon-like",
  },
];

const TopStateBlock = () => {
  return (
    <>
      {statisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title">{data.title}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopStateBlock;
