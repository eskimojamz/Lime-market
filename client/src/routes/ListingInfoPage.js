import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateListing, deleteListing, likeListing, setCurrentId, addComment } from '../actions/listings';
import moment from 'moment';
import Tooltip from '../components/Tooltip.js';
import menu from '../assets/menu-v.svg';
import comment from '../assets/comments.svg'
import like from '../assets/like.svg'

import { motion, AnimateSharedLayout} from 'framer-motion'
import axios from 'axios';

const ListingInfoPage = () => {
    const { user, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()
    const { listingId } = useParams()
    const [listing, setListing] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const userId = user?.sub
    const userName = user?.nickname
    const userPic = user?.picture
    const listingComments = useSelector(state => state.comments.filter(comment => comment.listingId === listingId))
    const [toggle, setToggle] = useState(false)
    const [newComment, setNewComment] = useState("")
    
    const handleEdit = () => {
        dispatch(setCurrentId(listingId))
        setEdit(true)
    }

    const handleDelete = () => {
        dispatch(deleteListing(listing.Id))
        setDeleted(true)
    }
    
    const handleLike = (e) => {
        console.log('liked')
        e.preventDefault()
        if (!isAuthenticated) {
            setToggle(true)
            setTimeout(() => {
                setToggle(false)
            }, 2500);
        } else {
            dispatch(likeListing(listingId, userId))
        }
    }

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

    // const handleEditComment = (e) => {
    //     e.preventDefault()
    //     dispatch(editComment(listingId, {
    //         ...comment,
    //         body: newComment,
    //     }))
    // }

    const paypal = useRef();

    useEffect(() => {
        const getListing = async () => {
            try {
                await axios.get(`http://localhost:5000/listings/${listingId}`).then((response) => {
                    setListing(response.data)
                })
            } catch (e) {
                console.log(e)
            }
        }
        getListing()
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
    }, [listing]);

    const containerVariants = {
        hidden: { 
            opacity: 0,
            y: '100vh', 
        },
        visible: { 
            opacity: 1,
            y: 0, 
            transition: { duration: 1 }
        },
        exit: {
            x: "100vw",
            transition: { duration: 1, ease: 'easeInOut' }
        }
    }
    
    return (
        <>
        { listing && 
        <motion.div className="page-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" 
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
                    {listing.selectedFile.map(file => 
                        <img src={file.base64} />
                        )}
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
                   
                </div>
                <div className="listing-info-tooltip">
                    <div className="like">
                        <button className="listing-tooltip-like p-1" onClick={handleLike} >
                            <img src={like} />
                        </button>
                        <span><h5 className="p-1">{listing.likers.length}</h5></span>
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
                            return (
                                <div key={key} className="comment-comment">
                                    <div className="comment-body"><p>{comment.body}</p></div>
                                    <div className="comment-bottom">
                                        <div className="comment-user">
                                            <div className="comment-pic">
                                                <img src={comment.creatorImg}/>
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