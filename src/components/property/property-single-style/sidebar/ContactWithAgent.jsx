
import { Link } from "react-router-dom";
import React from "react";

const ContactWithAgent = ({ data }) => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <img
          
            className="w90"
            src={data?.MainPhotoURL}
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">
              {data?.Agent || data?.Agency || "Agent"}
          </h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              {data?.["Agent Phone"] || "No Phone"}
            </a>
          </div>
          <Link
            to="/agent-single/3"
            className="text-decoration-underline fw600"
          >
            View Listings
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <Link to="/agent-single/3" className="ud-btn btn-white2">
          Contact Agent
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </>
  );
};

export default ContactWithAgent;
