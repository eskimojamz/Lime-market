import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeListing } from '../actions/listings'
import comment from '../assets/comments.svg'
import like from '../assets/like.svg'

const Listing = ({listing, user}) => {
    const listingId = listing._id
    const userId = user?.sub
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLike = () => {

        dispatch(likeListing(listingId, userId))
    }
    console.log(listing)
    console.log(user)
    return (
        <div className="listing">
            <div className="listing-img-div">
                <img src={listing.selectedFile[0].base64} />
            </div>
            <div className="listing-tooltip">
                
                    <button className="listing-tooltip-like p-1" onClick={handleLike}>
                        <img src={like} />
                    </button>
                    <span><h5 className="p-1">{listing.likers.length}</h5></span>
                
                
                    <button className="listing-tooltip-comment p-1">
                    <img src={comment} />
                    </button>
                    <span><h5 className="p-1">{listing.commentCount}</h5></span>
                
            </div>
            <div className="listing-title">
                <h3>{listing.title}</h3>
            </div>
            <div className="listing-price">
                <h3>${listing.price}</h3>
            </div>
            <div className="listing-btn">
                <button className="button-primary" onClick={() => {
                    history.push(`/listings/${listingId}`)
                }}>Details</button>
            </div>
        </div>
    )
}

export default Listing
