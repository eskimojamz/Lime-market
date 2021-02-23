import { useSelector } from 'react-redux'

import Listing from '../components/Listing'

import { useAuth0 } from "@auth0/auth0-react";

import { motion, AnimateSharedLayout} from 'framer-motion'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  const listings = useSelector((state) => state.listings)
  const userListings = listings.filter(listing => listing.creator === user?.sub)
  console.log(userListings)

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: '100vw',
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1 }
    },
    exit: {
        x: "-100vh",
        transition: { duration: 1, ease: 'easeInOut' }
    }
  };

  return (
    isAuthenticated && ( 
     <motion.div className="profile-info"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
     >
      <div className="profile-info-img">
        <img src={user.picture} alt={user.nickname} />
      </div>
      <div className="profile-info-name">
        <h2>{user.nickname}</h2>
      </div>
      <div className="profile-info-listings-label">
        <h1>My Listings</h1>
      </div>
      <div className="profile-info-listings-cards">
        {userListings.map(userListing => 
          <Listing listing={userListing} />
        )}
      </div>
    </motion.div>
    )
  )
}

export default Profile