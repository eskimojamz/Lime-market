import { useState, useEffect, useMemo, useContext } from 'react'
import Pagination from '../pagination/Pagination'
import Listing from '../components/Listing'
import Loading from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { motion} from 'framer-motion'
import { getListings } from '../actions/actions'
import { fetchListings } from '../api/api'

import plus from '../assets/plus.svg'

const ListingsPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const listings = useSelector(state => state.listings)
  const [currentPage, setCurrentPage] = useState(1)
  const PageSize = 6

  useEffect(() => {
    dispatch(getListings())
  }, [])

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listings?.slice(firstPageIndex, lastPageIndex);
  }, [listings, currentPage]);

  console.log(listings)
  console.log(currentData)

  

  return (
      currentData?.length > 0
        ? (
        <>
        <div className="listings-top">
          <div className="listings-filters">
            <select name="recent" id="recent">
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
            <select name="price" id="price">
              <option value="All">Price</option>
              <option value="Under $50">Under $50</option>
              <option value="Oldest">Oldest</option>
            </select>
            <button className="button-filter">
              Filter
            </button>
          </div>
          <div className="listings-top-button-container">
            <button className="listings-top-button-create">
              <img src={plus} />
              Create Listing
            </button>
          </div>
        </div>
        <div className="listings-count-container">
          <h3>{listings?.length} Listings</h3>
        </div>
        <div className="listings-grid">
          {currentData.reverse().map(listing => 
            <Listing listing={listing} currentPage={currentPage} />
          )}
        </div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={listings?.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        </>
        )
        : (
        <>
        {/* skeleton loading */}
        <div className="listings-grid">
          {/* create array from length of PageSize and map to div element */}
          {Array.from({length: PageSize}, (item, index) =>
            <div className="listing-skeleton">
              <div className="listing-img-div skeleton skeleton-img">
              </div>
              <div className="listing-skeleton-text">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          )}
        </div>
        </>
        )  
  )
}

export default ListingsPage
