const RightLeft = {
    hidden: { 
        opacity: 0,
        x: '100vw', 
    },
    visible: { 
        opacity: 1,
        x: 0, 
        transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: {
        opacity: 0,
        x: "100vw",
        transition: { duration: 0.5, ease: 'easeInOut' }
        
    }
}

export default RightLeft