import React from 'react'
import ListingForm from '../components/ListingForm'

import { motion, AnimateSharedLayout} from 'framer-motion'

const FormPage = () => {

    return (
        <motion.div className="form-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
        >
            <ListingForm ></ListingForm>
        </motion.div>
    )
}

export default FormPage
