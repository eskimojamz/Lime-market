import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListings, deleteListing, likeListing, setCurrentListing, addComment, deleteComment, getComments, getListing } from '../actions/actions';
import moment from 'moment';
import Tooltip from '../components/Tooltip.js';
import menu from '../assets/menu-v.svg';
import comment from '../assets/comments.svg'
import like from '../assets/like.svg'
import { motion } from 'framer-motion'
import axios from 'axios';

const ListingInfoPage = () => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const { listingId } = useParams()
    const listing = useSelector((state) => state.listing)
    // const [listingData, setListingData] = useState()

    useEffect(() => {
        dispatch(getListing(listingId))
    }, [])
    
    const [menuOpen, setMenuOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const userId = userData?.sub
    const userName = userData?.nickname
    const userPic = userData?.picture
    const listingComments = useSelector(state => state.comments.filter(comment => comment.listingId === listingId))
    const [toggle, setToggle] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [deleteModalOn, setDeleteModal] = useState(false)
    
    const handleEdit = () => {
        dispatch(setCurrentListing(listingId))
        setEdit(true)
    }

    const handleDelete = () => {
        dispatch(deleteListing(listingId))
        setDeleted(true)
    }
    
    // const handleLike = () => {
    //     if (userData) { 
    //         axios
    //             .patch(`http://localhost:5000/listings/${listingId}/likeListing`, userId)
    //             .then((response) => {
    //                 setListingData(response.data)
    //             })
    //     } else {
    //         setToggle(true)
    //         setTimeout(() => {
    //             setToggle(false)
    //         }, 2500)
    //     }
    // }

    const handleComment = (e) => {
        e.preventDefault()
        dispatch(addComment({  
            listingId: listingId, 
            creator: userId,
            creatorName: userName,
            creatorImg: userPic,
            body: newComment,
        }))
        setNewComment("")
    }

    const handleCommentDelete = (commentId) => {
        dispatch(deleteComment(commentId))
        window.location.reload()
    }

    const paypal = useRef();

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
            <div className="listing-info">
                { (listing.creator === user?.sub) &&
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
                            
                            <img src={listing.creatorImg} />
                            
                        </div>
                        <div className="listing-info-creator-name">
                            
                            <h5>{listing.creatorName}</h5>
                            <h4>Seller  ✓</h4>
                        </div>
                    </div>
                </div>
                <div className="listing-info-paypal" ref={paypal}>
                   {/* Paypal */}
                </div>
                <div className="listing-info-tooltip">
                    <div className="like">
                        {/* <button className="listing-tooltip-like p-1" onClick={handleLike} >
                            <img src={like} />
                        </button> */}
                        {/* <span><h5 className="p-1">{listing?.likers.length}</h5></span> */}
                        <Tooltip content="Please sign in to like and comment" toggle={toggle} setToggle={setToggle}/>
                    </div>
                    <div className="comment">
                        <button className="listing-tooltip-comment p-1">
                            <img src={comment} />
                        </button>
                        <span><h5 className="p-1">{listingComments.length}</h5></span>
                    </div>
                </div>
                <div className="comments-section">
                    <div className="comments-show">
                        {listingComments.map((comment, key) => {
                            const currentUserData = {
                                sub: comment.creator,
                                nickname: comment.creatorName,
                                picture: comment.creatorImg,
                            }
                            const commentId = comment._id
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
                                    <div className="comment-body">
                                        <p>{comment.body}</p>
                                    </div>
                                    <div className="comment-bottom">
                                        <div className="comment-user">
                                            <div className="comment-pic">
                                                <Link to={'/profile/'}>
                                                    <img 
                                                        src={comment.creatorImg} 
                                                        onClick={() => {
                                                            localStorage.setItem('currentUser', JSON.stringify(currentUserData))
                                                        }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="comment-name">
                                                <h6>{comment.creatorName}</h6>
                                                {(comment.creator === listing?.creator) && 
                                                    <h4>Seller  ✓</h4>
                                                }
                                            </div>
                                        </div>
                                        <div className="comment-date"><p>{moment(`${comment.createdAt}`).format('lll')}</p></div>
                                    </div>
                                    {(comment.creator === userId) &&
                                    <div className="comment-bottom-delete">
                                        <button 
                                            className="comment-delete-button"
                                            onClick={ () =>
                                                setDeleteModal(true)
                                            }>
                                            Delete
                                        </button>
                                    </div>
                                    }
                                </div>
                            );
                            })}
                    </div>
                    <div className="comments-input">
                        <form onSubmit={handleComment}>
                            <textarea 
                                className="input-box" 
                                placeholder="Type your comment here" 
                                value={newComment} 
                                onChange={(event) => {
                                    setNewComment(event.target.value)
                                }} 
                            />
                            <button 
                                className="button-primary"
                                type="submit"
                            >
                                Submit
                            </button>
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