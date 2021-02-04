import { useSelector } from 'react-redux'

import Listing from '../components/Listing'

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  const listings = useSelector((state) => state.listings)
  const userListings = listings.filter(listing => listing.creator === user?.sub)
  console.log(userListings)

  return (
    isAuthenticated && ( 
     <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {userListings.map(userListing => 
          <Listing listing={userListing} />
        )}
      </div>
    )
  )
}

export default Profile