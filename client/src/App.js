import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './routes/Home'
import ListingsPage from './routes/ListingsPage'
import FormPage from './routes/FormPage'
import Profile from './routes/ProfilePage'

import { getListings } from './actions/listings'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getListings())
    }, [dispatch])

  return (
    <div>
      
      <Navbar />

      <BrowserRouter>
        <Route path='/' exact='true' component={Home} />
        <Route path='/listings' component={ListingsPage} />
        <Route path='/form' component={FormPage} />
        <Route path='/profile' component={Profile} />
      </BrowserRouter>
    </div>
  )
}

export default App
