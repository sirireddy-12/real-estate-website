import { allblogs } from "@/data/blogs";
import Blog from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import MetaData from "@/components/common/MetaData";
import { useParams, Link } from "react-router-dom";

const metaInformation = {
  title: "Blog | Homely Australia Real Estate",
};

const BlogSingle = () => {
  const { id } = useParams();
  const data = allblogs.find((b) => String(b.id) === String(id)) || allblogs[0];

  return (
    <>
      <MetaData meta={metaInformation} />
      <DefaultHeader />
      <MobileMenu />

      <section className="our-blog pt50 pb60">
        <div className="container">
          {/* Hero image */}
          <div className="row mb40" data-aos="fade-up">
            <div className="col-lg-10 offset-lg-1">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  height: 420,
                  width: "100%",
                }}
              >
                <img
                  src={data.image}
                  alt={data.title || data.content}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-10 offset-lg-1">
              {/* Meta */}
              <div className="d-flex align-items-center gap-3 mb20 flex-wrap">
                {data.tag && (
                  <span
                    style={{
                      background: "#fff0f4",
                      color: "#ff1f5a",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      textTransform: "uppercase",
                      letterSpacing: ".5px",
                    }}
                  >
                    {data.tag || data.category}
                  </span>
                )}
                {data.date && (
                  <span style={{ color: "#888", fontSize: 13 }}>
                    {data.date.month} {data.date.day}
                    {data.date.year ? `, ${data.date.year}` : ", 2025"}
                  </span>
                )}
              </div>

              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#181a20",
                  lineHeight: 1.3,
                  marginBottom: 24,
                }}
              >
                {data.title || data.content}
              </h1>

              {data.text && (
                <p
                  style={{
                    fontSize: 16,
                    color: "#555",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {data.text}
                </p>
              )}

              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 24 }}>
                Australia's property market continues to evolve, offering unique
                opportunities for buyers, renters and investors. Whether you're
                navigating your first purchase, assessing rental yields, or
                exploring suburb data, having the right information makes all
                the difference.
              </p>

              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 24 }}>
                Understanding local market conditions, median prices and recent
                sales data in your target suburb is the foundation of any sound
                property decision. Use the search tools on this platform to
                explore listings, compare properties and connect with local
                agents who know your area best.
              </p>

              <blockquote
                style={{
                  borderLeft: "4px solid #ff1f5a",
                  paddingLeft: 24,
                  margin: "32px 0",
                  color: "#444",
                  fontStyle: "italic",
                  fontSize: 17,
                }}
              >
                "The right property at the right price in the right suburb —
                that's the trifecta every Australian buyer is searching for."
              </blockquote>

              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 32 }}>
                Always conduct thorough due diligence including building and
                pest inspections, council zoning checks and contract review
                before committing to any purchase. Work with a licensed
                conveyancer and ensure your finance pre-approval is current
                before making an offer.
              </p>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Link
                  to="/blog-list-v1"
                  style={{
                    color: "#ff1f5a",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  ← Back to Blog
                </Link>
                <span style={{ fontSize: 13, color: "#aaa" }}>
                  Share:{" "}
                  <a href="#" style={{ color: "#1877f2", marginLeft: 8 }}>
                    Facebook
                  </a>
                  <a href="#" style={{ color: "#1da1f2", marginLeft: 8 }}>
                    Twitter
                  </a>
                  <a href="#" style={{ color: "#0077b5", marginLeft: 8 }}>
                    LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="pb90 pt0" style={{ background: "#f7f7f7" }}>
        <div className="container">
          <div className="row mb30">
            <div className="col-lg-6 m-auto text-center">
              <h2 className="title" style={{ fontSize: 26, fontWeight: 700 }}>
                Related Posts
              </h2>
              <p className="paragraph">More property insights and guides</p>
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <Blog />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default BlogSingle;
