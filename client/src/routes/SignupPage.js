import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom' 
import loginSvg from '../assets/login.svg'
import ClipLoader from 'react-spinners/ClipLoader'

function SignupPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invalidSignup, setInvalidSignup] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post('http://localhost:8000/users/create', {
            username: `${username}`,
            password: `${password}`,
        })
        await axios.post('http://localhost:8000/auth/', {
            username: `${username}`,
            password: `${password}`
        })
        .then((response) => {
            console.log(response)
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('username', username)
            history.push('/')
        })
        .catch((error) => {
            if (error) {
                // console.log(error.response)
                setInvalidSignup(true)
                // console.log(invalidLogin)
                setLoading(false)
                return
            }
        });


        // Prevent default refresh for testing
        
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
                        <h1>Join Us!</h1>
                    </div>
                    <div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label>
                                <h5>Username:</h5>
                                <input 
                                    type="text"
                                    placeholder="Minimum 6 characters" 
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
                                    placeholder="Minimum 8 characters"
                                    value={password} 
                                    onChange={e =>
                                        setPassword(e.target.value)
                                    } 
                                />
                            </label>
                            <div className='clip-loader'>
                                {invalidSignup 
                                    ? (<p className="invalid">Oops, your username and/or password is too short! Try again.</p>)
                                    : null
                                }
                                <ClipLoader color='green' loading={loading} size={15} />
                            </div>    
                                <button className="button-primary" type="submit" value="Submit">Sign-up</button>
                        </form>
                    </div>
                    <div className="login-bottom">
                        <h5>Already have an account?</h5>
                        <Link to='/login'>
                            <a>Login</a>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
        </>
    )
}

export default SignupPage
