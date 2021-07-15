const RightLeft = {
    hidden: { 
        opacity: 0,
        x: '100vw', 
    },
    visible: { 
        opacity: 1,
        x: 0, 
        transition: { duration: 1.5 }
    },
    exit: {
        x: "-100vw",
        transition: { duration: 1, ease: 'easeInOut' }
        
    }
}

export default RightLeft