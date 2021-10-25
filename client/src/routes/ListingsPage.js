import { useEffect } from 'react'
import Listing from '../components/Listing'
import Loading from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'

import { motion} from 'framer-motion'
import { getListings } from '../actions/actions'


const ListingsPage = () => {
  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings)
  console.log(listings)

  useEffect(() => {
    dispatch(getListings())
  }, [])

  return (
      listings ?
        (
        <motion.div 
          className="listings-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.25 }}
        >
        {listings.map(listing => <Listing listing={listing} />)}
        </motion.div>
        ) :
      <Loading />   
  )
}

export default ListingsPage
