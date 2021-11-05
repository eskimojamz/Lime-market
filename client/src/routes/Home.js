import React from 'react'
import { useHistory } from 'react-router-dom'
import heroImg from '../assets/hero-img.svg'
import { motion } from 'framer-motion'

const Home = () => {
    const history = useHistory()

    return (
        <>
        
        <div className="hero">
            <motion.div 
                className="hero-mobile"
            >
                <img src={heroImg} className="hero-img" />
            </motion.div>
            
            <div className="hero-left">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.25 }}
                >
                    <h1>buy & sell</h1>
                    <h1 className="highlight">safely & affordably</h1>
                    <p>Lime Market makes it easy to buy and sell items on a safe and secure platform.</p> <p>Powered by the Paypal payment system, users can buy and sell items with confidence.</p>
                </motion.div>
                <motion.button 
                    className="button-primary" 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.75, duration: 0.25 }}
                    onClick={() => {
                        history.push('/listings')
                    }}>
                        See Listings
                </motion.button>
            </div>

            <motion.div 
                className="hero-right"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.25 }}
                >
                <img src={heroImg} className="hero-img" />
            </motion.div>
        </div>

        <motion.div className="hero-bottom"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            {/* Popular Listings */}
        </motion.div>
        </>
    )
}

export default Home