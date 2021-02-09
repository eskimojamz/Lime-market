import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { user } = useAuth0()
    console.log(user)

    return (
        <div>
            <h1>Usedo</h1>
            
            <Link to='/'>Home</Link>
            <Link to='/listings'>Listings</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/form'>Sell an item</Link>
           
            <LoginButton />
            <LogoutButton />
                <h3>{user?.nickname}</h3>
                <img src={user?.picture} />
        </div>
    )
}

export default Navbar

