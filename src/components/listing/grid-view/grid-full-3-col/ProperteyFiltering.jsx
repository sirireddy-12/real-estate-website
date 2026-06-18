




import listings from "@/utilis/listingHelpers";
const indexedListings = listings;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListingSidebar from '../../sidebar';
import AdvanceFilterModal from '@/components/common/advance-filter-two';
import TopFilterBar from './TopFilterBar';
import FeaturedListings from './FeatuerdListings';
import PaginationTwo from "../../PaginationTwo";


export default function ProperteyFiltering() {
  const locationState = useLocation();
  const navCategory = locationState.state?.activeTab || "Buy";
  const navSearch   = locationState.state?.searchQuery || "";

  const [filteredData, setFilteredData] = useState([]);

    const [currentSortingOption, setCurrentSortingOption] = useState('Newest')

    const [sortedFilteredData, setSortedFilteredData] = useState([]);


        const [pageNumber, setPageNumber] = useState(1)
    const [colstyle, setColstyle] = useState(false)
    const [pageItems, setPageItems] = useState([])
    const [pageContentTrac, setPageContentTrac] = useState([])
  
    useEffect(() => {
      setPageItems(sortedFilteredData
        .slice((pageNumber - 1) * 9, pageNumber * 9))
        setPageContentTrac([((pageNumber - 1) * 9) + 1 ,pageNumber * 9,sortedFilteredData.length])
    }, [pageNumber,sortedFilteredData])
    


  const [listingStatus, setListingStatus] = useState(navCategory);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState('All Cities');
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(navSearch);

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
   const filterFunctions = {
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
    setSearchQuery,
  }



    useEffect(() => {
        let result = indexedListings.filter((elm) =>
          listingStatus === "All" ? true : elm.Category === listingStatus
        );
        if (propertyTypes.length > 0)
          result = result.filter((elm) => propertyTypes.includes(elm.PropertyType));
        result = result.filter((el) => Number(el.Bedrooms || 0) >= bedrooms);
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
    }, [listingStatus, propertyTypes, priceRange, bedrooms, bathroms, location, squirefeet, yearBuild, categories, searchQuery])

    useEffect(() => {
      setPageNumber(1)
      if (currentSortingOption == 'Newest') {
        const sorted = [...filteredData].sort((a,b)=>a.yearBuilding - b.yearBuilding)
        setSortedFilteredData(sorted)
       
        
      } 
      else if (currentSortingOption.trim() == 'Price Low') {
       const sorted = [...filteredData].sort((a, b) =>
    Number((a.PriceLabel || "").replace(/[^0-9]/g, "")) -
    Number((b.PriceLabel || "").replace(/[^0-9]/g, ""))
)
        setSortedFilteredData(sorted)

        
      } 
      else if (currentSortingOption.trim() == 'Price High') {
        const sorted = [...filteredData].sort((a, b) =>
    Number((b.PriceLabel || "").replace(/[^0-9]/g, "")) -
    Number((a.PriceLabel || "").replace(/[^0-9]/g, ""))
)
        setSortedFilteredData(sorted)

        
      } 
    
      else {
        setSortedFilteredData(filteredData)
    
        
      }

      
    }, [filteredData,currentSortingOption,])
    
  return (
    <section className="pt0 pb90 bgc-f7">
        <div className="container">
          {/* start mobile filter sidebar */}
          <div
            className="offcanvas offcanvas-start p-0"
            tabIndex="-1"
            id="listingSidebarFilter"
            aria-labelledby="listingSidebarFilterLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                Listing Filter
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body p-0">
              <ListingSidebar filterFunctions={filterFunctions}  />
            </div>
          </div>
          {/* End mobile filter sidebar */}

          {/* <!-- Advance Feature Modal Start --> */}
          <div className="advance-feature-modal">
            <div
              className="modal fade"
              id="advanceSeachModal"
              tabIndex={-1}
              aria-labelledby="advanceSeachModalLabel"
              aria-hidden="true"
            >
              <AdvanceFilterModal filterFunctions={filterFunctions} />
            </div>
          </div>
          {/* <!-- Advance Feature Modal End --> */}

          <div className="row">
            <TopFilterBar  pageContentTrac={pageContentTrac}  colstyle ={colstyle} setColstyle={setColstyle}  filterFunctions={filterFunctions} setCurrentSortingOption={setCurrentSortingOption} />
          </div>
          {/* End TopFilterBar */}

          <div className="row">
            {pageItems.length === 0 ? (
              <div className="no-properties-msg">No properties found</div>
            ) : (
              <FeaturedListings colstyle={colstyle} data={pageItems} />
            )}
          </div>
          {/* End .row */}

          <div className="row">
          <PaginationTwo pageCapacity={9} data={sortedFilteredData} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
          
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
  )
}
