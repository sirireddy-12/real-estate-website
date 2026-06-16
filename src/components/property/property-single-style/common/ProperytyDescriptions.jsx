import listings from "@/data/listings";
import React from "react";

const ProperytyDescriptions = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];

  const parts = [
    data.PropertyType && `Property Type: ${data.PropertyType}.`,
    data.Bedrooms && `${data.Bedrooms} bedroom${data.Bedrooms > 1 ? 's' : ''}.`,
    data.Bathrooms && `${data.Bathrooms} bathroom${data.Bathrooms > 1 ? 's' : ''}.`,
    data.Parking && `${data.Parking} parking space${data.Parking > 1 ? 's' : ''}.`,
    data.Agency && `Listed by ${data.Agency}.`,
    data.Open_Home_Date && `Open home: ${data["Open Home Date"]}.`,
  ].filter(Boolean);

  return (
    <p className="text mb10">
      {data.Address}, {data.State}, Australia.
      {parts.length > 0 && " " + parts.join(" ")}
    </p>
  );
};

export default ProperytyDescriptions;
