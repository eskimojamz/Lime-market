import { useSelector } from 'react-redux'

import Listing from '../components/Listing'
  
const ListingsPage = () => {
    const listings = useSelector((state) => state.listings)
    console.log(listings)

    return (
        <div>
            {listings.map(listing => <Listing listing={listing}/>)}
        </div>
    )
}

export default ListingsPage
