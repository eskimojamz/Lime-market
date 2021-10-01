import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Route, Switch, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './routes/LoginPage'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import ProfilePage from './routes/ProfilePage'

import { useDispatch, useSelector } from 'react-redux'
import { getComments, getListings, setCurrentUser } from './actions/actions.js'

const App = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getListings())
      dispatch(getComments())
    }, [dispatch])

  return (
      <>
        <div className="wrapper">
          <Navbar />
          <div className="container">
            <Switch location={location} key={location.pathname}>
              <Route path='/' exact component={Home} />
              <Route path='/login/' component={LoginPage} />
              <Route exact path='/listings' component={ListingsPage} />
              <Route path='/listings/:listingId' exact component={ListingInfoPage} />
              <Route path='/form' exact component={FormPage} />
              <Route path='/profile/' component={ProfilePage} />
            </Switch>
          </div>
        </div>
    </>
  )
}

export default App