import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentListing, addComment, getListing } from '../actions/actions';
import Lottie from 'react-lottie-segments'
import Tooltip from '../components/Tooltip.js';
import menu from '../assets/menu-v.svg';
import deleteSvg from '../assets/delete.svg'
import like from '../assets/like.json'
import loginBtnSvg from "../assets/loginbtn.svg"
import { motion, AnimateSharedLayout } from 'framer-motion'
import { UserContext } from '../App';
import axios from 'axios'
import LoginButton from '../components/LoginButton';
import EditMenuBackdrop from '../components/EditMenuBackdrop';
import ImageCarousel from '../components/ImageCarousel';
import { formatDistance } from 'date-fns'

const ListingInfoPage = () => {
    const api = 'https://lime-market-backend.herokuapp.com'
    const user = JSON.parse(sessionStorage.getItem('user'))
    const {
        currentUser, 
        setCurrentUser, 
        edit, 
        setEdit
    } = useContext(UserContext)
    // console.log(currentUser)
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch()
    const { listingId } = useParams()
    const listing = useSelector((state) => state.listing)
    // console.log(listing)
    const listingDate = listing?.created_at
    const [currentImage, setCurrentImage] = useState(null)
    const [likes, setLikes] = useState()
    
    const [toggleCarousel, setToggleCarousel] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleTooltip, setToggleTooltip] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const [liked, setLiked] = useState()
    const [isStopped, setIsStopped] = useState(true)
    const [listingComments, setComments] = useState()
    const [newComment, setNewComment] = useState("")
    const [deleteModalOn, setDeleteModal] = useState(false)

    const getComments = async(listingId) => {
        await axios
            .get(`${api}/comments?listing_id=${listingId}`)
            .then(response => {
                setComments(response.data)
            })
    }

    const toggleLike = () => {
        if (!liked) {
            axios.patch(`${api}/listings/${listingId}/like`, 
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
                    id: listingId
                }
                return axios.patch(`${api}/users/update/${user.username}`, 
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
                return axios.get(`${api}/users/view/${user.username}`)
                    .then((response) => {
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                        setCurrentUser(response.data)
                        getLikes(listingId)
                    })
            })
            .then(() => {
                return axios.get(`${api}/listings/${listingId}/likeCount`)
                    .then(response => {
                        setLikes(response.data.like_count)
                        setIsStopped(!isStopped)
                        setLiked(!liked)
                    })
            })
        } else if (liked) {
            axios.patch(`${api}/listings/${listingId}/like`, 
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

                return axios.patch(`${api}/users/update/${user.username}`, 
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
                return axios.get(`${api}/users/view/${user.username}`)
                    .then((response) => {
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                        setCurrentUser(response.data)
                    })
            })
            .then(() => {
                return axios.get(`${api}/listings/${listingId}/likeCount`)
                    .then(response => {
                        setLikes(response.data.like_count)
                        setIsStopped(!isStopped)
                        setLiked(!liked)
                    })
            })
        }
    }

    const getLikes = (listingId) => {
        axios.get(`${api}/listings/${listingId}/likeCount`)
        .then(response => {
            setLikes(response.data.like_count)
        })
        .catch((error) => {
            console.log(error)
            setLikes(0)
        })
    }

    const handleEdit = () => {
        dispatch(setCurrentListing(listing))
        setEdit(true)
    }

    const handleDelete = async() => {
        await axios.delete(`${api}/listings/delete/${listingId}`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        ).then(async() => {
            const newList = user?.listings_created.filter(l => l.id !== parseInt(listingId))

            await axios.patch(`${api}/users/update/${user.username}`,
                {
                    listings_created: newList
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            ).then(() => {
                setDeleted(true)
            })
        })
        
    }

    const handleImage = (index) => {
        setCurrentImage(index)
        setToggleCarousel(true)
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
        setComments([...listingComments])
    }

    const handleCommentDelete = async(commentId) => {
        await axios.delete(`${api}/comments/delete/${commentId}`,
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
    }, [currentUser])

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
        
            { deleted && <Redirect to="/listings" /> }

            {/* Toggles */}
            <Tooltip content="Please sign-in to like and save listings" toggleTooltip={toggleTooltip} setToggleTooltip={setToggleTooltip} />
            <EditMenuBackdrop toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {toggleCarousel 
                ?
                <ImageCarousel 
                    toggleCarousel={toggleCarousel} 
                    setToggleCarousel={setToggleCarousel}
                    currentImage={currentImage} 
                    listing={listing}
                />
                : 
                null
            }
                {/*  */}

            {/* Listing Info */}
            <div className="listing-info">
                { (listing?.creator === user?.username) &&
                <div className="listing-info-edit-menu">
                    {/* Toggle EditMenu */}
                    <button className={`button-menu ${toggleMenu && "button-menu-active"}`} onClick={() => setToggleMenu(!toggleMenu)} >
                        <img src={menu} />
                    </button>
                    
                    <div className={`edit-menu ${toggleMenu && "edit-menu-open"}`}>
                        <button className="button-menu-edit" onClick={handleEdit}><h5 >Edit</h5></button>
                        <button className="button-menu-delete" onClick={handleDelete}><h5>Delete</h5></button>
                    </div>
                    
                </div>
                }
                
                { edit && <Redirect to="/form" /> }
                <div className="listing-info-img">
                    <img src={listing?.image1} onClick={() => handleImage(0)}/>
                    <div className="listing-info-img-small">
                        <div className={`${listing?.image2 ? "listing-info-img-small-col-1" : "display-none"}`}>
                            {listing?.image2 && <img src={listing?.image2} onClick={() => handleImage(1)}/>}
                            {listing?.image3 
                                ? 
                                <img src={listing?.image3} onClick={() => handleImage(2)}/>
                                : 
                                <img src="https://limemarketstatic.s3.us-west-1.amazonaws.com/media/patternpad.jpeg" />
                            }        
                        </div>
                    </div>
                </div>
                <div className="listing-info-title">
                    <h2>{listing?.title}</h2>
                </div>
                <div className="listing-info-desc">
                    <p>{listing?.description}</p>
                </div>
                <div className="listing-info-bottom">
                    <div className="listing-info-price">
                        <h1>${listing?.price}</h1>
                    </div>
                    <div className="listing-info-creator">
                        <div className="listing-info-creator-img">
                            <Link to={`/profile/${listing?.creator}`}>
                                <img src={listing?.creator_img} />
                            </Link>
                        </div>
                        <div className="listing-info-creator-name">
                            <Link to={`/profile/${listing?.creator}`}>
                                <h5>{listing?.creator}</h5>
                            </Link>
                            <span className="listing-info-seller-check">
                                <h4>Seller  ✓</h4>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="listing-info-paypal" ref={paypal}>
                   {/* Paypal */}
                </div>

                <div className="listing-info-like-created">
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
                    <div className="listing-info-created-date">
                        <h5>Created { listingDate ? formatDistance(new Date(listingDate), new Date(), { addSuffix: true }) : null}</h5>
                    </div>
                </div>

                {/* Comments */}
                <div className="comments-section">
                    <div className="comments-show">
                        {listingComments?.map((comment, key) => {
                            const commentId = comment?.id
                            return (
                                <div key={key} className="comment-comment">
                                    {/* Delete Modal */}
                                    {deleteModalOn &&
                                    <motion.div className="delete-modal-backdrop" onClick={() => setDeleteModal(!deleteModalOn)}>
                                        <motion.div className="delete-modal-overlay"
                                            initial={{opacity: 0, scale: 0}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{duration: 0.2}}
                                            exit={{opacity: 0, scale: 0}}
                                        >
                                            <motion.div>
                                                <h3>Are you sure you want to delete this comment?</h3>
                                            </motion.div>
                                            <motion.div className="delete-modal-overlay-bottom">
                                                <button className="delete-modal-yes" onClick={() => handleCommentDelete(commentId)} >Yes</button>
                                                <button className="button-secondary" onClick={() => setDeleteModal(false)}>No</button>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                    }
                                    {/* ------------ */}

                                    {/* Comment delete */}
                                    {(comment?.creator === user?.username) &&
                                    <div className="comment-top-delete">
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
                                                <Link to={`/profile/${comment?.creator}`}>
                                                    <h6>{comment?.creator}</h6>
                                                </Link>
                                                {(comment?.creator === listing?.creator) && 
                                                    <h4>Seller  ✓</h4>
                                                }
                                            </div>
                                        </div>
                                        <div className="comment-date"><h6>{formatDistance(new Date(comment?.date_created), new Date(), { addSuffix: true })}</h6></div>
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
                                    className="login-btn login-btn-listing-info"
                                >
                                    <img className="login-btn-svg" src={loginBtnSvg} />
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