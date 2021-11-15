import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom' 
import loginSvg from '../assets/login.svg'
import ClipLoader from 'react-spinners/ClipLoader'
import { UserContext } from '../App'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [fixPassword, setFixPassword] = useState(false)
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const user = sessionStorage.getItem('user')

    const loginCredentials = {
        username: username,
        password: password,
    }

    // const fetchWatchlist = () => {
    //     // Object.keys(user.watchlist).map(key => {
    //     //     axios.get('http://localhost:8000/listings/')
    //     // })
    //     let newWatchlist = [] 
    //     for (let listing in user?.watchlist) {
    //         axios.get(`http://localhost:8000/listings/${user?.watchlist[listing]}`)
    //         .then(response => {
    //             newWatchlist.push({
    //                 id: response.data.id,
    //                 img: response.data.image1,
    //                 title: response.data.title,
    //                 price: response.data.price
    //             })
    //         })
    //     }
    //     localStorage.setItem('watchlist', newWatchlist)
    // }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        
        await axios
            .post('http://localhost:8000/auth/', {
                username: `${loginCredentials.username}`,
                password: `${loginCredentials.password}`
            })
            .then(async(response) => {
                console.log(response.data.token)
                sessionStorage.setItem('token', response.data.token)

                await axios
                    .get(`http://localhost:8000/users/view/${username}`)
                    .then((response) => {
                        console.log(response)
                        setCurrentUser(response.data)
                        sessionStorage.setItem('user', JSON.stringify(response.data))
                        console.log(currentUser)
                    })
                
                setLoading(false)
                history.goBack()
            })
            .catch((error) => {
                console.log(error)
                setInvalidLogin(true)
                // console.log(invalidLogin)
                setLoading(false)
                return
            })
    }

    return(
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
                            <div className='errors-bottom'>
                                {invalidLogin 
                                    ? (<p className="invalid">There is no account with those credentials. Try again.</p>)
                                    : null
                                }
                            </div>
                                {loading
                                ?  
                                <div className="button-secondary center-button">
                                    Log-in 
                                    <ClipLoader color='grey' loading={loading} size={15} />
                                </div>
                                :  
                                <button className="button-primary" type="submit" value="Submit">
                                    Log-in
                                </button>
                                }   
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
