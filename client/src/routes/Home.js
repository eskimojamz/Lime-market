import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import hero from "../assets/hero.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getListings } from "../actions/actions";
import Listing from "../components/Listing";
import cardIllustration1 from "../assets/cardIllustration1.svg";
import cardIllustration2 from "../assets/cardIllustration2.svg";
import cardIllustration3 from "../assets/cardIllustration3.svg";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(getListings());
  }, []);

  return (
    <div className="home-wrapper">
      {/* <img src={blob1} className="hero-blob1" />
        <img src={blob1} className="hero-blob1-filter" />
        <img src={blob2} className="hero-blob2" />
        <img src={blob2} className="hero-blob2-filter" /> */}
      <div className="hero-container">
        <div className="hero-bg-1" />
        <div className="hero-bg-2" />
        <div className="hero">
          <div className="hero-left">
            <motion.div
              className="hero-left-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.25 }}
            >
              <h1>Buy & Sell</h1>
              <h1 className="highlight">safely & affordably</h1>
              <div className="hero-left-text-bottom">
                <h4>
                  Lime Market makes it easy to buy and sell items on a safe and
                  secure platform. Powered by the Paypal payment system, users
                  can buy and sell items with confidence.
                </h4>
              </div>
            </motion.div>
            <button
              className="hero-button"
              onClick={() => {
                history.push("/listings");
              }}
            >
              Explore
            </button>
          </div>

          <motion.div
            className="hero-right"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
          >
            <motion.img
              src={hero}
              className="hero-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.25 }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-bottom"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="hero-bottom-cards">
          <div className="hero-bottom-card">
            <img src={cardIllustration1} />
            <div>
              <h3>Find Hidden Treasures</h3>
              <p>
                Goods listed on Lime Market are audited for quality. You’ll find
                the fairest prices on the web. Offerings range from clothes,
                tech and art to more!
              </p>
            </div>
          </div>
          <div className="hero-bottom-card">
            <img src={cardIllustration2} />
            <div>
              <h3>Find Hidden Treasures</h3>
              <p>
                Goods listed on Lime Market are audited for quality. You’ll find
                the fairest prices on the web. Offerings range from clothes,
                tech and art to more!
              </p>
            </div>
          </div>
          <div className="hero-bottom-card">
            <img src={cardIllustration3} />
            <div>
              <h3>Find Hidden Treasures</h3>
              <p>
                Goods listed on Lime Market are audited for quality. You’ll find
                the fairest prices on the web. Offerings range from clothes,
                tech and art to more!
              </p>
            </div>
          </div>
        </div>
        {/* Popular Listings */}
        <div className="recent-listings">
          <div className="recent-listings-header">
            <h3>Recent Listings</h3>
          </div>
          <div className="recent-listings-grid">
            {listings.slice(-3).map((listing) => (
              <Listing listing={listing} />
            ))}
          </div>
          <motion.button
            className="button-seemore"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
            onClick={() => {
              history.push("/listings");
            }}
          >
            See More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
