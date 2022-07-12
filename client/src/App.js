import React, { useState, useEffect, createContext } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentListing } from './actions/actions';
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
    const dispatch = useDispatch()
    const [currentUser, setCurrentUser] = useState(null)
    const [edit, setEdit] = useState(false)
    console.log(currentUser)
    console.log(edit)

    const [navBg, setNavBg] = useState(false)

    const changeNavBg = () => {
        window.scrollY >= 16 ? setNavBg(true) : setNavBg(false);
    }

    useEffect(() => {
      setCurrentUser(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    // setCurrentListing empty after leaving edit form page
    useEffect(async() => {
      if (edit && (location.pathname !== '/form')){
        console.log('left edit form')
        await dispatch(setCurrentListing([]))
        setEdit(false)
      }
    }, [location])

    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            window.removeEventListener('scroll', changeNavBg);
        }
    }, [])

  return (
      <>
        <AnimateSharedLayout>
        <motion.div className="wrapper">
          <UserContext.Provider value={{currentUser, setCurrentUser, edit, setEdit}}>
          
          <Navbar navBg={navBg}/>
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