import { useState, useEffect } from 'react';
import { useDispatch, useParams, useSelector } from 'react-redux'

import Listing from '../components/Listing'

import { useAuth0 } from "@auth0/auth0-react";

import { motion, AnimateSharedLayout} from 'framer-motion'
import { setCurrentUser } from '../actions/listings';

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const listings = useSelector((state) => state.listings)
  const userListings = listings.filter(listing => listing.creator === currentUser.sub)
  console.log(currentUser)

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
    <div className="profile-info-container">
      <motion.div className="profile-info"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="profile-info-img">
          <img src={currentUser.picture} alt={currentUser.nickname} />
        </div>
        <div className="profile-info-name">
          <h2>{currentUser.nickname}</h2>
        </div>
        <div className="profile-info-listings-label">
          <h1>User Listings</h1>
        </div>
        <div className="profile-info-listings-cards">
          {userListings.map(userListing => 
            <Listing listing={userListing} />
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Profile