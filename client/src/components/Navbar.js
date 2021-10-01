import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import MenuButton from './MenuButton'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const { user, logout } = useAuth0()
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    console.log(sessionStorage.getItem('token'))
    useEffect(() => {
        user &&
        sessionStorage.setItem('userData', JSON.stringify(user))
    }, [user])
    console.log(userData)

    const logoutAll = () => {
        sessionStorage.removeItem('userData')
        logout()
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
                {user || userData
                    ? (
                    <>
                    <div className="mobile-menu-profile">
                        <div className="mobile-menu-profile-left">
                            <img className="profile-mobile" src={userData?.picture || user?.picture} />
                        </div>
                        <div className="mobile-menu-profile-right">
                            <h5>Signed in as: </h5>
                            <h4>{userData.nickname}</h4>
                        </div>
                    </div>
                    <div className="mobile-menu-bottom-logout">
                        <Link to="/profile">
                            <button 
                                className="profile-btn-mobile" 
                                onClick={localStorage.setItem('currentUser', JSON.stringify(userData))}
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
                    <motion.button 
                        className="listings-nav-btn"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.75, duration: 0.25 }}
                        >Listings
                    </motion.button>
                </Link>
                <Link to='/form'>
                    <motion.button 
                        className="sell-nav-btn button-primary"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.25 }}
                        >Sell Now
                    </motion.button>
                </Link>
                
                {user || userData
                    ? (
                    <>
                    <motion.img 
                        className="profile" 
                        src={userData?.picture || user?.picture} 
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
                                <h5 className="bold">{userData?.nickname}</h5>
                            </div>
                            <div className="profile-menu-user-bottom">
                                <Link to="/profile">
                                    <button 
                                        className="profile-btn" 
                                        onClick={localStorage.setItem('currentUser', JSON.stringify(userData))}>
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



