
import { Link } from "react-router-dom";

const About = () => {
  const featureList = [
    "Apartments for Sale",
    "Houses for Rent",
    "Property Listings Updated Daily"
  ];
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xl-4">
          <div
            className="about-box-1 pe-4 mt100 mt0-lg mb30-lg "
            data-aos="fade-left"
          >
            <h2 className="title mb30">
              Let’s find the right selling option for you
            </h2>
            <p className="text mb25 fz15">
              Browse apartments, houses and rental properties across Melbourne.
            </p>
            <div className="list-style1 mb50">
              <ul>
                {featureList.map((list, index) => (
                  <li key={index}>
                    <i className="far fa-check text-white bgc-dark fz15"></i>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/grid-full-1-col" className="ud-btn btn-white2">
                   View Properties
            </Link>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-lg-9 col-xl-8 col-xxl-7 offset-xxl-1">
          <div className="position-relative mb35 mb0-sm" data-aos="fade-right">
            <div className="img-box-1 list-inline-item me-0">
              <img
               
                className="img-1"
                src="https://open-home-media-au.s3.ap-southeast-2.amazonaws.com/photos/000/041/41013.jpg"
                alt="about"
              />
            </div>
            <div className="img-box-2 list-inline-item me-0">
              <img
               
                className="img-1"
                src="https://open-home-media-au.s3.ap-southeast-2.amazonaws.com/photos/000/041/41022.jpg"
                alt="about"
              />
            </div>
            {/* <div className="img-box-3">
              <img
               
                className="img-1 bounce-y"
                src="https://open-home-media-au.s3.ap-southeast-2.amazonaws.com/photos/000/041/41086.jpg"
                alt="about"
              />
            </div>
            <div className="img-box-4">
              <img
               
                className="img-1 spin-right"
                src="/images/about/element-1.png"
                alt="about"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
