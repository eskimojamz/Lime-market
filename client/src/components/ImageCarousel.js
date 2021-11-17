import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import left from '../assets/leftarrow.svg'
import right from '../assets/rightarrow.svg'
import { useSwipeable } from "react-swipeable";

function ImageCarousel({toggleCarousel, setToggleCarousel, currentImage, listing}) {
    const [activeIndex, setActiveIndex] = useState(currentImage)
    const listingImages = [
        listing?.image1, 
        listing?.image2,
        listing?.image3
    ]
    const listingCount = listingImages?.filter(l => l !== null).length
    console.log(listingImages)

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = listingCount - 1;
        } else if (newIndex >= listingCount) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <>
            <AnimatePresence>
            <motion.div className="carousel-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <img
                    className="carousel-arrow carousel-arrow-left"
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}
                    src={left}
                />
                <img
                    className="carousel-arrow carousel-arrow-right"
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}
                    src={right}
                />
                <motion.div className="carousel-wrapper"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.25 }} 
                    {...handlers}  
                >
                    <div 
                        className="carousel-inner"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >   
                        {listing?.image1
                            ?
                            <div className="carousel-item">
                                <img src={listing?.image1} className="carousel-img"/>
                            </div>
                            : null
                        }
                        {listing?.image2
                            ?
                            <div className="carousel-item">
                                <img src={listing?.image2} className="carousel-img"/>
                            </div>
                            : null
                        }
                        {listing?.image3
                            ?
                            <div className="carousel-item">
                                <img src={listing?.image3} className="carousel-img"/>
                            </div>
                            : null
                        }
                    </div>
                </motion.div>
                <motion.div className="carousel-pagin"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.25 }} 
                >
                    {listingImages?.filter(l => l !== null).map((l, i) => {
                        return (
                            <button
                                className={`carousel-pagin-button ${i === activeIndex ? "carousel-pagin-button-active" : ""}`}
                                onClick={() => {
                                    updateIndex(i);
                                }}
                            >
                            </button>
                        );
                    })}
                </motion.div>
                <motion.div className="carousel-close"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.25 }} 
                >
                    <button 
                        className="carousel-close-button"
                        onClick={() => setToggleCarousel(!toggleCarousel)}
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
            </AnimatePresence>
        </>
    )
}

export default ImageCarousel
