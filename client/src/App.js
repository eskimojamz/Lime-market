import React, { useState, useEffect, createContext } from 'react'

import { Route, Switch, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignupPage from './routes/SignupPage'
import LoginPage from './routes/LoginPage'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import ProfilePage from './routes/ProfilePage'
import { motion, AnimateSharedLayout } from 'framer-motion'

export const UserContext = createContext(null)

const App = () => {
    const location = useLocation()
    const [currentUser, setCurrentUser] = useState(null)
    console.log(currentUser)

    useEffect(() => {
      setCurrentUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])

  return (
      <>
        <AnimateSharedLayout>
        <motion.div className="wrapper">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
          
          <Navbar />
          <motion.div className="container">
            <Switch location={location} key={location.pathname}>
              <Route path='/' exact component={Home} />
              <Route path='/register/' component={SignupPage} />
              <Route path='/login/' component={LoginPage} />
              <Route exact path='/listings' component={ListingsPage} />
              <Route path='/listings/:listingId' exact component={ListingInfoPage} />
              <Route path='/form' exact component={FormPage} />
              <Route path='/profile/:userId' component={ProfilePage} />
            </Switch>
          </motion.div>
          </UserContext.Provider>
        </motion.div>
        </AnimateSharedLayout>
    </>
  )
}

export default App