import {useState, useEffect} from 'react'
import ListingForm from '../components/ListingForm'

import { motion } from 'framer-motion'
import PropagateLoader from "react-spinners/PropagateLoader";
import { useHistory } from 'react-router';

const FormPage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const history = useHistory()
    const [redirectOn, toggleRedirect] = useState(false)
    const redirectToLogin = () => {
        setTimeout(() => {
            history.push('/login')
        }, 2500)
    }

    useEffect(() => {
        !user &&
        setTimeout(() => {
            toggleRedirect(true)
        }, 2500)
    }, [])

    return (
        <>
        {
            redirectOn && 
            (
            <>
            <div className="login-modal-listingform-backdrop">
                <div className="login-modal-listingform">
                    <h6>
                        You need to be logged in to create a listing!
                    <br />
                    <br />
                        Redirecting to login page...
                    </h6>
                    <br />
                    
                        <PropagateLoader color='#A5E9C0' loading={true} size={15} />
                    <br />
                    


                    {redirectToLogin()}
                </div>
            </div>
            </>
            )
        }
        <motion.div className="form-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
        >
            <ListingForm ></ListingForm>
        </motion.div>
        </>
    )
}

export default FormPage
