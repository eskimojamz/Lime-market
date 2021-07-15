import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RightLeft from '../motionParams/RightLeft'
import RightLeftFast from '../motionParams/RightLeftFast'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import logo from '../assets/HoppangLogo.svg'
import MenuButton from './MenuButton'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const { user, logout } = useAuth0()
    const userData = JSON.parse(sessionStorage.getItem('userData'))

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
        <motion.nav 
            className="nav"
            variants={RightLeft}
            initial="hidden"
            animate="visible"
        >
            <div className="nav-left">
                <Link to='/'><img className="logo" src={logo} /></Link>
                <h1>Hoppang</h1>
            </div>

            <MenuButton menuOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />

            {menuOpen && 
            <motion.div 
                className="mobile-menu"
                variants={RightLeftFast}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                        <Link to="/profile"><button className="profile-btn-mobile">My Profile</button></Link>
                        <LogoutButton />
                    </div>
                    </>
                    )
                    : <LoginButton />
                }
            </motion.div>
            }

            <div className="nav-right-desktop">
                <Link to='/listings'><button className="listings-nav-btn">Listings</button></Link>
                <Link to='/form'><button className="sell-nav-btn button-primary">Sell Now</button></Link>
                
                {user || userData
                    ? (
                    <>
                    <img className="profile" src={userData?.picture || user?.picture} onClick={() => setProfileOpen(!profileOpen)} />
                    {profileOpen && (
                        <div className="profile-menu">
                            <h5>Signed in as: </h5>
                            <h5>{userData?.nickname}</h5>
                            <Link to="/profile">
                                <button 
                                    className="profile-btn" 
                                    onClick={localStorage.setItem('currentUser', JSON.stringify(userData))}>
                                    My Profile
                                </button>
                            </Link>
                            <LogoutButton logoutAll={logoutAll} />
                        </div>
                    )}
                    </>
                    )
                    : <LoginButton />
                }
            </div>
        </motion.nav>
        </>

    )
}

export default Navbar



