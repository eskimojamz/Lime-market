import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListing, likeListing, setCurrentId } from '../actions/listings';
import Tooltip from '../components/Tooltip.js';
import menu from '../assets/menu-v.svg';
import comment from '../assets/comments.svg'
import like from '../assets/like.svg'

import { motion, AnimateSharedLayout} from 'framer-motion'

const ListingInfoPage = () => {
    const { user, isAuthenticated } = useAuth0()
    const location = useLocation()
    const listing = location?.state?.listing
    const [menuOpen, setMenuOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const dispatch = useDispatch()
    const id = listing._id
    const userId = user?.sub
    const [toggle, setToggle] = useState(false)
    
    const handleEdit = () => {
        dispatch(setCurrentId(listing._id))
        setEdit(true)
    }

    const handleDelete = () => {
        dispatch(deleteListing(listing._id))
        setDeleted(true)
    }
    console.log(toggle)
    console.log(user)
    const handleLike = () => {
        if (user === undefined) {
            setToggle(true)
        }
    }

    const paypal = useRef();
    
    const product = {
        price: listing.price,
        description: listing.description,
    };

    useEffect(() => {
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
                    {/* Paypal Button */}
                </div>
                <div className="listing-info-tooltip">
                    <div className="like">
                        <button className="listing-tooltip-like p-1" onClick={handleLike}>
                            <img src={like} />
                        </button>
                        <span><h5 className="p-1">{listing.likers.length}</h5></span>
                        <Tooltip content="Please sign in to like and save items" toggle={toggle} setToggle={setToggle}/>
                    </div>
                    <div className="comment">
                    <button className="listing-tooltip-comment p-1">
                    <img src={comment} />
                    </button>
                    <span><h5 className="p-1">{listing.commentCount}</h5></span>
                    </div>
                </div>
                <div className="comments-section">

                </div>
            </div>    
       </motion.div>
       </>
    )
}

export default ListingInfoPage