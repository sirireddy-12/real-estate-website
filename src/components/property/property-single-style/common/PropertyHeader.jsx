import listings from "@/utilis/listingHelpers";
import React from "react";

const PropertyHeader = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  const openHome = data.OpenHomeCleaned || "";

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.Address}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            {(data.Suburb || data.State) && (
              <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
                {data.Suburb ? `${data.Suburb}, ` : ""}{data.State}
              </p>
            )}
            {data.Category && (
              <a className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm" href="#">
                <i className="fas fa-circle fz10 pe-2" />
                For {data.Category}
              </a>
            )}
            {openHome && (
              <span className="fz13 ml10" style={{ color: "#27ae60", fontWeight: 600 }}>
                <i className="fas fa-calendar-check pe-1" />{openHome}
              </span>
            )}
          </div>
          <div className="property-meta d-flex align-items-center flex-wrap gap-3">
            {data.Bedrooms ? (
              <span className="text fz15">
                <i className="flaticon-bed pe-2 align-text-top" />{data.Bedrooms} bed
              </span>
            ) : null}
            {data.Bathrooms ? (
              <span className="text fz15">
                <i className="flaticon-shower pe-2 align-text-top" />{data.Bathrooms} bath
              </span>
            ) : null}
            {data.Parking ? (
              <span className="text fz15">
                <i className="flaticon-car pe-2 align-text-top" />{data.Parking} park
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#"><span className="flaticon-like" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-new-tab" /></a>
              <a className="icon mr10" href="#"><span className="flaticon-share-1" /></a>
              <a className="icon" href="#"><span className="flaticon-printer" /></a>
            </div>
            <h3 className="price mb-0">{data.PriceLabel || "Contact Agent"}</h3>
            {data.Agency && <p className="text fz14 mt5 mb-0">{data.Agency}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;
