import listings from "@/data/listings";
import React from "react";

const PropertyDetails = ({ id }) => {
  const data = listings.filter((elm) => elm.ID == id)[0] || listings[0];
 const columns = [
  [
    {
      label: "Property ID",
      value: data.ID,
    },
    {
      label: "Price",
      value: data.PriceLabel,
    },
    {
      label: "Bedrooms",
      value: data.Bedrooms,
    },
    {
      label: "Bathrooms",
      value: data.Bathrooms,
    },
    // {
    //   label: "Parking",
    //   value: data.Parking,
    // },
  ],
  [
    {
      label: "Category",
      value: data.Category,
    },
    // {
    //   label: "Suburb",
    //   value: data.Suburb,
    // },
    {
      label: "State",
      value: data.State,
    },
    // {
    //   label: "Agent",
    //   value: data.Agent,
    // },
    {
      label: "Agency",
      value: data.Agency,
    },
  ],
];
  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
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
