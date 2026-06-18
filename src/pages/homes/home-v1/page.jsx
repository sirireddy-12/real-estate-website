import Explore from "../../../components/common/Explore";
import Footer from "../../../components/common/default-footer";
import MobileMenu from "../../../components/common/mobile-menu";
import About from "../../../components/home/home-v1/About";
import ApartmentType from "../../../components/home/home-v1/ApartmentType";
import CallToActions from "../../../components/common/CallToActions";
import FeaturedListings from "../../../components/home/home-v1/FeatuerdListings";
import Header from "../../../components/home/home-v1/Header";
import PropertiesByCities from "../../../components/home/home-v1/PropertiesByCities";
import Testimonial from "../../../components/home/home-v1/Testimonial";
import Hero from "../../../components/home/home-v1/hero";
import Blog from "../../../components/common/Blog";
import { Link } from "react-router-dom";
import PopulerProperty from "../../../components/home/home-v1/PopulerProperty";
import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Homez | Australia's Real Estate Portal",
};

const Home_V1 = () => {
  return (
    <>
      <MetaData meta={metaInformation} />
      <Header />
      <MobileMenu />

      <section className="homely-banner-section">
        <Hero />
      </section>

      {/* Explore Property Types */}
      <section id="explore-property" className="pt60 pb60 pb30-md">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <div className="main-title" data-aos="fade-up" data-aos-delay="300">
                <h2 className="title">Explore Property Types</h2>
                <p className="paragraph">Browse houses, apartments, townhouses and more</p>
              </div>
            </div>
            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="prev__active swiper_button"><i className="far fa-arrow-left-long" /></button>
                </div>
                <div className="col-auto">
                  <div className="pagination swiper--pagination pagination__active" />
                </div>
                <div className="col-auto">
                  <button className="next__active swiper_button"><i className="far fa-arrow-right-long" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="explore-apartment-slider" data-aos="fade-up" data-aos-delay="300">
                <ApartmentType />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="pt0 pb60 pb10-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up" data-aos-delay="300">
              <div className="main-title text-center">
                <h2 className="title">See How We Can Help</h2>
                <p className="paragraph">Find your next home or investment property with ease</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Explore />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="pt60 pb60 bgc-f7">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">Latest properties available across Australia</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" to="/grid-full-3-col">
                  See All Properties <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <FeaturedListings />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties by City */}
      <section className="pt60 pb60 pb40-md">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-9">
              <div className="main-title2">
                <h2>Properties by City</h2>
                <p className="paragraph">Explore listings in Melbourne, Perth, Hobart and more</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <Link className="ud-btn2" to="/grid-full-3-col">
                  See All Cities <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <PropertiesByCities />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="pt0 pb60 pb40-md">
        <div className="container">
          <About />
        </div>
      </section>

      {/* Popular Properties */}
      <PopulerProperty />

      {/* Testimonials */}
      <section className="pt60 pb60 pb50-md bgc-thm-light">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <div className="main-title" data-aos="fade-up" data-aos-delay="300">
                <h2 className="title">What Our Customers Say</h2>
                <p className="paragraph">Hear from buyers and renters who found their perfect property</p>
              </div>
            </div>
            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="testimonila_prev__active swiper_button"><i className="far fa-arrow-left-long" /></button>
                </div>
                <div className="col-auto">
                  <div className="pagination swiper--pagination testimonila_pagination__active" />
                </div>
                <div className="col-auto">
                  <button className="testimonila_next__active swiper_button"><i className="far fa-arrow-right-long" /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="testimonial-slider" data-aos="fade-up" data-aos-delay="300">
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="pt60 pb60 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">
              <div className="main-title text-start text-md-center">
                <h2 className="title">From Our Blog</h2>
                <p className="paragraph">Property insights, suburb reviews and buying tips</p>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CallToActions />

      {/* Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Home_V1;
