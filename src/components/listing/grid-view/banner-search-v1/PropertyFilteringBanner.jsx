


import listings from "@/utilis/listingHelpers";
const indexedListings = listings.map((l, i) => ({ ...l, _idx: i }));
import React, { useState,useEffect } from 'react'
import Pagination from '../../Pagination'
import FeaturedListings from './FeatuerdListings'
import TopFilterBar from './TopFilterBar'
import RecentProperty from '../../sidebar-2/RecentProperty'
import MortgageCalculator from './MortgageCalculator'
import Hero from './hero'
import PaginationTwo from "../../PaginationTwo";

export default function PropertyFilteringBanner() {
    const [filteredData, setFilteredData] = useState([]);

    const [currentSortingOption, setCurrentSortingOption] = useState('Newest')

    const [sortedFilteredData, setSortedFilteredData] = useState([]);


        const [pageNumber, setPageNumber] = useState(1)
    const [colstyle, setColstyle] = useState(false)
    const [pageItems, setPageItems] = useState([])
    const [pageContentTrac, setPageContentTrac] = useState([])
  
    useEffect(() => {
      setPageItems(sortedFilteredData
        .slice((pageNumber - 1) * 8, pageNumber * 8))
        setPageContentTrac([((pageNumber - 1) * 8) + 1 ,pageNumber * 8,sortedFilteredData.length])
    }, [pageNumber,sortedFilteredData])
    


    const [listingStatus, setListingStatus] = useState('All')
    const [propertyTypes, setPropertyTypes] = useState([])
    const [priceRange, setPriceRange] = useState([0,100000])
    const [bedrooms, setBedrooms] = useState(0)
    const [bathroms, setBathroms] = useState(0)
    const [location, setLocation] = useState('All Cities')
     const [squirefeet, setSquirefeet] = useState([])
    const [yearBuild, setyearBuild] = useState([])
    const [categories, setCategories] = useState([])

    const resetFilter = ()=>{
      setListingStatus('All')
      setPropertyTypes([])
      setPriceRange([0,100000])
      setBedrooms(0)
      setBathroms(0)
      setLocation('All Cities')
      setSquirefeet([])
      setyearBuild([0,2050])
      setCategories([])

      setCurrentSortingOption('Newest')
     document.querySelectorAll(".filterInput").forEach(function(element) {
      element.value = null;
  });

     document.querySelectorAll(".filterSelect").forEach(function(element) {
      element.value = 'All Cities';
  });
  
  


    }
    const [searchQuery, setSearchQuery] = useState('')

    const handlelistingStatus =(elm)=>{
      setListingStatus(pre => pre == elm ? 'All':elm)


    }

    
    
    const handlepropertyTypes =(elm)=>{


      if (elm == 'All') {
        setPropertyTypes([])
        
      } else {
        setPropertyTypes(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }
    

    }
    const handlepriceRange =(elm)=>{
      setPriceRange(elm)

    }
    const handlebedrooms =(elm)=>{
      setBedrooms(elm)
    }
    const handlebathroms =(elm)=>{
      setBathroms(elm)
    }
    const handlelocation =(elm)=>{
      console.log(elm)
      setLocation(elm)
    }
    const handlesquirefeet =(elm)=>{
      setSquirefeet(elm)
    }
    const handleyearBuild =(elm)=>{
      setyearBuild(elm)
    }
    const handlecategories =(elm)=>{
      if (elm == 'All') {
        setCategories([])
        
      } else {
        setCategories(pre=>pre.includes(elm) ? [...pre.filter((el)=>el!=elm)] : [...pre,elm])
      }

    }
   const filterFunctions={
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
        handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,
   
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery
  }



    useEffect(() => {
      let result = indexedListings.filter((elm) =>
        listingStatus === "All" ? true : elm.Category === listingStatus
      );
      if (propertyTypes.length > 0)
        result = result.filter((elm) => propertyTypes.includes(elm.PropertyType));
      if (bedrooms > 0)
        result = result.filter((el) => Number(el.Bedrooms || 0) >= bedrooms);
      if (bathroms > 0)
        result = result.filter((el) => Number(el.Bathrooms || 0) >= bathroms);
      if (location !== "All Cities")
        result = result.filter(
          (el) =>
            (el.Address || "").toLowerCase().includes(location.toLowerCase()) ||
            (el.Suburb || "").toLowerCase().includes(location.toLowerCase())
        );
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (el) =>
            (el.Address || "").toLowerCase().includes(q) ||
            (el.Suburb || "").toLowerCase().includes(q) ||
            (el.State || "").toLowerCase().includes(q) ||
            (el.Agency || "").toLowerCase().includes(q) ||
            (el.PropertyType || "").toLowerCase().includes(q)
        );
      }
      setFilteredData(result);
    }, [
        listingStatus, propertyTypes, priceRange,
        bedrooms, bathroms, location, squirefeet, yearBuild, categories, searchQuery
    ])

    useEffect(() => {
      setPageNumber(1);
      if (currentSortingOption === "Price Low") {
        setSortedFilteredData([...filteredData].sort((a, b) =>
          Number((a.PriceLabel || "").replace(/[^0-9]/g, "")) -
          Number((b.PriceLabel || "").replace(/[^0-9]/g, ""))
        ));
      } else if (currentSortingOption === "Price High") {
        setSortedFilteredData([...filteredData].sort((a, b) =>
          Number((b.PriceLabel || "").replace(/[^0-9]/g, "")) -
          Number((a.PriceLabel || "").replace(/[^0-9]/g, ""))
        ));
      } else {
        setSortedFilteredData([...filteredData]);
      }
    }, [filteredData, currentSortingOption])
  return (
    <>
         {/* Home Banner Style V1 */}
         <section className="property-banner-style1 p-0">
        <div className="inner-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-11 mx-auto">
                <Hero filterFunctions={filterFunctions} />
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V1 */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2>Australian Properties</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Listings</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4">
              <div className="list-sidebar-style1">
                <div className="widget-wrapper">
                  <h6 className="list-title">Mortgage Calculator</h6>
                  <MortgageCalculator />
                </div>
                {/* End widget-wrapper */}
              </div>
              {/* End .list-sidebar-style1 */}

              <div className="list-sidebar-style1">
                <div className="widget-wrapper">
                  <h6 className="list-title">Recently Viewed</h6>
                  <RecentProperty />
                </div>
                {/* End widget-wrapper */}
              </div>
              {/* End .list-sidebar-style1 */}
            </div>
            {/* End col-4 */}

            <div className="col-lg-8">
              <div className="row align-items-center mb20">
                <TopFilterBar pageContentTrac={pageContentTrac}  colstyle ={colstyle} setColstyle={setColstyle}  setCurrentSortingOption={setCurrentSortingOption}  />
              </div>
              <div className="row mt15">
                <FeaturedListings  colstyle ={colstyle}  data={pageItems}  />
              </div>
              {/* End .row */}

              <div className="row text-center">
              <PaginationTwo pageCapacity={8} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
          
              </div>
              {/* End .row */}
            </div>
            {/* End col-8 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {/* End .container */}
      </section>
      {/* Property Filtering */}
    </>
  )
}
