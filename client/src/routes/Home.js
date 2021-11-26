import {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import hero from '../assets/hero.png'
import pattern from '../assets/patternpad.svg'
import blob1 from '../assets/blob1.svg'
import blob2 from '../assets/blob2.svg'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getListings } from '../actions/actions'
import Listing from '../components/Listing'

const Home = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const listings = useSelector(state => state.listings)
    
    useEffect(() => {
        dispatch(getListings())
    }, [])

    return (
        <>
        {/* <img src={blob1} className="hero-blob1" />
        <img src={blob1} className="hero-blob1-filter" />
        <img src={blob2} className="hero-blob2" />
        <img src={blob2} className="hero-blob2-filter" /> */}
        <div className="hero-container">
        <div className="hero-bg-pattern">
        </div>
        <div className="hero">
            
            <motion.div 
                className="hero-mobile"
            >
                <motion.img src={hero} className="hero-img" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.25 }}
                />
            </motion.div>
            
            <div className="hero-left">
                <motion.div
                    className="hero-left-text"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.25 }}
                >
                    <h1>buy & sell</h1>
                    <h1 className="highlight">safely & affordably</h1>
                    <div className="hero-left-text-bottom">
                        <h4>Lime Market makes it easy to buy and sell items on a safe and secure platform. Powered by the Paypal payment system, users can buy and sell items with confidence.</h4>
                    </div>
                </motion.div>
                <motion.button 
                    className="button-primary hero-button" 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.25 }}
                    onClick={() => {
                        history.push('/listings')
                    }}>
                        Start Shopping
                </motion.button>
            </div>

            <motion.div 
                className="hero-right"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.25 }}
                >
                <motion.img src={hero} className="hero-img" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.25 }}
                />
            </motion.div>
        </div>
        </div>

        <motion.div className="hero-bottom"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            {/* Popular Listings */}
            <motion.div className="hero-bottom-h"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.25 }}
            >
                <h3>Recent Listings</h3>
            </motion.div>
            <div className="listings-grid">
                {listings.slice(-3).map(listing => 
                    <Listing listing={listing} />
                )}
            </div>
            <motion.button 
                className="button-primary" 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.25 }}
                onClick={() => {
                    history.push('/listings')
                }}>
                    See More
            </motion.button>
        </motion.div>
        </>
    )
}

export default Home