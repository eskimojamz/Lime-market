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
  const PageSize = 1

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
      currentData?.length > 0 ?
        (
        <>
        <motion.div 
          className="listings-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.25 }}
        >
        {currentData.map(listing => 
          <Listing listing={listing} />
        )}
        </motion.div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={listings?.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        </>
        ) :
      <Loading />   
  )
}

export default ListingsPage
