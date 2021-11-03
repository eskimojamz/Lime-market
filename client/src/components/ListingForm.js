import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import priceTagSvg from '../assets/pricetag.svg'

import { createListing, updateListing, setCurrentListing } from '../actions/actions';
import axios from 'axios';

const ListingForm = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    const [listingData, setListingData] = useState({})
    const [listingImages, setListingImages] = useState({})
    console.log(listingData)
    console.log(listingImages)
    
    // const [files, setFiles] = useState({})
    // console.log(files)
    const currentListing = useSelector(state => state.currentListing)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [redirectId, setRedirectId] = useState('')
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
        if (!listingImages.image1) {
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
    // const axiosInstance = axios.create({
    //     timeout: 5000,
    //     headers: {
    //         ,
    //         Accept: '*/*',
    //     },
    // })

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', listingData.title)
        formData.append('description', listingData.description)
        formData.append('price', parseInt(listingData.price))
        for (let image in listingImages){
            formData.append(`image${parseInt(image) + 1}`, listingImages[image])
        }

        // formData.append('image1', listingImages.image1)
        // formData.append('image2', listingImages.image2)
        // formData.append('image3', listingImages.image3)
        // formData.append('image4', listingImages.image4)
        formData.append('creator', user?.username) 
        formData.append('creator_img', user?.profile_img) 
        console.log(formData)

        axios.post('http://localhost:8000/listings/create',
            formData,
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(async response => {
            console.log(response)
            setRedirectId(response.data.id.toString())
            const userListings = [...user?.listings_created, response.data]
            await axios.patch(`http://localhost:8000/users/update/${user?.username}`,
                {
                    listings_created: userListings
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            )
        })
        .then(() => {
            clear()
            console.log('thenned')
                
            setRedirect(true)
            window.location.reload()
        })
        // const isValid = validate()
        // console.log(validate())
        // if (isValid === true){
        //     if (currentListing) {
        //         dispatch(updateListing(currentListing, listingData))
        //         clear()
        //         setRedirect(true)
        //     } else {
        //         // Get user profile data for dispatch createListing
                
        //     }
        // } else {
        //     e.preventDefault()
        // }
    }

    return (
        <div className="form">
            <div className="form-top">
                <img className="form-svg-top" src={priceTagSvg}></img>
            </div>
            <div className="form-form">
                <h1>Create Listing</h1>
                { redirect && <Redirect to={`/listings/${redirectId}`} /> }
                <form>
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
                            placeholder="Price"
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
                            console.log(event.target.files)
                            if (event.target.files) {
                                // Empty array to remove previous files onchange
                                listingImages.length = 0
                                // initialize empty images object 
                                let images = {}
                                // add imgfiles to images object
                                for (let file in event.target.files) {
                                    images[file] = event.target.files[file]
                                }
                                // set listingImages state to images object from above
                                setListingImages(images)
                                console.log(listingImages)
                            }
                            
                        }}       
                    />
                    <div className="error-div">
                        {<p className="error">{errors.image}</p>}
                    </div>
                    
                    {/* Files Preview Div */}
                    { listingImages.length > 0 && (
                    <>
                    <h4>Image Preview:</h4>
                    <div className="form-files">
                        {listingImages[0] 
                            ? <img className="files-img" src={URL.createObjectURL(listingImages[0])} /> 
                            : null}
                        {listingImages[1] 
                            ? <img className="files-img" src={URL.createObjectURL(listingImages[1])} /> 
                            : null}
                        {listingImages[2] 
                            ? <img className="files-img" src={URL.createObjectURL(listingImages[2])} /> 
                            : null}
                        {listingImages[3] 
                            ? <img className="files-img" src={URL.createObjectURL(listingImages[3])} /> 
                            : null}
                    </div> 
                    </>
                    )}
                    
                    {/* <input type="file" multiple={true} onChange={(event) => setListingData({ ...listingData, selectedFile: event.target.files[0] })}></input> */}
                    
                    <button className="button-primary" type="submit" style={{marginTop: 25}} onClick={handleSubmit}>
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