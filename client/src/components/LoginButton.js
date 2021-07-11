import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    
    return (
        <button className="login-btn button-secondary" onClick={() => loginWithRedirect()}>
            Sign-in
        </button>
    )
}

export default LoginButton
