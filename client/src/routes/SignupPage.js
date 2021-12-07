import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom' 
import signup from '../assets/signup.svg'
import ClipLoader from 'react-spinners/ClipLoader'
import { UserContext } from '../App'

function SignupPage() {
    const api = 'https://lime-market-backend.herokuapp.com'
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profile_img, setImg] = useState()
    const defaultImg = 'https://limemarketstatic.s3.amazonaws.com/media/defaultprofileimg.svg'
    const [invalidSignup, setInvalidSignup] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const validate = () => {
        let usernameError = false 
        let passwordError = false

        if (username.length < 6) { 
            usernameError = true
        }
        if (password.length < 8) { 
            passwordError = true
        }

        if (usernameError || passwordError) {
            setInvalidSignup(true)
            setLoading(false)
            return
          }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        validate()

        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("profile_img", profile_img);

        await axios
            .post(`${api}/users/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async(response) => {
                setCurrentUser(response.data)
                sessionStorage.setItem('user', JSON.stringify(response.data))
                
                await axios
                    .post(`${api}/auth/`, {
                        username: `${username}`,
                        password: `${password}`
                    }).then((response) => {
                        sessionStorage.setItem('token', response.data.token)
                        
                        setLoading(false)
                        history.push('/')
                        })
                    })
            .catch((error) => {
                    // console.log(error.response)
                    setInvalidSignup(true)
                    // console.log(invalidLogin)
                    setLoading(false)
                    return
            });
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
                    <img src={signup} className="login-svg" />
                </div>
                <div className="login-form-div">
                    <div className="login-form-title">
                        <h1>Join Us!</h1>
                    </div>
                    <div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="login-form-profile">
                                <img src={profile_img ? URL.createObjectURL(profile_img) : defaultImg} className="login-form-profile-img" />
                                <label for="profile-img-input">
                                    <div className="login-form-profile-img-btn">
                                        Upload Image
                                    </div>
                                </label>
                                <input 
                                    className="login-form-input-file"
                                    id="profile-img-input"
                                    type="file"
                                    onChange={event => {
                                        if (event.target.files) {
                                            console.log(event.target.files)
                                            // set profile img to state
                                            setImg(event.target.files[0])
                                          }
                                    }} 
                                />
                            </div>
                            <div className="login-form-text-fields">
                                <label>
                                    <h5 className="login-form-first-h5">Username:</h5>
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
                            </div>
                            
                                <div className='errors-bottom'>
                                {invalidSignup
                                    ?
                                    <p className="invalid">Username and/or password is too short!</p>
                                    : null
                                }
                                </div>

                            {loading
                                ?  
                                <div className="button-secondary button-secondary-signup center-button">
                                    Creating Account... 
                                    <ClipLoader color='grey' loading={loading} size={15} />
                                </div>
                                :
                                <button className="login-form-submit-btn" type="submit" value="Submit">
                                    Sign-up
                                </button>
                            }
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
