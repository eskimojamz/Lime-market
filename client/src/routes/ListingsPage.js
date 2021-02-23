// import { useSelector } from 'react-redux'
import Listing from '../components/Listing'

import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

import { motion, AnimateSharedLayout} from 'framer-motion'

const ListingsPage = () => {

    
    const listings = useSelector((state) => state.listings)
    console.log("listings", listings)
       
    const { user } = useAuth0()
    
    const containerVariants = {
        hidden: { 
          opacity: 0, 
          y: '100vh',
        },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 1 }
        },
        exit: {
            x: "-100vw",
            transition: { duration: 1, ease: 'easeInOut' }
        }
    };

    return (
        
            <motion.div className="listings-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            {listings.map(listing => <Listing listing={listing} user={user}/>)}
            </motion.div>
       
    )
}

export default ListingsPage
