const DownUp = {
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
        x: "-100vw",
        transition: { duration: 1, ease: 'easeInOut' }
        
    }
}

export default DownUp