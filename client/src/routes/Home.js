import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-img.svg'
import { motion, AnimateSharedLayout} from 'framer-motion'

const Home = () => {
    
    const containerVariants = {
        hidden: { 
            opacity: 0,
            y: '100vw', 
        },
        visible: { 
            opacity: 1,
            y: 0, 
            transition: { duration: 1 }
        },
        exit: {
            x: "-100vh",
            transition: { duration: 1, ease: 'easeInOut' }
            
        }
    }

    return (
        <>
        <motion.div className="hero"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" 
        >
            <div className="hero-left"
                
            >
                <h1>Buy & Sell.</h1>
                <h1>New & Used.</h1>
                <h1>Safely.</h1>
                <h1>Affordably.</h1>
                
                <Link to='/listings'>
                    <button 
                        className="button-primary"
                        
                        
                    >
                        See Listings
                    </button>
                </Link>
                
            </div>
            <div className="hero-right"
                
            >
                <img src={heroImg} className="hero-img" />
            </div>
        </motion.div>
        </>
    )
}

export default Home