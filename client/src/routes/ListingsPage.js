import { useState, useEffect, useMemo } from 'react'
import Pagination from '../pagination/Pagination'
import Listing from '../components/Listing'
import Loading from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'

import { motion} from 'framer-motion'
import { getListings } from '../actions/actions'
import { fetchListings } from '../api/api'

const ListingsPage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const PageSize = 6

  useEffect(() => {
    fetchListings().then(response => setListings(response.data))
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
        <div className="listings-grid">
          {currentData.map(listing => 
            <Listing listing={listing} />
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
