import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { useAuth0 } from '@auth0/auth0-react'


import { createListing, updateListing, setCurrentListing } from '../actions/listings';

const ListingForm = () => {
    const { user } = useAuth0()
    
    const [listingData, setListingData] = useState({ title: '', description: '', price: '', selectedFile: '', likeCount: 0, commentCount: 0, comments: [] })
    const currentListing = useSelector(state => state.currentListing)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [redirectId, setRedirectId] = useState(null)
    const listing = useSelector(state => state.listings.find(l => l._id === currentListing))
    
    useEffect(() => {
        currentListing && 
        setRedirectId(currentListing)
        setListingData({ ...listingData, title: listing?.title, description: listing?.description, price: listing?.price, selectedFile: listing?.selectedFile })
    }, [currentListing])

    const clear = () => {
        dispatch(setCurrentListing(null))
        setListingData({ title: '', description: '', price: '', selectedFile: '' })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentListing) {
            dispatch(updateListing(currentListing, listingData))
            clear()
            console.log(redirectId)
            setRedirect(true)
        } else {
            dispatch(createListing({...listingData, creator: user?.sub, creatorName: user?.nickname, creatorImg: user?.picture }))
            clear()
            setRedirect(true)
        }
    }

    return (
        <div className="form">
        <h3>Create Listing</h3>
        { redirect && <Redirect to={`/listings`} /> }
        <form onSubmit={handleSubmit}>
            <label>
                <h4>Title:</h4>
                <input type="text" value={listingData.title} onChange={(e) => setListingData({ ...listingData, title: e.target.value })} />
            </label>

            <label>
                <h4>Price:</h4>
                <input type="text" placeholder="$" value={listingData.price} onChange={(e) => setListingData({ ...listingData, price: e.target.value })} />
            </label>

            <label>
                <h4>Description:</h4>
                <textarea value={listingData.description} onChange={(e) => setListingData({ ...listingData, description: e.target.value })}/>
            </label>

            <label className="file-input">
                <h4>Images:</h4>
            <FileBase 
                type="file" 
                multiple={true} 
                onDone={base64 => setListingData({ ...listingData, selectedFile: base64 })}
            />
            </label>
            {/* <input type="file" multiple={true} onChange={(event) => setListingData({ ...listingData, selectedFile: event.target.files[0] })}></input> */}
            <br />
            <br />
            <button className="button-primary" type="submit" >
            Submit
            </button>
        </form> 
        </div>
    )
}

export default ListingForm