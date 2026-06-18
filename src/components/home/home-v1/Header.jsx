import LoginSignupModal from "@/components/common/login-signup-modal";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Buy",          href: "/grid-full-3-col", tab: "Buy" },
  { label: "Rent",         href: "/grid-full-3-col", tab: "Rent" },
  { label: "Sold",         href: "/grid-full-3-col", tab: "Sold" },
  { label: "Agent Finder", href: "/agents" },
  { label: "Suburb Reviews", href: "/about" },
  { label: "Questions",    href: "/faq" },
  { label: "Blog",         href: "/blog-list-v1" },
];

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onChange = () => setNavbar(window.scrollY >= 10);
    window.addEventListener("scroll", onChange);
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const handleNavClick = (e, item) => {
    if (item.tab) {
      e.preventDefault();
      navigate(item.href, { state: { activeTab: item.tab } });
    }
  };

  return (
    <>
      <header className={`homely-header${navbar ? " sticky slideInDown animated" : ""}`}>
        <div className="container">
          <div className="homely-header-inner">
            {/* Logo */}
            <Link className="homely-logo" to="/">
              <img src="/images/header-logo2.svg" alt="Homely" />
            </Link>

            {/* Nav links */}
            <nav className="homely-nav d-none d-lg-flex">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.tab ? item.href : item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="homely-nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="homely-header-actions">
              <span className="d-none d-xl-flex align-items-center gap-3">
                <Link to="/dashboard-home" className="homely-nav-link">
                  Collections
                </Link>
                <Link to="/dashboard-my-favourites" className="homely-nav-link">
                  My Alerts
                </Link>
              </span>
              <a
                href="#"
                className="homely-signup-btn"
                data-bs-toggle="modal"
                data-bs-target="#loginSignupModal"
                role="button"
              >
                Sign up
              </a>
              <a
                href="#"
                className="homely-user-icon"
                data-bs-toggle="modal"
                data-bs-target="#loginSignupModal"
                role="button"
                aria-label="Account"
              >
                <i className="far fa-user-circle fz22" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
