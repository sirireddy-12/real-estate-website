import listings from "@/utilis/listingHelpers";
import React from "react";

const OverView = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  const isValid = (v) =>
    v !== undefined && v !== null && v !== "" &&
    String(v) !== "undefined" && String(v) !== "null" && String(v) !== "N/A";

  const overviewData = [
    { icon: "flaticon-bed",      label: "Bedrooms",  value: data.Bedrooms },
    { icon: "flaticon-shower",   label: "Bathrooms", value: data.Bathrooms },
    { icon: "flaticon-garage",   label: "Parking",   value: data.Parking },
    { icon: "flaticon-home-1",   label: "Type",      value: data.PropertyType },
    { icon: "flaticon-home-1",   label: "Category",  value: data.Category },
    { icon: "flaticon-location", label: "Suburb",    value: data.Suburb },
    { icon: "flaticon-map",      label: "State",     value: data.State },
  ].filter((item) => isValid(item.value));

  return (
    <>
      {overviewData.map((item, index) => (
        <div key={index} className="col-sm-6 col-lg-4 mb25">
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
