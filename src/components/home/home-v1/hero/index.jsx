import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <>
      <div className="homely-hero">
        {/* Image — absolute top-right, bleeds to viewport edge */}
        <div className="homely-hero-img-wrap">
          <img
            src="https://i2.au.reastatic.net/800x600/69baf2e3b4c35c895cde0ea371d461ead152b0f1f4114f5d8eba4ef3ce774266/image.jpg"
            alt="Real estate"
            className="homely-hero-img"
            width={800}
            height={600}
            loading="lazy"
          />
        </div>

        {/* Container holds text + search card */}
        <div className="container">
          {/* Left heading */}
          <div className="homely-hero-body">
            <h1 className="homely-hero-title">
              <span className="homely-pink">Australian real estate search,</span>
              <br />
              suburb reviews and local Q&amp;A
            </h1>
            <p className="homely-hero-sub">
              Find hundreds of thousands of properties for sale and rent.{" "}
              New homes listed daily.
            </p>
          </div>
        </div>

        {/* Search card — full width below, no container constraint */}
        <div className="homely-search-card-outer">
          <div className="container">
            <div className="homely-search-card">
              <HeroContent />
            </div>
          </div>
        </div>
      </div>

      // amazonq-ignore-next-line
      <div
        className="modal fade"
        id="advanceSearchModal"
        tabIndex={-1}
        aria-hidden="true"
        aria-labelledby="advanceSearchModalLabel"
      >
        <AdvanceFilterModal />
      </div>
    </>
  );
};

export default Hero;
