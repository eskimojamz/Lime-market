import { useState, useEffect, useMemo, useCallback } from 'react'
import Pagination from '../pagination/Pagination'
import Listing from '../components/Listing'
import Select from 'react-select'

import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getListings } from '../actions/actions'

import plus from '../assets/plus.svg'
const ListingsPage = () => {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)
  const [filteredListings, setFilteredListings] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const PageSize = 6

  useEffect(() => {
    dispatch(getListings())
  }, [])

  useEffect(() => {
    console.log(listings)
    // destructure listings array, assign to new const 
    // -- destructive to new const array, not original const listings
    const reverseListings = [...listings].reverse()
    setFilteredListings(reverseListings)
  }, [listings])

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredListings?.slice(firstPageIndex, lastPageIndex);
  }, [filteredListings, currentPage]);

  // console.log(listings)
  // console.log(filteredListings)
  // console.log(currentData)

  const [recencyFilter, setRecencyFilter] = useState('newest')
  const [priceFilter, setPriceFilter] = useState('all')

  console.log(listings)
  console.log(recencyFilter)

  const recencyOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ]

  const priceOptions = [
    { value: 'all', label: 'All' },
    { value: 'under-50', label: 'Under $50' },
    { value: '50-100', label: '$50-$100' },
    { value: '100-plus', label: '$100+' }
  ]

  const selectStyles = {
    control: (provided, state) => ({ ...provided,
      minHeight: '35px',
      height: '35px',
      width: '138px',
      border: state.isFocused ? 'solid 1px #74CD97' : 'solid 1px hsl(0, 0%, 80%)',
      boxShadow: state.isFocused ? '0 0 0 1px #74CD97' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#74CD97' : 'hsl(0, 0%, 70%)' 
      }
    }),
    dropdownIndicator: (provided, state) => ({ ...provided,
      padding: '7px'
    }),
    option: (provided, state) => ({ ...provided,                
      width: '138px',
      backgroundColor: state.isSelected ? '#74CD97' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#74CD97' : '#E1FAE6'
      },
    }),
    menu: (provided, state) => ({ ...provided,                 
      width: '138px'
    })
  };

  const onFilter = () => {
    // clone []...listings] to new let variable
    let filteringListings = [...listings]
    // reverse array if 'newest'
    if (recencyFilter === 'newest'){
      filteringListings.reverse()
    }
    // filter for price
    switch (priceFilter) {
      case 'under-50':
        filteringListings = filteringListings.filter(listing => listing.price < 50)
        break
      case '50-100':
        filteringListings = filteringListings.filter(listing => listing.price >= 50 && listing.price <= 100)
        break
      case '100-plus':
        filteringListings = filteringListings.filter(listing => listing.price > 100)
        break
      default: 
        break
    }
    // set currentPage to 1, after filter
    if (currentPage > 1) {
      setCurrentPage(1);
    }
    // setFilteredListings -- filtered array
    return setFilteredListings(filteringListings)
  }

  return (
      <>
        <div className="listings-top">
          {/* For mobile */}
          <div className="listings-top-button-container-mobile">
            <Link to='/form'>
            <button className="listings-top-button-create">
              <img src={plus} />
              Create Listing
            </button>
            </Link>
          </div>
          {/*  */}
          <div className="listings-filters">
            {/* Price filter */}
            <Select 
              options={priceOptions} 
              isSearchable={false}
              defaultValue={{ value: 'all', label: 'All' }}
              styles={selectStyles}
              value={priceOptions.find(option => option.value === priceFilter)}
              onChange={e => setPriceFilter(e.value)}
            />
            <span className="listings-filters-span" />
            {/* Recency filter */}
            <Select 
              options={recencyOptions} 
              isSearchable={false}
              defaultValue={{ value: 'newest', label: 'Newest' }}
              styles={selectStyles}
              value={recencyOptions.find(option => option.value === recencyFilter)}
              onChange={e => setRecencyFilter(e.value)}
            />
            {/* For desktop */}
            <button className="button-filter"
              onClick={() => onFilter()}
            >
              Filter
            </button>
            {/*  */}
          </div>
          {/* For desktop */}
          <div className="listings-top-button-container">
            <Link to='/form'>
            <button className="listings-top-button-create">
              <img src={plus} />
              Create Listing
            </button>
            </Link>
          </div>
          {/*  */}
          {/* For mobile */}
          <div className="listings-filter-btn-container-mobile">
            <button className="button-filter-mobile"
              onClick={() => onFilter()}
            >
              Filter
            </button>
          </div>
          {/*  */}
        </div>
        <div className="listings-count-container">
          <h3>{filteredListings?.length} Listings</h3>
        </div>

        {currentData?.length > 0
        ? (
        <>
        <div className="listings-grid">
          {currentData.map(listing =>
            <Listing listing={listing} currentPage={currentPage} />
          )}
        </div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={filteredListings?.length}
          pageSize={PageSize}
          onPageChange={(page) => {
            setCurrentPage(page)
            window.scrollTo(0, 0)
          }}
        />
        </>
        )
        :
            (
        <>
        {/* skeleton loading */}
        <div className="listings-grid">
          {/* create array from length of PageSize and map to div element */}
          {Array.from({length: PageSize}, (item, index) =>
            <div className="listing-skeleton">
              <div className="skeleton skeleton-img">
              </div>
              <div className="listing-skeleton-text">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </>
  )
}

export default ListingsPage
