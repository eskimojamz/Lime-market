import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeListing, likeCount, getLikes } from '../actions/actions'
import Lottie from 'react-lottie-segments'
import like from '../assets/like.json'
import comment from '../assets/comments.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Tooltip from '../components/Tooltip.js';

const Listing = ({listing}) => {
    const dispatch = useDispatch()
    let listingId = listing.id
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    const [listingData, setListingData] = useState(listing)
    const history = useHistory()
    const [toggle, setToggle] = useState(false)
    const [likes, setLikes] = useState()
    const [liked, setLiked] = useState(false)
    const [isStopped, setIsStopped] = useState(true)
    const [loading, setLoading] = useState(true)

    const toggleLike = async() => {
        if (!liked) {
            dispatch(likeCount(listingId, 
                {
                    like_count: likes.like_count + 1
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            ))
            console.log(user?.watchlist)
            const key = Object.values(user?.watchlist).length
            console.log(key)
            let newWatchlist = user?.watchlist
            newWatchlist[key] = listingId
            dispatch(likeListing(user.username, 
                {
                    watchlist: newWatchlist
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }    
            ))

            await axios
                .get(`http://localhost:8000/users/view/${user.username}`)
                .then((response) => {
                    console.log(response)
                    sessionStorage.setItem('user', JSON.stringify(response.data))
                })
            console.log(user)
        } else if (liked) {
            dispatch(likeCount(listingId, 
                {
                    like_count: likes.like_count - 1
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            ))
            console.log(user?.watchlist)
            let arr = Object.values(user?.watchlist)
            let index = arr.indexOf(listingId)
            if (index > -1) {
                arr.splice(index, 1)
            }
            const newWatchlist = {...arr}

            dispatch(likeListing(user.username, 
                {
                    watchlist: newWatchlist
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }    
            ))

            await axios
                .get(`http://localhost:8000/users/view/${user.username}`)
                .then((response) => {
                    console.log(response)
                    sessionStorage.setItem('user', JSON.stringify(response.data))
                })
            console.log(user?.watchlist)
        }
        setIsStopped(!isStopped)
        setLiked(!liked)
    }

    // const handleLike = () => {
    //     if (userData) { 
    //         axios
    //             .patch(`http://localhost:5000/listings/${listingId}/likeListing`, userId)
    //             .then((response) => {
    //                 setListingData(response.data)
    //                 console.log('(un)liked & listing data updated')
    //             })
    //     } else {
    //         setToggle(true)
    //         setTimeout(() => {
    //             setToggle(false)
    //         }, 2500)
    //     }
    // }
    const getLikes = (listingId) => {
        axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
        .then(response => {
            setLikes(response.data.like_count)
        })
    }

    useEffect(() => {
        const likedBool = Object.values(user.watchlist).includes(listingId.toString())
        getLikes(listingId)
        setIsStopped(!likedBool)
        setLiked(!likedBool)
        setLoading(false)
    }, [])
    
    
    return (
        <>
        {(loading === false) && (
        <div className="listing">
            {/* listing image */}
            <div className="listing-img-div">
                <img src={listing.image1} />
            </div>

            {/* title, price, details btn */}
            <div className="listing-title">
                <h3>{listing.title}</h3>
            </div>
            <div className="listing-price">
                <h3>${listing.price}</h3>
            </div>
            <div className="listing-like">
                
                    <button 
                        className="listing-info-like-button"
                        onClick={user ? toggleLike : setToggle}
                    >
                        <Lottie
                            options={{
                                loop: false,
                                autoplay: false,
                                animationData: like,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }}
                            height="35px"
                            width="35px"
                            isStopped={isStopped}
                        />
                        <span className="listing-info-like-text"><h5>{likes} Likes</h5></span>
                    </button>
            </div>
            <div className="listing-btn">
                {/* <Link to={`listings/${listingId}`}> */}
                    <button className="button-primary" 
                        onClick={() => {
                        history.push(`/listings/${listingId}`)
                        }}
                    >Details</button>
                {/* </Link> */}
            </div>
        </div>
        )}
        </>
    )
}

export default Listing
