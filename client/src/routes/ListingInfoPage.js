import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListings, updateListing, deleteListing, likeListing, setCurrentListing, addComment, deleteComment, getComments, getListing, likeCount, getLikes, getUser } from '../actions/actions';
import moment from 'moment';
import Lottie from 'react-lottie-segments'
import Tooltip from '../components/Tooltip.js';
import menu from '../assets/menu-v.svg';
import deleteSvg from '../assets/delete.svg'
import like from '../assets/like.json'
import { motion } from 'framer-motion'
import { UserContext } from '../App';
import axios from 'axios'
import LoginButton from '../components/LoginButton';

const ListingInfoPage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const {currentUser, setCurrentUser} = useContext(UserContext)
    console.log(currentUser)
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch()
    const { listingId } = useParams()
    const listing = useSelector((state) => state.listing)

    // const [state, setState] = useState({
    //     likes: null,
    //     menuOpen: false,
    //     edit: false, 
    //     deleted: false, 
    //     liked: null, 
    //     isStopped: true, 
    //     toggle: false, 
    //     newComment: 
    // })
    const [likes, setLikes] = useState()
    
    
    const [menuOpen, setMenuOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const [liked, setLiked] = useState()
    const [isStopped, setIsStopped] = useState(true)
    const [listingComments, setComments] = useState()
    const [toggle, setToggle] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [deleteModalOn, setDeleteModal] = useState(false)

    const getComments = async(listingId) => {
        await axios
            .get(`http://localhost:8000/comments?listing_id=${listingId}`)
            .then(response => {
                setComments(response.data)
            })
    }

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

    const getLikes = (listingId) => {
        axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
        .then(response => {
            setLikes(response.data.like_count)
        })
    }

    const handleEdit = () => {
        dispatch(setCurrentListing(listingId))
        setEdit(true)
    }

    const handleDelete = () => {
        dispatch(deleteListing(listingId))
        setDeleted(true)
    }

    const handleComment = (e) => {
        e.preventDefault()
        dispatch(addComment(
            // comment
            {   
                creator: user.username,
                creator_img: user.profile_img,
                listing: listingId,
                content: newComment,
            },
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            } 
        ))
        setNewComment("")
        getComments(listingId)
    }

    const handleCommentDelete = async(commentId) => {
        await axios.delete(`http://localhost:8000/comments/delete/${commentId}`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )
        .then(() => {
            getComments(listingId)
            setDeleteModal(!deleteModalOn)
        })
    }

    const paypal = useRef();

    useEffect(() => {
        dispatch(getListing(listingId))
        if (user) {
            const likedBool = user?.watchlist.some(listing => listing.id === listingId.toString())
            setIsStopped(!likedBool)
            setLiked(likedBool)
        }
        getLikes(listingId)
        getComments(listingId)
    }, [])

    useEffect(() => {
        const product = {
            price: listing?.price,
            description: listing?.description,
        };

        window.paypal
            .Buttons({
            style: {
                color: 'silver',
                size: 'medium',
                layout: 'vertical',
                label: 'checkout',
            },
            createOrder: (data, actions) => {
                return actions.order.create({
                purchase_units: [
                    {
                    description: product.description,
                    amount: {
                        currency_code: "USD",
                        value: product.price
                    }
                    }
                ]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();

                console.log(order);
            },
            onError: err => {
                console.log(err);
            }
            })
            .render(paypal.current);
    }, []);
    
    return (
        <>
        { listing && 
        <motion.div className="page-wrapper"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
        >

        <Tooltip content="Please sign in to like and save listings" toggle={toggle} setToggle={setToggle}/>
            
            { deleted && <Redirect to="/listings" /> }

            {/* Listing Info */}
            <div className="listing-info">
                { (listing.creator === user?.username) &&
                <div className="listing-info-edit-menu">
                    <button className="button-menu" onClick={() => setMenuOpen(!menuOpen)} >
                        <img src={menu} />
                    </button>
                    { menuOpen &&
                    <div className="edit-menu">
                        <button className="button-menu-edit"><h5 onClick={handleEdit}>Edit</h5></button>
                        <button className="button-menu-delete"><h5 onClick={handleDelete}>Delete</h5></button>
                    </div>
                    }
                </div>
                }
                
                { edit && <Redirect to="/form" /> }
                <div className="listing-info-img">
                    <img src={listing.image1} />
                </div>
                <div className="listing-info-title">
                    <h1>{listing.title}</h1>
                </div>
                <div className="listing-info-desc">
                    <p>{listing.description}</p>
                </div>
                <div className="listing-info-bottom">
                    <div className="listing-info-price">
                        <h1>${listing.price}</h1>
                    </div>
                    <div className="listing-info-creator">
                        <div className="listing-info-creator-img">
                            
                            <img src={listing.creator_img} />
                            
                        </div>
                        <div className="listing-info-creator-name">
                            
                            <h5>{listing.creator}</h5>
                            <h4>Seller  ✓</h4>
                        </div>
                    </div>
                </div>
                <div className="listing-info-paypal" ref={paypal}>
                   {/* Paypal */}
                </div>

                <div className="listing-info-like">
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

                {/* Comments */}
                <div className="comments-section">
                    <div className="comments-show">
                        {listingComments?.map((comment, key) => {
                            const commentId = comment?.id
                            return (
                                <div key={key} className="comment-comment">
                                    {/* Delete Modal */}
                                    <div className={deleteModalOn ? "delete-modal-backdrop" : "display-none"}>
                                        <div className="delete-modal-overlay">
                                            <div>
                                                <h3>Are you sure you want to delete this comment?</h3>
                                            </div>
                                            <div className="delete-modal-overlay-bottom">
                                                <button className="delete-modal-yes" onClick={() => handleCommentDelete(commentId)} >Yes</button>
                                                <button className="button-secondary" onClick={() => setDeleteModal(false)}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ------------ */}

                                    {/* Comment delete */}
                                    {(comment?.creator === user?.username) &&
                                    <div className="comment-bottom-delete">
                                        <img 
                                            className="comment-delete-button"
                                            onClick={ () =>
                                                setDeleteModal(true)
                                            }
                                            src={deleteSvg}
                                        />
                                    </div>
                                    }

                                    <div className="comment-body">
                                        <p>{comment?.content}</p>
                                    </div>

                                    <div className="comment-bottom">
                                        <div className="comment-user">
                                            <div className="comment-pic">
                                                <Link to={`/profile/${comment?.creator}`}>
                                                    <img 
                                                        className="comment-comment-img"
                                                        src={comment?.creator_img}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="comment-name">
                                                <h6>{comment?.creator}</h6>
                                                {(comment?.creator === listing?.creator) && 
                                                    <h4>Seller  ✓</h4>
                                                }
                                            </div>
                                        </div>
                                        <div className="comment-date"><p>{moment(`${comment?.date_created}`).format('lll')}</p></div>
                                    </div>
                                </div>
                            );
                            })}
                    </div>
                    <div className="comments-input">
                        <form onSubmit={handleComment}>
                            <textarea 
                                className="input-box" 
                                placeholder={ user ? "Comments must be at least 10 characters long." : "Please sign in to comment" } 
                                value={newComment} 
                                onChange={(event) => {
                                    setNewComment(event.target.value)
                                }} 
                            />
                            { user 
                            ? 
                            ( newComment.length > 9
                                ?
                                <button 
                                    className="button-primary"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                :
                                <div className="button-primary-null">
                                    Submit
                                </div>
                            )
                            : 
                            <Link to='/login'>
                                <button 
                                    className="button-secondary"
                                >
                                    Sign-in
                                </button>
                            </Link>
                            }
                        </form>
                    </div>
                </div>
            </div>    
        </motion.div>
        }
       </>
    )
}

export default ListingInfoPage