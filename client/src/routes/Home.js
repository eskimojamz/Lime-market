import React from 'react'
import { useHistory } from 'react-router-dom'
import heroImg from '../assets/hero-img.svg'
import paypal from '../assets/paypal.svg'
import { motion } from 'framer-motion'
import DownUp from '../motionParams/DownUp'
import RightLeftSlower from '../motionParams/RightLeftSlower'

const Home = () => {
    const history = useHistory()

    return (
        <>
        
        <div className="hero">
            <motion.div 
                className="hero-mobile"
                variants={RightLeftSlower}
                initial="hidden"
                animate="visible"
                exit="exit" 
            >
                <img src={heroImg} className="hero-img" />
            </motion.div>
            
            <motion.div 
                className="hero-left"
                variants={DownUp}
                initial="hidden"
                animate="visible"
                exit="exit" 
            >
                <h1>buy & sell</h1>
                <h1 className="highlight">safely & affordably</h1>
                <p>Hoppang makes it easy to buy and sell items of all kinds on a safe and secure platform. Powered by the Paypal payment system, users can sell or purchase items with confidence.</p>
                {/* <motion.h2 
                    variants={bottomVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" 
                >Powered by</motion.h2>
                <motion.img 
                    variants={bottomVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit" 
                    src={paypal} 
                    className="hero-bottom-img" /> */}
                <button 
                    className="button-primary" 
                    onClick={() => {
                        history.push('/listings')
                    }}>
                        See Listings
                </button>
            </motion.div>

            <motion.div 
                className="hero-right"
                variants={RightLeftSlower}
                initial="hidden"
                animate="visible"
                exit="exit" 
            >
                <img src={heroImg} className="hero-img" />
            </motion.div>
        </div>

        <motion.div className="hero-bottom"
            variants={DownUp}
            initial="hidden"
            animate="visible"
            exit="exit" 
        >
            {/* Popular Listings */}
        </motion.div>
        </>
    )
}

export default Home