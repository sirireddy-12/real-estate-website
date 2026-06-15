import listings from "@/data/listings";

import { Link } from "react-router-dom";

const FeaturedListings = ({data,colstyle}) => {
  return (
    <>
      {data.map((listing) => (
        <div  className={` ${colstyle ? 'col-sm-12':'col-sm-6'}  `} key={listing.ID}>
          <div className={colstyle ? "listing-style1 listCustom listing-type" : "listing-style1"}>
            <div className="list-thumb"    >
              <img
                
                className="w-100 cover"
                src={listing.MainPhotoURL}
                style={{height:'240px'}}
                alt="listings"
              />
              <div className="sale-sticker-wrap">
                {listing.Category === "Rent" && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div>

              <div className="list-price">
                {listing.PriceLabel}
              </div>
            </div>
            <div className="list-content">
              <h6 className="list-title">
                  <Link to={`/single-v6/${listing.ID}`}>
                  {listing.Address}
                  </Link>
              </h6>
             <p className="list-text">
               {listing.State}
              </p>
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing.Bedrooms} bed
                </a>
                <a href="#">
                  <span className="flaticon-shower" /> {listing.Bathrooms} bath
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing.Suburb} suburb
                </a>
              </div>
              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">{listing.Category}</span>
                <div className="icons d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-fullscreen" />
                  </a>
                  <a href="#">
                    <span className="flaticon-new-tab" />
                  </a>
                  <a href="#">
                    <span className="flaticon-like" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
