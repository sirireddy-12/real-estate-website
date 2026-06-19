import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringTwo from "@/components/listing/map-style/map-v1/PropertyFilteringTwo";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Search Properties | Homely Australia",
};

const MapV1 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <PropertyFilteringTwo/>

      {/* <!-- Advance Feature Modal Start --> */}
     
      {/* Property Filtering */}
    </>
  );
};

export default MapV1;
