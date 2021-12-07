import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Listing from '../components/Listing'

import { motion, AnimateSharedLayout} from 'framer-motion'
import axios from 'axios';

const Profile = () => {
  const api = 'https://lime-market-backend.herokuapp.com'
  const { userId } = useParams()
  const [userImg, setUserImg] = useState('')
  const [userListings, setUserListings] = useState([])

  useEffect(() => {
    axios.get(`${api}/users/view/${userId}`)
      .then(response => {
        console.log(response)
        setUserImg(response.data.profile_img)
        setUserListings(response.data.listings_created)
      })
  }, [])

  return (
    <div className="profile-info-container">
      <motion.div className="profile-info"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.25 }}
      >
        <div className="profile-info-bg">
          <div className="profile-info-img">
            <img src={userImg} alt={userId} />
          </div>
          <div className="profile-info-name">
            <h2>{userId}</h2>
            <h5>Member since 2021</h5>
          </div>
        </div>
        <div className="profile-info-bottom">
          <div className="profile-info-listings-label">
            <h2>I'm selling:</h2>
          </div>
          <div className="profile-info-listings-cards">
            {userListings.map(userListing => 
              <Listing listing={userListing} />
            )}
            { (userListings.length === 0) && 
              <p>No listings yet!</p>
            }
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile