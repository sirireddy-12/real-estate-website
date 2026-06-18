import { useNavigate } from "react-router-dom";
import { useState } from "react";

const tabs = [
  { id: "buy",       label: "Buy" },
  { id: "rent",      label: "Rent" },
  { id: "sold",      label: "Sold" },
  { id: "agents",    label: "Agents" },
  { id: "reviews",   label: "Reviews" },
  { id: "questions", label: "Questions" },
];

const tabRoute = {
  buy:       "/grid-full-3-col",
  rent:      "/grid-full-2-col",
  sold:      "/grid-full-4-col",
  agents:    "/agents",
  reviews:   "/about",
  questions: "/faq",
};

const HeroContent = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("buy");
  const [query, setQuery] = useState("");

  const doSearch = () => navigate(tabRoute[active] || "/map-v1", { state: { searchQuery: query, activeTab: active.charAt(0).toUpperCase() + active.slice(1) } });

  return (
    <div className="hs-wrap">
      {/* Tabs — centered */}
      <ul className="hs-tabs">
        {tabs.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              className={`hs-tab${active === t.id ? " hs-tab--active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Search pill */}
      <div className="hs-bar">
        <form
          className="hs-form"
          onSubmit={(e) => { e.preventDefault(); doSearch(); }}
        >
          <input
            className="hs-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suburb or postcode"
          />
          {query && (
            <button
              type="button"
              className="hs-clear"
              onClick={() => setQuery("")}
              aria-label="Clear"
            >
              ×
            </button>
          )}
          <button className="hs-submit" type="submit">
            <i className="fas fa-search" /> Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroContent;
