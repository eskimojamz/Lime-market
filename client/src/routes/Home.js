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
import PulseLoader from "react-spinners/PulseLoader";

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
      <motion.div
          className="hero-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.25 }}
      >
        <div className="hero-bg-1" />
        <div className="hero-bg-2" />
        <div className="hero">
          <div className="hero-left">
            <div
              className="hero-left-text"
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
            </div>
            <button
              className="hero-button"
              onClick={() => {
                history.push("/listings");
              }}
            >
              Explore
            </button>
          </div>

          <div
            className="hero-right"
          >
            <img
              src={hero}
              className="hero-img"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.25 }}
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
              <h3>Communicate with Sellers</h3>
              <p>
                Lime Market users are able to chat in real-time with sellers and buyers.
                Every listing has a fully featured comments section.
              </p>
            </div>
          </div>
          <div className="hero-bottom-card">
            <img src={cardIllustration3} />
            <div>
              <h3>Save Items for Later</h3>
              <p>
                Whenever you like like a listing, by pressing the green heart icon, items are saved in your watchlist.
                Go back and check them out anytime!
              </p>
            </div>
          </div>
        </div>
        {/* Recent Listings */}
        <div className="recent-listings">
          <div className="recent-listings-header">
            <h3>Recent Listings</h3>
          </div>
          <div className="recent-listings-grid">
            {
              listings
                ? listings.slice(-3).map((listing) => (
                <Listing listing={listing} />
              ))
                : (
                    <>
                    <PulseLoader color={'#74CDA1'}/>
                    <p>Fetching...</p>
                    </>
                  )
            }
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
