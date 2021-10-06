import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { useAuth0 } from '@auth0/auth0-react'


import { createListing, updateListing, setCurrentListing } from '../actions/actions';

const ListingForm = () => {
    const { user } = useAuth0()
    
    const [listingData, setListingData] = useState({ 
        title: '', 
        description: '', 
        price: '', 
        // image1: null,
        // image2: null,
        // image3: null,
        // image4: null,
    })
    console.log(listingData)
    const [files, setFiles] = useState({
        // file1: null,
        // file2: null,
        // file3: null,
        // file4: null
    })
    console.log(files)
    const currentListing = useSelector(state => state.currentListing)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [redirectId, setRedirectId] = useState(null)
    const listing = useSelector(state => state.listings.find(l => l._id === currentListing))
    const reader = new FileReader()

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
            </label>
            <div className="form-input">
                <input className="form-title-input" type="text" value={listingData.title} onChange={(e) => setListingData({ ...listingData, title: e.target.value })} />
            </div>
            
            <label>
                <h4>Price:</h4>
            </label>
            <div className="form-input">
                <h2>$</h2>
                <input type="text" value={listingData.price} onChange={(e) => setListingData({ ...listingData, price: e.target.value })} />
            </div>
            

            <label>
                <h4>Description:</h4>
            </label>
            <textarea className="form-desc-textarea" value={listingData.description} onChange={(e) => setListingData({ ...listingData, description: e.target.value })}/>
            
            <label for="files">
                <h4>Images:</h4>
            </label>
            <input className="file-input" 
                type="file"
                id="files" name="files"
                accept="image/png, image/jpeg"
                multiple
                onChange={(event) => {
                    setListingData({ ...listingData, 
                        image1: event.target.files[0],
                        image2: event.target.files[1],
                        image3: event.target.files[2],
                        image4: event.target.files[3],
                    })
                    setFiles({
                        // file1: reader.readAsDataURL(event.target.files[0]),
                        // file2: reader.readAsDataURL(event.target.files[1]),
                        // file3: reader.readAsDataURL(event.target.files[2]),
                        // file4: reader.readAsDataURL(event.target.files[3]),
                    })
                }}       
            />
            <img src={files.file1} />
            <img src={files.file2} />
            <img src={files.file3} />
            <img src={files.file4} />
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