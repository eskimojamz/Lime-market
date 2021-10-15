import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import priceTagSvg from '../assets/pricetag.svg'

import { createListing, updateListing, setCurrentListing } from '../actions/actions';

const ListingForm = () => {
    const { user } = useAuth0()
    
    const [listingData, setListingData] = useState({ 
        title: '', 
        description: '', 
        price: '0', 
        // image1: null,
        // image2: null,
        // image3: null,
        // image4: null,
    })
    console.log(listingData)
    const [files, setFiles] = useState([])
    const currentListing = useSelector(state => state.currentListing)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [redirectId, setRedirectId] = useState(null)
    const listing = useSelector(state => state.listings.find(l => l._id === currentListing))
    const [errors, setErrors] = useState({
        title: '',
        price: '',
        description: '',
        image: ''
    })
    console.log(errors)
    // useEffect(() => {
    //     currentListing && 
    //     setRedirectId(currentListing)
    //     setListingData({ ...listingData, title: listing?.title, description: listing?.description, price: listing?.price, selectedFile: listing?.selectedFile })
    // }, [currentListing])

    const clear = () => {
        dispatch(setCurrentListing(null))
        setListingData({ title: '', description: '', price: '', selectedFile: '' })
    }
    
    const validate = () => {
        // Error checks
        let titleError = null
        let priceError = null
        let descriptionError = null
        let imageError = null

        if (listingData.title.length < 5) {
            titleError = 'Title must be at least 5 characters long'
        }
        if (parseInt(listingData.price) < 1) {
            priceError = 'Price must be at least $1 (dollar)'
        }
        if (listingData.description.length < 10 | listingData.description.length > 100) {
            descriptionError = 'Description must be between 10 and 100 characters long'
        }
        if (!listingData.image1) {
            imageError = 'At least one image must be uploaded'
        }
        if (titleError || priceError || descriptionError || imageError) {
            setErrors({
                title: titleError,
                price: priceError,
                description: descriptionError, 
                image: imageError
            })
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        const isValid = validate()
        console.log(validate())
        if (isValid === true){
            if (currentListing) {
                dispatch(updateListing(currentListing, listingData))
                clear()
                setRedirect(true)
            } else {
                // Get user profile data for dispatch createListing
                dispatch(createListing({...listingData, creator: user?.sub, creatorName: user?.nickname, creatorImg: user?.picture }))
                clear()
                setRedirect(true)
            }
        } else {
            e.preventDefault()
        }
    }

    return (
        <div className="form">
            <div className="form-top">
                <img className="form-svg-top" src={priceTagSvg}></img>
            </div>
            <div className="form-form">
                <h1>Create Listing</h1>
                { redirect && <Redirect to={`/listings`} /> }
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <label for="title">
                        <h4>Title:</h4>
                    </label>
                    <input className="form-title-input" 
                        id="title" name="title"
                        type="text" 
                        value={listingData.title} 
                        onChange={(e) => 
                            setListingData({ ...listingData, 
                                title: e.target.value 
                            })} 
                    />
                    <div className="error-div">
                        {<p className="error">{errors.title}</p>}
                    </div>

                    {/* Price */}
                    <label for="price">
                        <h4>Price:</h4>
                    </label>
                    <div className="form-input">
                        <h2>$</h2>
                        <input className="form-price-input"
                            id="price" name="price"
                            type="text" 
                            value={listingData.price} 
                            onChange={(e) => setListingData({ ...listingData, 
                                price: e.target.value 
                            })} 
                        />
                    </div>
                    <div className="error-div">
                        {<p className="error">{errors.price}</p>}
                    </div>
                
                    {/* Description */}
                    <label for="description">
                        <h4>Description:</h4>
                    </label>
                    <textarea className="form-desc-textarea" 
                        id="description" name="description"
                        value={listingData.description} 
                        onChange={(e) => setListingData({ ...listingData, 
                            description: e.target.value 
                        })}
                    />
                    <div className="error-div">
                        {<p className="error">{errors.description}</p>}
                    </div>
                    
                    {/* Image File Upload */}
                    <label for="files">
                        <h4>Images:</h4>
                    </label>
                    <input className="file-input" 
                        type="file"
                        id="files" name="files"
                        accept="image/png, image/jpeg"
                        multiple
                        onChange={(event) => {
                            if (event.target.files) {
                                setListingData({ ...listingData, 
                                    image1: event.target.files[0],
                                    image2: event.target.files[1],
                                    image3: event.target.files[2],
                                    image4: event.target.files[3],
                                })

                                // Empty array to remove previous files onchange
                                files.length = 0
                                
                                // For every file, create & push the img url to files array state
                                for (let file of event.target.files) {
                                    files.push(URL.createObjectURL(file))
                                }
                            }
                            
                        }}       
                    />
                    <div className="error-div">
                        {<p className="error">{errors.image}</p>}
                    </div>
                    
                    {/* Files Preview Div */}
                    { files.length > 0 && (
                    <>
                    <h4>Image Preview:</h4>
                    <div className="form-files">
                        {files[0] 
                            ? <img className="files-img" src={files[0]} /> 
                            : null}
                        {files[1] 
                            ? <img className="files-img" src={files[1]} /> 
                            : null}
                        {files[2] 
                            ? <img className="files-img" src={files[2]} /> 
                            : null}
                        {files[3] 
                            ? <img className="files-img" src={files[3]} /> 
                            : null}
                    </div> 
                    </>
                    )}
                    
                    {/* <input type="file" multiple={true} onChange={(event) => setListingData({ ...listingData, selectedFile: event.target.files[0] })}></input> */}
                    
                    <button className="button-primary" type="submit" style={{marginTop: 25}}>
                    Submit
                    </button>
                </form> 
            </div>
            <div className="form-bg">
                <img className="form-svg" src={priceTagSvg}></img>
            </div>
        </div>
    )
}

export default ListingForm