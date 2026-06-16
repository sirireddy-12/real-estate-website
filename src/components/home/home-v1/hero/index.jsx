import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left: heading + text */}
          <div className="col-lg-6 text-start mb-4 mb-lg-0">
            <span
              className="fz13 fw600 text-thm d-block mb-2"
              style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              Australia&apos;s Real Estate Portal
            </span>
            <h1 className="hero-title animate-up-2">
              Find your next home,
              <br />
              <span style={{ color: "#eb6753" }}>anywhere in Australia</span>
            </h1>
            <p className="hero-text fz15 animate-up-3 mt-3 mb-4">
              Search apartments, houses and rental properties across Melbourne,
              Sydney, Brisbane and beyond.
            </p>
            <div className="d-flex gap-3 animate-up-3">
              <div className="d-flex align-items-center gap-2">
                <span className="flaticon-home-1 text-thm fz20" />
                <span className="fz14 text-muted">390+ Properties</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="flaticon-location text-thm fz20" />
                <span className="fz14 text-muted">6 Cities</span>
              </div>
            </div>
          </div>

          {/* Right: property image */}
          <div className="col-lg-6">
            <img
              src="/images/home/home-1.jpg"
              alt="Featured Property"
              className="hero-property-img animate-up-3"
            />
          </div>
        </div>

        {/* Search section below the two columns */}
        <div className="row mt-3">
          <div className="col-12">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* Advance Feature Modal */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
    </>
  );
};

export default Hero;
