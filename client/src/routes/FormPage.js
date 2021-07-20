import React from 'react'
import ListingForm from '../components/ListingForm'

import { motion, AnimateSharedLayout} from 'framer-motion'

const FormPage = () => {
    const containerVariants = {
        hidden: { 
          opacity: 0, 
          y: '100vh',
        },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 1 }
        },
        exit: {
            x: "100vw",
            transition: { duration: 1, ease: 'easeInOut' }
        }
    };

    return (
        <motion.div className="form-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <ListingForm ></ListingForm>
        </motion.div>
    )
}

export default FormPage
