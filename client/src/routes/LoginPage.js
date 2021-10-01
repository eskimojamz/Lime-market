import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useHistory } from 'react-router-dom' 
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
            console.log(response.data.token)
            setLoading(false)
            history.goBack()
        })
        .catch((error) => {
            if (error) {
                console.log(error.response)
                setInvalidLogin(true)
                console.log(invalidLogin)
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
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => 
                                setUsername(e.target.value)
                            } 
                        />
                    </label>
                    <ClipLoader color='green' loading={loading} size={15} />
                    <br/>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e =>
                                setPassword(e.target.value)
                            } 
                        />
                    </label>
                    <ClipLoader color='green' loading={loading} size={15} />
                    <br />
                    {invalidLogin 
                        ? (<p>There is no account with those credentials</p>)
                        : null
                    }<br/>
                        <input type="submit" value="Submit" />
                </form>
            </div>
        </motion.div>
        </>
    )
}

export default LoginPage
