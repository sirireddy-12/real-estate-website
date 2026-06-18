import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import listings from "@/utilis/listingHelpers";

const tabs = [
  { id: "Buy",  label: "Buy" },
  { id: "Rent", label: "Rent" },
  { id: "Sold", label: "Sold" },
];

// Named cities that resolve via alias expansion in filterListings
const NAMED_CITIES = ["Melbourne", "Perth", "Brisbane", "Hobart", "Darwin", "Adelaide", "Sydney", "Canberra"];

// Build suburb/city suggestions that actually have listings for the active tab
const buildSuggestions = (category = "Buy") => {
  const relevant = category === "All"
    ? listings
    : listings.filter((l) => l.Category === category);
  const set = new Set();
  // Add named cities first
  NAMED_CITIES.forEach((c) => set.add(c));
  relevant.forEach((l) => {
    if (l.Suburb) set.add(l.Suburb);
    const parts = (l.Address || "").split(",");
    if (parts.length >= 2) {
      const city = parts[parts.length - 1].trim();
      if (city && city.length > 1) set.add(city);
    }
  });
  return Array.from(set).filter(Boolean).sort();
};

const SUGGESTIONS_BY_TAB = {
  Buy: buildSuggestions("Buy"),
  Rent: buildSuggestions("Rent"),
  Sold: buildSuggestions("Sold"),
};

const HeroContent = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Buy");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg, setShowSugg] = useState(false);
  const wrapRef = useRef(null);

  const tabHasData = listings.some((l) => l.Category === active);

  useEffect(() => {
    if (!tabHasData || query.trim().length < 2) { setSuggestions([]); return; }
    const q = query.toLowerCase();
    const pool = SUGGESTIONS_BY_TAB[active] || SUGGESTIONS_BY_TAB.Buy;
    setSuggestions(pool.filter((s) => s.toLowerCase().includes(q)).slice(0, 8));
  }, [query, tabHasData, active]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowSugg(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doSearch = (q = query) => {
    if (!tabHasData) return;
    setShowSugg(false);
    navigate("/grid-full-3-col", {
      state: { searchQuery: q.trim(), activeTab: active },
    });
  };

  return (
    <div className="hs-wrap">
      <ul className="hs-tabs">
        {tabs.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              className={`hs-tab${active === t.id ? " hs-tab--active" : ""}`}
              onClick={() => { setActive(t.id); setQuery(""); setSuggestions([]); }}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      {!tabHasData ? (
        <div className="hs-no-data">
          <i className="flaticon-home-1 hs-no-data-icon" />
          <p className="hs-no-data-text">No {active.toLowerCase()} properties available at this time.</p>
          <button className="hs-tab-switch" onClick={() => setActive("Buy")}>
            Browse properties for sale <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      ) : (
        <div className="hs-bar" ref={wrapRef} style={{ position: "relative" }}>
          <form className="hs-form" onSubmit={(e) => { e.preventDefault(); doSearch(); }}>
            <span className="hs-icon"><i className="fas fa-search" /></span>
            <input
              className="hs-input"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSugg(true); }}
              onFocus={() => query.length >= 2 && setShowSugg(true)}
              placeholder="Search suburb, city or address…"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="hs-clear"
                onClick={() => { setQuery(""); setSuggestions([]); }}
                aria-label="Clear"
              >
                <i className="fas fa-times" />
              </button>
            )}
            <button className="hs-submit" type="submit">Search</button>
          </form>

          {showSugg && suggestions.length > 0 && (
            <ul className="hs-suggestions">
              {suggestions.map((s) => (
                <li key={s} onMouseDown={() => { setQuery(s); doSearch(s); }}>
                  <i className="fas fa-map-marker-alt hs-sugg-icon" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroContent;
