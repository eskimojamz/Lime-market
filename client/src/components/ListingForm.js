import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useAuth0 } from '@auth0/auth0-react'


import { createListing, updateListing, setCurrentId } from '../actions/listings';

const ListingForm = () => {
    const { user } = useAuth0()
    console.log(user)
    
    const [listingData, setListingData] = useState({ title: '', description: '', price: '', selectedFile: '' })
    const currentId = useSelector(state => state.currentId)
    const currentListing = useSelector(state => currentId ? state.listings.find(listing => listing._id === currentId) : null)
    const dispatch = useDispatch()
    console.log(currentId)
    useEffect(() => {
        if(currentListing) setListingData(currentListing)
    }, [currentListing])

    const clear = () => {
        dispatch(setCurrentId(null))
        setListingData({ title: '', description: '', price: '', selectedFile: '' })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (currentId === null) {
            dispatch(createListing({...listingData, creator: user?.sub}))
            clear()
        } else {
            dispatch(updateListing(currentId, { ...listingData }))
            clear()
        }
        
    }
    console.log(listingData)

    return (
        
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter title" value={listingData.title} onChange={(e) => setListingData({ ...listingData, title: e.target.value })} />
            </Form.Group>
        
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="description" placeholder="Enter Description" value={listingData.description} onChange={(e) => setListingData({ ...listingData, description: e.target.value })}/>
            </Form.Group>
            
            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="description" placeholder="Enter Price" value={listingData.price} onChange={(e) => setListingData({ ...listingData, price: e.target.value })} />
            </Form.Group>

            <FileBase 
                type="file" 
                multiple={true} 
                onDone={base64 => setListingData({ ...listingData, selectedFile: base64 })}
            />
            {/* <input type="file" multiple={true} onChange={(event) => setListingData({ ...listingData, selectedFile: event.target.files[0] })}></input> */}
            <Button variant="primary" type="submit" >
            Submit
            </Button>
            <h1>{currentId}</h1>
        </Form> 
    )
}

export default ListingForm