import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function SignupPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        axios.post('http://localhost:8000/users/create', {
            username: `${username}`,
            password: `${password}`
        })
        .then(response => {
            console.log(response)
            return axios.post('http://localhost:8000/auth/', {
                username: `${username}`,
                password: `${password}`
            })
        })
        .then(response => {
            console.log(response)
            sessionStorage.setItem('token', response.data.token)
            console.log(sessionStorage.getItem('token'))
        })
        // Prevent default refresh for testing
        e.preventDefault()
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
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                        <input type="submit" value="Submit" />
                </form>
            </div>
        </motion.div>
        </>
    )
}

export default SignupPage
