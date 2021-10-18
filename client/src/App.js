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

import { useDispatch, useSelector } from 'react-redux'
import { getComments, getListings, setCurrentUser } from './actions/actions.js'

export const UserContext = createContext(null)

const App = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [user, setUser] = useState()

    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem('user'))
      setUser(userData)
    }, [user])

    useEffect(() => {
      dispatch(getListings())
      dispatch(getComments())
    }, [dispatch])

  return (
      <>
        <div className="wrapper">
          <UserContext.Provider value={{user, setUser}}>
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