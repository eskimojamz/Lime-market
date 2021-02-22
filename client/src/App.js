import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Route, Switch, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import ListingInfoPage from './routes/ListingInfoPage'
import FormPage from './routes/FormPage'
import Profile from './routes/ProfilePage'

import { useDispatch, useSelector } from 'react-redux'
import { getListings } from './actions/listings'

import { AnimatePresence } from 'framer-motion';


const App = () => {
    const dispatch = useDispatch()
    const currentId = useSelector((state) => state.currentId)
    useEffect(() => {
        dispatch(getListings())
        }, [dispatch, currentId])
    const location = useLocation()
  return (
    
      <>
        <div className="wrapper">
          <Navbar />
          <div className="container">
          <AnimatePresence exitBeforeEnter>
          
            <Switch location={location} key={location.pathname}>
              <Route path='/' exact><Home /></Route>
              <Route path='/listings'><ListingsPage /></Route>
              <Route path='/listings:id' component= {ListingInfoPage} />
              <Route path='/form' component= {FormPage} />
              <Route path='/profile' component={Profile} />
            </Switch>
          
          </AnimatePresence>
          </div>
        </div>
    </>
  )
}

export default App