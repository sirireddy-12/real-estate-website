import listings from "@/utilis/listingHelpers";
import React from "react";

const ProperytyDescriptions = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  const parts = [
    data.PropertyType && `Property Type: ${data.PropertyType}.`,
    data.Bedrooms && `${data.Bedrooms} bedroom${data.Bedrooms > 1 ? "s" : ""}.`,
    data.Bathrooms && `${data.Bathrooms} bathroom${data.Bathrooms > 1 ? "s" : ""}.`,
    data.Parking && `${data.Parking} parking space${data.Parking > 1 ? "s" : ""}.`,
    data.Agency && `Listed by ${data.Agency}.`,
    data["Open Home Date"] && !data["Open Home Date"].includes("Build your dream") && `Open home: ${data["Open Home Date"].replace(/Inspection/g, "").trim()}.`,
  ].filter(Boolean);

  return (
    <p className="text mb10">
      {data.Address}, {data.State && `${data.State}, `}Australia.
      {parts.length > 0 && " " + parts.join(" ")}
    </p>
  );
};

export default ProperytyDescriptions;
