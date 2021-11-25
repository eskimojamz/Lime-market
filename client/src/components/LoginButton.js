import { Link } from 'react-router-dom'
import loginBtnSvg from "../assets/loginbtn.svg"

const LoginButton = () => {
    
    return (
        <Link to='/login'>
            <button className="login-btn">
                <img className="login-btn-svg" src={loginBtnSvg} />
                Sign-in
            </button>
        </Link>
    )
}

export default LoginButton
