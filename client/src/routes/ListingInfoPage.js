import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';

import { setCurrentId } from '../actions/listings';

const ListingInfoPage = () => {
    const { isAuthenticated } = useAuth0()
    const location = useLocation()
    const listing = location?.state?.listing
    console.log(listing)

    return (
        <div className="grid-12">
            <div className="listing-info">
                <div className="listing-info-img">
                    {listing.selectedFile.map(file => 
                        <img src={file.base64} />
                        )}
                </div>
                <div className="listing-info-title">
                    <h1>{listing.title}</h1>
                </div>
                <div className="listing-info-desc">
                    <h4>{listing.description}</h4>
                </div>
                <div className="listing-info-price">
                    <h1>{listing.price}</h1>
                </div>
                <div className="listing-info-creator-img">
                    <img src={listing.creatorImg} />
                    
                </div>
                <div className="listing-info-creator-name">
                    
                    <h4>Sold by {listing.creatorName}</h4>
                </div>
                <div className="listing-info-buy-btn">
                    <button className="button-primary">Buy Now</button>
                </div>
                <div className="listing-info-edit-btn">
                    <button className="button-secondary">Edit Listing</button>
                </div>
            </div>
       </div>
    )
}

export default ListingInfoPage