import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import ProfilePage from './routes/ProfilePage'

import { useDispatch, useSelector } from 'react-redux'
import { getComments, getListings, setCurrentUser } from './actions/listings'

import { AnimatePresence } from 'framer-motion';


const App = () => {
    const dispatch = useDispatch()
    const currentListing = useSelector((state) => state.currentListing)

    useEffect(() => {
      dispatch(getListings())
      dispatch(getComments())
    }, [dispatch, currentListing])

    // useEffect(() => {
    //   const data = localStorage.getItem('currentUser')
    //   data && dispatch(setCurrentUser(JSON.parse(data)))
    // }, [currentUser])

  return (
      <>
      <Router>
        <div className="wrapper">
          <Navbar />
          <div className="container">
          <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route exact path='/listings' component={ListingsPage} />
                <Route path='/listings/:listingId' exact component={ListingInfoPage} />
                <Route path='/form' exact component={FormPage} />
                <Route path='/profile/' component={ProfilePage} />
              </Switch>
          </AnimatePresence>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App