import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
    const { user } = useAuth0()
    console.log(user)

    return (
        <div>
            <h1>Usedo</h1>
            <a href='/'>Home</a>
            <a href='/listings'>Listings</a>
            <a href='/profile'>Profile</a>
            <a href='/form'>Sell an item</a>
            <LoginButton />
            <LogoutButton />
                <h3>{user?.nickname}</h3>
                <img src={user?.picture} />
        </div>
    )
}

export default Navbar

