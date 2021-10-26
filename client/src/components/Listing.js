import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Lottie from 'react-lottie-segments'
import like from '../assets/like.json'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Tooltip from '../components/Tooltip.js';

const Listing = ({listing}) => {
    let listingId = listing.id.toString()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    const history = useHistory()
    const [toggle, setToggle] = useState(false)
    const [likes, setLikes] = useState()
    const [liked, setLiked] = useState(false)
    const [isStopped, setIsStopped] = useState(true)
    const [loading, setLoading] = useState(true)

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
                const key = Object.values(user?.watchlist).length
                console.log(key)
                let newWatchlist = user?.watchlist
                newWatchlist[key] = listingId
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
                console.log(user?.watchlist)
                let arr = Object.values(user?.watchlist)
                console.log(arr)
                let index = arr.indexOf(listingId)
                console.log(index)
                if (index > -1) {
                    arr.splice(index, 1)
                }
                const newWatchlist = {...arr}
                console.log(newWatchlist)
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

    const getLikes = (listingId) => {
        axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
        .then(response => {
            setLikes(response.data.like_count)
        })
    }

    useEffect(() => {
        if (user) {
            const likedBool = Object.values(user?.watchlist).includes(listingId.toString())
            setIsStopped(!likedBool)
            setLiked(likedBool)
        }
        getLikes(listingId)
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
