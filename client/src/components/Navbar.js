import { useState } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import logo from '../assets/HoppangLogo.svg'
import MenuButton from './MenuButton'

const Navbar = () => {
    const[menuOpen, setMenuOpen] = useState(false)
    const[profileOpen, setProfileOpen] = useState(false)
    const { user, isAuthenticated } = useAuth0()
    console.log(user)

    const Nav = (props) => {
        return (
        <nav className="nav">
            {props.children}
        </nav>
        )
    }

    const ProfileMenu = () => {
        return (
        <div className="profile-menu">
            <h5>Signed in as: </h5>
            <h5>{user.nickname}</h5>
            <Link to="/profile"><button className="profile-btn">My Profile</button></Link>
            <LogoutButton />
        </div>
        )
    }

    return (
        <>
        <Nav>
            <div className="nav-left">
                <Link to='/'><img className="logo" src={logo} /></Link>
                <h1>Hoppang</h1>
            </div>

            <MenuButton menuOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />

            {menuOpen && 
            <div className="mobile-menu">
                <div className="mobile-menu-top">
                <Link to='/listings'><button className="listings-nav-btn-mobile">Listings</button></Link>
                <Link to='/form'><button className="sell-nav-btn-mobile">Sell Now</button></Link>
                </div>
                {isAuthenticated
                    ? (
                    <>
                    <div className="mobile-menu-profile">
                        <div className="mobile-menu-profile-left">
                            <img className="profile-mobile" src={user?.picture} />
                        </div>
                        <div className="mobile-menu-profile-right">
                            <h5>Signed in as: </h5>
                            <h4>{user.nickname}</h4>
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
                
            </div>
            }

            <div className="nav-right-desktop">
                <Link to='/listings'><button className="listings-nav-btn">Listings</button></Link>
                <Link to='/form'><button className="sell-nav-btn">Sell Now</button></Link>
                
                {isAuthenticated
                    ? (
                    <>
                    <img className="profile" src={user?.picture} onClick={() => setProfileOpen(!profileOpen)} />
                    {profileOpen && (
                    <ProfileMenu>
                    </ProfileMenu>)}
                    </>
                    )
                    : <LoginButton />
                }
            </div>
        </Nav>
        </>

    )
}

export default Navbar



