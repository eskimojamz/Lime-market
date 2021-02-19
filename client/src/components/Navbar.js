import { useState } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import logo from '../assets/HoppangLogo.svg'

const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false)
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

            <div className="nav-right-desktop">
                <Link to='/listings'><button className="listings-nav-btn">Listings</button></Link>
                <Link to='/form'><button className="sell-nav-btn">Sell Now</button></Link>
                
                {isAuthenticated
                    ? (
                    <>
                    <img className="profile" src={user?.picture} onClick={() => setIsOpen(!isOpen)} />
                    {isOpen && (
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



