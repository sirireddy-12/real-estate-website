import React from "react";

const ContactWithAgent = ({ data }) => {
  const agentName = data?.Agent || data?.Agency || "Agency";
  const phone = data?.["Agent Phone"];
  const email = data?.["Agent Email"];
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(agentName)}&backgroundColor=e84040&textColor=ffffff`;

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm flex-shrink-0">
          <img
            className="bdrs50"
            src={avatar}
            alt={agentName}
            style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{agentName}</h6>
          {phone && (
            <div className="agent-meta mb5 d-flex align-items-center">
              <a className="text fz14" href={`tel:${phone}`}>
                <i className="flaticon-call pe-1" />{phone}
              </a>
            </div>
          )}
          {email && (
            <div className="agent-meta mb5 d-flex align-items-center">
              <a className="text fz14" href={`mailto:${email}`}>
                <i className="flaticon-email pe-1" />{email}
              </a>
            </div>
          )}
        </div>
      </div>

      {data?.ListingURL && (
        <div className="d-grid mb10">
          <a href={data.ListingURL} target="_blank" rel="noreferrer" className="ud-btn btn-white2">
            View Original Listing <i className="fal fa-arrow-right-long" />
          </a>
        </div>
      )}
      <div className="d-grid">
        <a href={email ? `mailto:${email}` : "#"} className="ud-btn btn-thm">
          Contact Agent <i className="fal fa-arrow-right-long" />
        </a>
      </div>
    </>
  );
};

export default ContactWithAgent;
