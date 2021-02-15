import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentId } from '../actions/listings'

const Listing = ({listing, user}) => {
    const id = listing._id
    const dispatch = useDispatch()

    return (
        
            <div className="listing">
                <div className="listing-img-div">
                    <img src={listing.selectedFile[0].base64} />
                </div>
                <div className="listing-body">
                    <h3>{listing.title}</h3>
                    <p>{listing.description}</p>   
                </div>
                
                    <div className="listing-price">
                        <h3>{listing.price}</h3>
                    </div>
                    <div className="listing-btn">
                        <Link 
                            to={{
                                pathname: `/listings:${id}`,
                                state: {listing}
                            }}>
                            <button className="button-primary">See More</button>
                        </Link>
                    </div>
                    {/* {(user?.sub === listing?.creator) && (
                        <button onClick={() => dispatch(setCurrentId(listing._id))}>Edit listing </button>
                    )} */}
                
            </div>
        /* <p>{new Date(listing.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>{new Date(listing.createdAt).toLocaleTimeString()}</p> */
    )
}

export default Listing
