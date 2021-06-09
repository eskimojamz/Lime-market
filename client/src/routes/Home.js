import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-img.svg'
import paypal from '../assets/paypal.svg'
import { motion, AnimateSharedLayout} from 'framer-motion'

const Home = () => {
    
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
            x: "-100vw",
            transition: { duration: 1, ease: 'easeInOut' }
            
        }
    }

    const bottomVariants = {
        hidden: { 
            opacity: 0,
            x: '100vw', 
        },
        visible: { 
            opacity: 1,
            x: 0, 
            transition: { duration: 1.5 }
        },
        exit: {
            x: "-100vw",
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
            <div className="hero-left">
                <h1>buy & sell</h1>
                <h1 className="highlight">safely & affordably</h1>
                <p>Hoppang makes it easy to buy and sell items of all kinds on a safe and secure platform. Powered by the Paypal payment system, users can list their items for sale and purchase items with confidence.</p>
                <Link to='/listings'>
                    <button 
                        className="button-primary"
                        
                        
                    >
                        See Listings
                    </button>
                </Link>
            </div>
            <div className="hero-right">
                <img src={heroImg} className="hero-img" />
            </div>
        </motion.div>
        <div className="hero-bottom">
        <motion.div className="paypal-div"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" 
        >
            <motion.h2 
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
                className="hero-bottom-img" />
        </motion.div>
        </div>
        </>
    )
}

export default Home