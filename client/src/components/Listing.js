import {useEffect, useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie-segments'
import like from '../assets/like.json'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Tooltip from '../components/Tooltip.js';
import { UserContext } from '../App'

const Listing = ({listing, currentPage}) => {
    const listingId = listing.id.toString()
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    console.log(currentUser)
    const token = sessionStorage.getItem('token')
    const history = useHistory()
    // const likedBool = currentUser?.watchlist.some(listing => listing.id === listingId.toString())
    // console.log(likedBool)
    const [toggleTooltip, setToggleTooltip] = useState(false)
    const [likes, setLikes] = useState()
    const [liked, setLiked] = useState()
    const [isStopped, setIsStopped] = useState(true)
    console.log(listing)
    const toggleLike = () => {
        if (!liked) {
            axios.patch(`http://localhost:8000/listings/${listingId}/like`, 
                {
                    like_count: likes + 1
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            )
            .then(() => {
                console.log(user?.watchlist)
                let newWatchlist = Object.values(user?.watchlist)
                const index = newWatchlist.length
                newWatchlist[index] = {
                    id: listingId,
                    img: listing.image1,
                    title: listing.title,
                    price: listing.price
                }
                return axios.patch(`http://localhost:8000/users/update/${user.username}`, 
                    {
                        watchlist: newWatchlist
                    },
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }    
                )
            })
            .then(() => {
                return axios.get(`http://localhost:8000/users/view/${user.username}`)
                    .then((response) => {
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                        setCurrentUser(response.data)
                        getLikes(listingId)
                    })
            })
            .then(() => {
                return axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
                    .then(response => {
                        setLikes(response.data.like_count)
                        setIsStopped(!isStopped)
                        setLiked(!liked)
                    })
            })
        } else if (liked) {
            axios.patch(`http://localhost:8000/listings/${listingId}/like`, 
                {
                    like_count: likes - 1
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            )
            .then(() => {
                const newWatchlist = user?.watchlist
                const index = newWatchlist.findIndex(l => l.id == listingId.toString())
                if (index > -1) {
                    newWatchlist.splice(index, 1)
                }
                return axios.patch(`http://localhost:8000/users/update/${user.username}`, 
                    {
                        watchlist: newWatchlist
                    },
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }    
                )
            })
            .then(() => {
                return axios.get(`http://localhost:8000/users/view/${user.username}`)
                    .then((response) => {
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                        setCurrentUser(response.data)
                    })
            })
            .then(() => {
                return axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
                    .then(response => {
                        setLikes(response.data.like_count)
                        setIsStopped(!isStopped)
                        setLiked(!liked)
                    })
            })
        }
    }

    const getLikes = (listing_id) => {
        axios.get(`http://localhost:8000/listings/${listing_id}/likeCount`)
        .then(response => {
            setLikes(response.data.like_count)
        })
    }

    useEffect(() => {
        getLikes(listingId)
        if (user) {
            const likedBool = user?.watchlist.some(listing => listing.id === listingId.toString())
            setIsStopped(!likedBool)
            setLiked(likedBool)
        }
    }, [currentUser, currentPage])
    
    
    return (
        <>
        
        <motion.div 
            className="listing"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
        >
            {/* listing image */}
            <div className="listing-img-div">
                <img src={listing.image1} 
                    onClick={() => {
                        history.push(`/listings/${listingId}`)
                        }}/>
            </div>

            {/* title, price, details btn */}
            <div className="listing-title">
                <h3>{listing.title}</h3>
            </div>
            <div className="listing-price">
                <h2>${listing.price}</h2>
            </div>
            <div className="listing-like">
                <button 
                    className="listing-info-like-button"
                    onClick={user ? toggleLike : setToggleTooltip}
                >
                    <span 
                        className="listing-info-like-heart"
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
                            height="30px"
                            width="30px"
                            isStopped={isStopped}
                        />
                    </span>
                    <span className="listing-info-like-text"><h5>{likes} Likes</h5></span>
                </button>
            </div>
            <div className="listing-btn">
                {/* <Link to={`listings/${listingId}`}> */}
                    <button className="button-details button-primary" 
                        onClick={() => {
                        history.push(`/listings/${listingId}`)
                        }}
                    >Details</button>
                {/* </Link> */}
            </div>
        </motion.div>
        
        </>
    )
}

export default Listing
