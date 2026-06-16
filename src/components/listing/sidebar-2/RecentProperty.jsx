import React from "react";
import listings from "@/data/listings";

const RecentProperty = () => {
  return (
    <>
      {listings.slice(0, 3).map((listing, i) => (
        <div
          className="list-news-style d-flex align-items-center mb20"
          key={i}
        >
          <div className="news-img flex-shrink-0">
            <img
              className="w-full h-full cover"
              src={listing.MainPhotoURL}
              alt={listing.Address}
            />
          </div>
          <div className="news-content flex-shrink-1 ms-3">
            <h5 className="title mb0 fz14">{listing.PriceLabel || "Contact Agent"}</h5>
            <p className="new-text mb0 fz14">{listing.Address}</p>
            <div className="list-meta">
              {listing.Bedrooms && (
                <a href="#" className="me-2">
                  <span className="flaticon-bed pe-1" /> {listing.Bedrooms}
                </a>
              )}
              {listing.Bathrooms && (
                <a href="#" className="me-2">
                  <span className="flaticon-shower pe-1" /> {listing.Bathrooms}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecentProperty;
