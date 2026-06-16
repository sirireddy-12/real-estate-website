import { Link } from "react-router-dom";
import listings from "@/data/listings";

const About = () => {
  const featureList = [
    "Apartments for Sale",
    "Houses for Rent",
    "Property Listings Updated Daily",
  ];
  const img1 = listings.find((l) => l.MainPhotoURL)?.MainPhotoURL ?? "";
  const img2 =
    listings.find((l) => l.MainPhotoURL && l.MainPhotoURL !== img1)
      ?.MainPhotoURL ?? img1;

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xl-4">
          <div
            className="about-box-1 pe-4 mt100 mt0-lg mb30-lg "
            data-aos="fade-left"
          >
            <h2 className="title mb30">
              Let's find the right selling option for you
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
            <Link to="/grid-full-1-col-v1" className="ud-btn btn-white2">
              View Properties
            </Link>
          </div>
        </div>

        <div className="col-lg-9 col-xl-8 col-xxl-7 offset-xxl-1">
          <div className="position-relative mb35 mb0-sm" data-aos="fade-right">
            <div className="img-box-1 list-inline-item me-0">
              <img className="img-1" src={img1} alt="about" />
            </div>
            <div className="img-box-2 list-inline-item me-0">
              <img className="img-1" src={img2} alt="about" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
