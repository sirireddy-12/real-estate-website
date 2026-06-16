import { Link } from "react-router-dom";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";

const getStatusStyle = (status) => {
  switch (status) {
    case "Buy": return "pending-style style2";
    case "Rent": return "pending-style style1";
    case "Sold": return "pending-style style3";
    default: return "pending-style style2";
  }
};

const PropertyDataTable = () => {
  const propertyData = listings.slice(0, 5);

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Listing title</th>
          <th scope="col">Agency</th>
          <th scope="col">Status</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {propertyData.map((property, i) => (
          <tr key={i}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">
                  <img
                    className="w-100"
                    src={property.MainPhotoURL}
                    alt={property.Address}
                  />
                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link to={`/single-v6/${i}`}>{property.Address}</Link>
                  </div>
                  <p className="list-text mb-0">{property.Suburb} {property.State}</p>
                  {property.PriceLabel && (
                    <div className="list-price">
                      <a href="#">{property.PriceLabel}</a>
                    </div>
                  )}
                </div>
              </div>
            </th>
            <td className="vam">{property.Agency}</td>
            <td className="vam">
              <span className={getStatusStyle(property.Category)}>
                {property.Category}
              </span>
            </td>
            <td className="vam">{property.PriceLabel || "Contact Agent"}</td>
            <td className="vam">
              <div className="d-flex">
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${i}`}
                >
                  <span className="fas fa-pen fa" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${i}`}
                >
                  <span className="flaticon-bin" />
                </button>
                <ReactTooltip id={`edit-${i}`} place="top" content="Edit" />
                <ReactTooltip id={`delete-${i}`} place="top" content="Delete" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;
