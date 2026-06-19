const ContactWithAgent = () => {
  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <img
            className="w90"
            src="/images/team/agent-3.png"
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">Arlene McCoy</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="tel:9200123421">
              <i className="flaticon-call pe-1" />
              (920) 012-3421
            </a>
          </div>
          <span className="text-decoration-underline fw600">
            View Listings
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactWithAgent;
