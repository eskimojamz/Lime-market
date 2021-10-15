import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom' 
import loginSvg from '../assets/login.svg'
import ClipLoader from 'react-spinners/ClipLoader'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [fixPassword, setFixPassword] = useState(false)
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const loginCredentials = {
        username: username,
        password: password,
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('http://localhost:8000/auth/', {
            username: `${loginCredentials.username}`,
            password: `${loginCredentials.password}`
        })
        .then((response) => {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('username', username)
            // console.log(response.data.token)
            setLoading(false)
            history.goBack()
        })
        .catch((error) => {
            if (error) {
                // console.log(error.response)
                setInvalidLogin(true)
                // console.log(invalidLogin)
                setLoading(false)
                return
            }
        });
        // Prevent default refresh for testing
        // e.preventDefault()
    }

    return (
        <>
        <motion.div className="page-wrapper"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
        >
            <div className="login-div">
                <div className="login-bg">
                    <img src={loginSvg} className="login-svg" />
                </div>
                <div className="login-form-div">
                    <div className="login-form-title">
                        <h1>Welcome Back!</h1>
                    </div>
                    <div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label>
                                <h5>Username:</h5>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={e => 
                                        setUsername(e.target.value)
                                    } 
                                />
                            </label>
                            <label>
                                <h5>Password:</h5>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={e =>
                                        setPassword(e.target.value)
                                    } 
                                />
                            </label>
                            <div className='clip-loader'>
                                {invalidLogin 
                                    ? (<p className="invalid">There is no account with those credentials. Try again.</p>)
                                    : null
                                }
                                <ClipLoader color='green' loading={loading} size={15} />
                            </div>    
                                <button className="button-primary" type="submit" value="Submit">Log-in</button>
                                
                                    
                                
                        </form>
                    </div>
                    <div className="login-bottom">
                        <h5>New Here?</h5>
                        <Link to='/register'>
                            <a>Create an account</a>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
        </>
    )
}

export default LoginPage
