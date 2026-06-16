
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListingsFavourites = () => {
  const [favoriteListings, setFavoriteListings] = useState(
    listings.slice(0, 8)
  );

  const handleDeleteListing = (idx) => {
    setFavoriteListings((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      {favoriteListings.length === 0 ? (
        <h3>No items available.</h3>
      ) : (
        favoriteListings.map((listing, idx) => (
          <div className="col-md-6 col-lg-4 col-xl-3" key={idx}>
            <div className="listing-style1 style2">
              <div className="list-thumb">
                <img
                  className="w-100 cover"
                  style={{ height: "180px" }}
                  src={listing.MainPhotoURL}
                  alt={listing.Address}
                />
                <button
                  className="tag-del"
                  title="Remove from Favourites"
                  onClick={() => handleDeleteListing(idx)}
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${idx}`}
                >
                  <span className="fas fa-trash-can"></span>
                </button>
                <ReactTooltip id={`delete-${idx}`} place="left" content="Remove" />
                {listing.PriceLabel && (
                  <div className="list-price">{listing.PriceLabel}</div>
                )}
              </div>
              <div className="list-content">
                <h6 className="list-title">
                  <Link to={`/single-v6/${idx}`}>{listing.Address}</Link>
                </h6>
                <p className="list-text">{listing.Suburb} {listing.State}</p>
                <div className="list-meta d-flex align-items-center">
                  {listing.Bedrooms && (
                    <a href="#"><span className="flaticon-bed" /> {listing.Bedrooms} bed</a>
                  )}
                  {listing.Bathrooms && (
                    <a href="#"><span className="flaticon-shower" /> {listing.Bathrooms} bath</a>
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
          </div>
        ))
      )}
    </>
  );
};

export default ListingsFavourites;
