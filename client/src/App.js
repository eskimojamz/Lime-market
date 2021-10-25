import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Route, Switch, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignupPage from './routes/SignupPage'
import LoginPage from './routes/LoginPage'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import ProfilePage from './routes/ProfilePage'

export const UserContext = createContext(null)

const App = () => {
    const location = useLocation()
    const [currentUser, setCurrentUser] = useState(null)

  return (
      <>
        <div className="wrapper">
          <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <Navbar />
          <div className="container">
            <Switch location={location} key={location.pathname}>
              <Route path='/' exact component={Home} />
              <Route path='/register/' component={SignupPage} />
              <Route path='/login/' component={LoginPage} />
              <Route exact path='/listings' component={ListingsPage} />
              <Route path='/listings/:listingId' exact component={ListingInfoPage} />
              <Route path='/form' exact component={FormPage} />
              <Route path='/profile/' component={ProfilePage} />
            </Switch>
          </div>
          </UserContext.Provider>
        </div>
    </>
  )
}

export default App