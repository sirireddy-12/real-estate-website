import listings from "@/utilis/listingHelpers";

const SingleAgentInfo = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];
  const agencyName = data.Agency || "";
  const agencyShort = agencyName.split(" - ")[0] || "Real Estate Agency";

  return (
    <div className="agent-single d-sm-flex align-items-center bdrb1 mb30 pb25">
      <div className="single-img mb30-sm">
        <div style={{ width: 90, height: 90, borderRadius: 12, background: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="flaticon-building" style={{ fontSize: 36, color: "#888" }} />
        </div>
      </div>
      <div className="single-contant ml30 ml0-xs">
        <h6 className="title mb-1">{agencyShort}</h6>
        {agencyName && agencyName.includes(" - ") && (
          <p className="text fz14 mb5" style={{ color: "#888" }}>{agencyName.split(" - ")[1]}</p>
        )}
        <div className="agent-meta mb10 d-md-flex align-items-center">
          <span className="text fz15 pe-2">
            <i className="flaticon-call pe-1" />
            Contact Agency
          </span>
        </div>
        {data.ListingURL && (
          <a href={data.ListingURL} target="_blank" rel="noreferrer" className="text fz13" style={{ color: "#ff1f5a" }}>
            View original listing <i className="fal fa-arrow-right-long" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SingleAgentInfo;
