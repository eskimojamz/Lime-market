import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom"
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentId } from '../actions/listings';
import menu from '../assets/menu-v.svg';



const ListingInfoPage = () => {
    const { user, isAuthenticated } = useAuth0()
    const location = useLocation()
    const listing = location?.state?.listing
    const [menuOpen, setMenuOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    
    const handleEdit = () => {
        dispatch(setCurrentId(listing._id))
        setEdit(true)
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

    return (
        <div className="page-wrapper">
            <div className="listing-info">
                { (listing.creator === user?.sub) &&
                <div className="listing-info-edit-menu">
                    <button className="button-menu" onClick={() => setMenuOpen(!menuOpen)} >
                        <img src={menu} />
                    </button>
                    { menuOpen &&
                    <div className="edit-menu">
                        <button className="button-menu-edit"><h5 onClick={handleEdit}>Edit</h5></button>
                        <button className="button-menu-delete"><h5>Delete</h5></button>
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
                
            </div>
       </div>
    )
}

export default ListingInfoPage