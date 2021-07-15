const RightLeftSlower = {
    hidden: { 
        opacity: 0,
        x: '100vw', 
    },
    visible: { 
        opacity: 1,
        x: 0, 
        transition: { duration: 2 }
    },
    exit: {
        x: "-100vw",
        transition: { duration: 1, ease: 'easeInOut' }
        
    }
}

export default RightLeftSlower