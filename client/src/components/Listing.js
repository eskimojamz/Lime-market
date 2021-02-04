import React from 'react'

const Listing = ({listing}) => {
    console.log(listing)
    return (
        <div>
            <p>{listing.title}</p>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{new Date(listing.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{new Date(listing.createdAt).toLocaleTimeString()}</p>
            <img src={listing.selectedFile} />
        </div>
    )
}

export default Listing
