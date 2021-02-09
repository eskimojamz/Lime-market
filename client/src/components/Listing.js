import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentId } from '../actions/listings'

const Listing = ({listing, user}) => {
    const currentId = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            <img src={listing.selectedFile} />
            <p>{listing.title}</p>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{new Date(listing.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{new Date(listing.createdAt).toLocaleTimeString()}</p>
            {(user?.sub === listing?.creator) && (
                <button onClick={() => dispatch(setCurrentId(listing._id))}>Edit listing </button>
            )}
        </div>
    )
}

export default Listing
