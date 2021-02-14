// import { useSelector } from 'react-redux'
import Listing from '../components/Listing'

import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

const ListingsPage = () => {

    
    const listings = useSelector((state) => state.listings)
    console.log("listings", listings)
       
    const { user } = useAuth0()
    

    return (
        <div className="listing-wrapper">
            
            {listings.map(listing => <Listing listing={listing} user={user}/>)}
        </div>
    )
}

export default ListingsPage
