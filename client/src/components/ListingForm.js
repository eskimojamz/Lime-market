import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { useAuth0 } from '@auth0/auth0-react'


import { createListing } from '../actions/listings';

const ListingForm = () => {
    const { user } = useAuth0()
    console.log(user)
    const [listingData, setListingData] = useState({ title: '', description: '', price: '', selectedFile: '' })
    const dispatch = useDispatch()

    const clear = () => {
        setListingData({ title: '', description: '', price: '', selectedFile: '' })
    }
    
    const handleSubmit = async (e) => {
        // e.preventDefault()
        dispatch(createListing({...listingData, creator: user?.sub}))
        clear()
    }
    console.log(listingData)

    const multipleFiles = []

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
        </Form> 
    )
}

export default ListingForm