import listings from "@/utilis/listingHelpers";
import React from "react";

const OverView = ({ id }) => {
  const data = listings.filter((elm) => elm.ID == id)[0] || listings[0];
  const overviewData = [
  {
    icon: "flaticon-bed",
    label: "Bedrooms",
    value: data.Bedrooms,
  },
  {
    icon: "flaticon-shower",
    label: "Bathrooms",
    value: data.Bathrooms,
  },
  {
    icon: "flaticon-garage",
    label: "Parking",
    value: data.Parking,
  },
  {
    icon: "flaticon-home-1",
    label: "Category",
    value: data.Category,
  },
  {
    icon: "flaticon-location",
    label: "Suburb",
    value: data.Suburb,
  },
  {
    icon: "flaticon-map",
    label: "State",
    value: data.State,
  },
];
  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-2">
          <div className="overview-element dark-version mb25 d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0 text-white">{item.label}</h6>
              <p className="text mb-0 fz15 text-white">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
