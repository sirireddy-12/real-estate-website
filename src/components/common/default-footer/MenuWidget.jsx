import React from "react";
import { Link } from "react-router-dom";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Popular Search",
      links: [
        { label: "Apartments for Sale", href: "/grid-full-4-col" },
        { label: "Houses for Sale", href: "/grid-full-4-col" },
        { label: "Properties for Rent", href: "/grid-full-4-col" },
        { label: "Sold Properties", href: "/grid-full-4-col" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Pricing Plans", href: "/pricing" },
        { label: "FAQs", href: "/faq" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "Melbourne", href: "/grid-full-4-col" },
        { label: "Perth", href: "/grid-full-4-col" },
        { label: "Hobart", href: "/grid-full-4-col" },
        { label: "Brisbane", href: "/grid-full-4-col" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
