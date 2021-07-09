import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import Profile from './routes/ProfilePage'

import { useDispatch, useSelector } from 'react-redux'
import { getComments, getListings } from './actions/listings'

import { AnimatePresence } from 'framer-motion';


const App = () => {
    const dispatch = useDispatch()
    const currentId = useSelector((state) => state.currentId)
    useEffect(() => {
        dispatch(getListings())
        dispatch(getComments())
    }, [dispatch, currentId])
  return (
      <>
        <div className="wrapper">
          <Navbar />
          <div className="container">
          <AnimatePresence exitBeforeEnter>
            <Router>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/listings' exact component={ListingsPage} />
                <Route path='/listings/:listingId' exact component={ListingInfoPage} />
                <Route path='/form' exact component={FormPage} />
                <Route path='/profile' exact component={Profile} />
              </Switch>
            </Router>
          </AnimatePresence>
          </div>
        </div>
    </>
  )
}

export default App