import { Link } from 'react-router-dom'

const LoginButton = () => {
    
    return (
        <Link to='/login'>
            <button className="login-btn button-secondary">
                Sign-in
            </button>
        </Link>
    )
}

export default LoginButton
