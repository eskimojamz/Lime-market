import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import MenuButton from './MenuButton'
import { UserContext } from '../App'

const Navbar = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    
    console.log('user', user)

    const logoutAll = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        setCurrentUser(null)
        window.location.reload()
    }

    return (
        <>
        <nav className="nav-container">
        <div className="nav">
            <div 
                className="nav-left"
                >
                <Link to='/'>
                    <motion.img 
                        className="logo" 
                        src={logo} 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.25 }}
                        >
                    </motion.img>
                </Link>
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.25 }}
                    >
                    Lime Market
                </motion.h1>
            </div>

            <MenuButton menuOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />

            {menuOpen && 
            <motion.div 
                className="mobile-menu"
                // variants={RightLeftFast}
                // initial="hidden"
                // animate="visible"
                // exit="exit"
            >
                <div className="mobile-menu-top">
                <Link to='/listings'><button className="listings-nav-btn-mobile">Listings</button></Link>
                <Link to='/form'><button className="sell-nav-btn-mobile">Sell Now</button></Link>
                </div>
                {user || currentUser
                    ? (
                    <>
                    <div className="mobile-menu-profile">
                        <div className="mobile-menu-profile-left">
                            <img className="profile-mobile" src={currentUser?.profile_img || user?.profile_img} />
                        </div>
                        <div className="mobile-menu-profile-right">
                            <h5>Signed in as: </h5>
                            <h4>{currentUser?.username || user?.username}</h4>
                        </div>
                    </div>
                    <div className="mobile-menu-bottom-logout">
                        <Link to="/profile">
                            <button 
                                className="profile-btn-mobile"
                                >My Profile
                            </button>
                        </Link>
                        <LogoutButton logoutAll={logoutAll} />
                    </div>
                    <div className="mobile-menu-liked">
                        <h2>Liked Items</h2>

                    </div>
                    </>
                    )
                    : <LoginButton />
                }
            </motion.div>
            }

            <div className="nav-right-desktop">
                <Link to='/listings'>
                    <button className="listings-nav-btn">
                        Listings
                    </button>
                </Link>
                <Link to='/form'>
                    <button className="sell-nav-btn">
                        Sell Now
                    </button>
                </Link>
                
                {user || currentUser
                    ? (
                    <>
                    <motion.img 
                        className="profile" 
                        src={currentUser?.profile_img || user?.profile_img} 
                        onClick={() => setProfileOpen(!profileOpen)} 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.25, duration: 0.25 }}
                        >
                    </motion.img>
                    {profileOpen && (
                        <motion.div 
                            className="profile-menu"
                            // variants={RightLeft}
                            // initial="hidden"
                            // animate="visible"
                            // exit="exit"
                            >
                            <div className="profile-menu-user-top">
                                <h5>Signed in as:</h5>
                                <h5 className="bold">{currentUser?.username || user?.username}</h5>
                            </div>
                            <div className="profile-menu-user-bottom">
                                <Link to="/profile">
                                    <button 
                                        className="profile-btn"
                                    >
                                        My Profile
                                    </button>
                                </Link>
                                <LogoutButton logoutAll={logoutAll} />
                            </div>
                            <div className="profile-menu-liked">
                                <h2>Liked Items</h2>

                            </div>
                        </motion.div>
                    )}
                    </>
                    )
                    : <LoginButton />
                }
            </div>
        </div>
        </nav>
        </>

    )
}

export default Navbar



