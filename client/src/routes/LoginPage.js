import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginCredentials = {
        username: username,
        password: password,
    }

    const handleSubmit = (e) => {
        axios.post('http://localhost:8000/auth/', {
            username: `${loginCredentials.username}`,
            password: `${loginCredentials.password}`
        })
        .then(response => {
            sessionStorage.setItem('token', response.data.token)
            console.log(response.data.token)
        })
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

export default LoginPage
