import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import FormPage from './routes/FormPage'
import Profile from './routes/ProfilePage'

import { useDispatch, useSelector } from 'react-redux'
import { getListings } from './actions/listings'


const App = () => {
    const dispatch = useDispatch()
    const currentId = useSelector((state) => state.currentId)
    useEffect(() => {
        dispatch(getListings())
        }, [dispatch, currentId])
  return (
    
      <BrowserRouter>
        
          <Navbar />
          
            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/listings' render={() => <ListingsPage />} />
              <Route path='/form' render={() => <FormPage />} />
              <Route path='/profile' component={Profile} />
            </Switch>
          
        
      </BrowserRouter>
    
  )
}

export default App