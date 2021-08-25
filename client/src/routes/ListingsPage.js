// import { useSelector } from 'react-redux'
import Listing from '../components/Listing'
import Loading from '../components/Loading'

import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

import { motion} from 'framer-motion'

const ListingsPage = () => {
  const listings = useSelector((state) => state.listings)
      
  const { user } = useAuth0()

  return (
      listings ?
        (
        <motion.div 
          className="listings-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.25 }}
        >
        {listings.map(listing => <Listing listing={listing} user={user}/>)}
        </motion.div>
        ) :
      <Loading />   
  )
}

export default ListingsPage
