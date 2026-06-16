import listings from "@/data/listings";
import { Link } from "react-router-dom";
import React from "react";

const TrendingProperty = () => {
  return (
    <>
      {listings.slice(0, 2).map((listing, i) => (
        <div className="listing-style1 sidebar-style1" key={i}>
          <div className="list-thumb">
            <img
              className="w-100 h-100 cover"
              src={listing.MainPhotoURL}
              alt={listing.Address}
            />
            {listing.PriceLabel && (
              <div className="list-price">{listing.PriceLabel}</div>
            )}
          </div>
          <div className="list-content">
            <h6 className="list-title">
              <Link to={`/single-v6/${i}`}>{listing.Address}</Link>
            </h6>
            <p className="list-text">{listing.Suburb} {listing.State}</p>
            <div className="list-meta d-flex align-items-center">
              {listing.Bedrooms && (
                <a href="#">
                  <span className="flaticon-bed" /> {listing.Bedrooms} bed
                </a>
              )}
              {listing.Bathrooms && (
                <a href="#">
                  <span className="flaticon-shower" /> {listing.Bathrooms} bath
                </a>
              )}
            </div>
            <hr className="mt-2 mb-2" />
            <div className="list-meta2 d-flex justify-content-between align-items-center">
              <span className="for-what">{listing.Category}</span>
              <div className="icons d-flex align-items-center">
                <a href="#"><span className="flaticon-fullscreen" /></a>
                <a href="#"><span className="flaticon-new-tab" /></a>
                <a href="#"><span className="flaticon-like" /></a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TrendingProperty;
