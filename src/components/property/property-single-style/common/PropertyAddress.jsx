import listings from "@/utilis/listingHelpers";
import React from "react";

const PropertyAddress = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  return (
    <>
      <div className="col-md-6 col-xl-4">
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Address</p>
            <p className="fw600 mb10 ff-heading dark-color">State</p>
            <p className="fw600 mb-0 ff-heading dark-color">Country</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{data.Address}</p>
            <p className="text mb10">{data.State}</p>
            <p className="text mb-0">Australia</p>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(data.Address + ", Australia")}&t=m&z=14&output=embed&iwloc=near`}
          title={data.Address}
          aria-label={data.Address}
        />
      </div>
    </>
  );
};

export default PropertyAddress;
