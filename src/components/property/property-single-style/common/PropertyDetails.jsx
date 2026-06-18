import listings from "@/utilis/listingHelpers";
import React from "react";

const PropertyDetails = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  const allDetails = [
    { label: "Price",     value: data.PriceLabel },
    { label: "Bedrooms",  value: data.Bedrooms },
    { label: "Bathrooms", value: data.Bathrooms },
    { label: "Parking",   value: data.Parking },
    { label: "Type",      value: data.PropertyType },
    { label: "Category",  value: data.Category },
    { label: "Suburb",    value: data.Suburb },
    { label: "State",     value: data.State },
    { label: "Agency",    value: data.Agency },
  ].filter((d) => d.value !== undefined && d.value !== null && d.value !== "" && d.value !== "N/A" && d.value !== "undefined");

  const half = Math.ceil(allDetails.length / 2);
  const col1 = allDetails.slice(0, half);
  const col2 = allDetails.slice(half);

  return (
    <div className="row">
      {[col1, col2].map((col, ci) => (
        <div key={ci} className={`col-md-6 col-xl-4${ci === 1 ? " offset-xl-2" : ""}`}>
          {col.map((detail, i) => (
            <div key={i} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">{detail.label}</p>
              </div>
              <div className="pd-list">
                <p className="text mb10 text-end">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
