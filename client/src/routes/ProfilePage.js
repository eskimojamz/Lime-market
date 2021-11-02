import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Listing from '../components/Listing'

import { motion, AnimateSharedLayout} from 'framer-motion'
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams()
  const [userImg, setUserImg] = useState('')
  const [userListings, setUserListings] = useState([])

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

  useEffect(() => {
    axios.get(`http://localhost:8000/users/view/${userId}`)
      .then(response => {
        console.log(response)
        setUserImg(response.data.profile_img)
      })
  }, [])

  return (
    <div className="profile-info-container">
      <motion.div className="profile-info"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="profile-info-img">
          <img src={userImg} alt={userId} />
        </div>
        <div className="profile-info-name">
          <h2>{userId}</h2>
        </div>
        <div className="profile-info-listings-label">
          <h1>User Listings</h1>
        </div>
        <div className="profile-info-listings-cards">
          {userListings.map(userListing => 
            <Listing listing={userListing} />
          )}
          { (userListings.length === 0) && 
            <p>No listings yet!</p>
          }
        </div>
      </motion.div>
    </div>
  )
}

export default Profile