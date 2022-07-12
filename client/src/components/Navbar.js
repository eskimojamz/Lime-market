import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import loginBtnSvg from "../assets/loginbtn.svg";
import deleteSvg from "../assets/delete.svg";
import goSvg from "../assets/go.svg";
import sidebarCloseSvg from "../assets/rightarrow2.svg";
import cart from "../assets/cart.svg";
import MenuButton from "./MenuButton";
import { UserContext } from "../App";
import axios from "axios";

const Navbar = ({navBg}) => {
  const api = "https://lime-market-backend.herokuapp.com";
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(currentUser);
  const [profileOpen, setProfileOpen] = useState(false);

  console.log("user", user);

  const logoutAll = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <>
      <nav className="nav-container"
           style={{
             backgroundColor: navBg ? 'rgba(247, 252, 248, 1)' : 'transparent',
             borderBottom: navBg ? '1px solid #E8E8E8' : 'none'
           }}>
        <div className="nav">
          <div className="nav-left">
            <Link to="/">
              <motion.img
                className="logo"
                src={logo}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.25 }}
              ></motion.img>
            </Link>
            <Link to="/">
              <h2>Lime Market</h2>
            </Link>
          </div>

          {profileOpen && (
            <motion.div
              className="mobile-menu-backdrop"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {/*  */}
            </motion.div>
          )}

          <AnimatePresence>
            {/* {profileOpen && ( */}
            <motion.div
              layout
              className={`mobile-menu ${profileOpen && "open"}`}
              // initial={{x: 20, opacity: 0 }}
              // animate={{x: 0, opacity: 1 }}
              // transition={{bounce: 0}}
              // exit={{x: 20, opacity: 0}}
            >
              <motion.div className="mobile-menu-top">
                <Link to="/listings">
                  <motion.button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="listings-nav-btn-mobile"
                  >
                    Listings
                  </motion.button>
                </Link>
                <motion.span className="span-mobile-menu" />
                <Link to="/form">
                  <motion.button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="sell-nav-btn-mobile"
                  >
                    Sell Now
                  </motion.button>
                </Link>
                <span className="span-mobile-menu" />
              </motion.div>
              {user || currentUser ? (
                <>
                  <motion.div className="mobile-menu-profile">
                    <motion.div className="mobile-menu-profile-left">
                      <img
                        className="profile-mobile"
                        src={currentUser?.profile_img || user?.profile_img}
                      />
                    </motion.div>
                    <motion.div className="mobile-menu-profile-right">
                      <h5>Signed in as: </h5>
                      <h4>{currentUser?.username || user?.username}</h4>
                    </motion.div>
                  </motion.div>

                  <motion.div className="mobile-menu-bottom-logout">
                    <Link
                      className="mobile-menu-profile-link"
                      to={`/profile/${user?.username}`}
                    >
                      <button
                        className="profile-btn-mobile"
                        onClick={() => setProfileOpen(!profileOpen)}
                      >
                        My Profile
                      </button>
                    </Link>
                    <LogoutButton logoutAll={logoutAll} />
                  </motion.div>
                  <span className="span-mobile-menu" />

                  <motion.div className="mobile-menu-liked">
                    <motion.div className="watchlist-h">
                      <h2>My Watchlist</h2>
                    </motion.div>
                    <motion.div layout className="watchlist-items">
                      {currentUser?.watchlist.map((listing) => {
                        return (
                          <WatchlistListing
                            listing={listing}
                            profileOpen={profileOpen}
                            setProfileOpen={setProfileOpen}
                          />
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      className="login-btn mobile-menu-login"
                      onClick={() => setProfileOpen(!profileOpen)}
                    >
                      <img className="login-btn-svg" src={loginBtnSvg} />
                      Sign-in
                    </button>
                  </Link>
                </>
              )}
            </motion.div>
            {/* )} */}
          </AnimatePresence>

          <div className="nav-right-desktop">
            <Link to="/listings">
              <button className="listings-nav-btn">Listings</button>
            </Link>
            <Link to="/form">
              <button className="sell-nav-btn">Sell Now</button>
            </Link>

            {user || currentUser ? (
              <>
                <motion.img
                  className="profile"
                  src={currentUser?.profile_img || user?.profile_img}
                  onClick={() => setProfileOpen(!profileOpen)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.25, duration: 0.25 }}
                ></motion.img>

                <div className={`profile-menu ${profileOpen && "open"}`}>
                  <div className="profile-menu-close">
                    <img
                      className="profile-menu-close-btn"
                      src={sidebarCloseSvg}
                      onClick={() => setProfileOpen(!profileOpen)}
                    />
                  </div>
                  <div className="profile-menu-user-top">
                    <h5>Signed in as:</h5>
                    <h5 className="bold">
                      {currentUser?.username || user?.username}
                    </h5>
                  </div>
                  <div className="profile-menu-user-bottom">
                    <Link to={`/profile/${currentUser?.username}`}>
                      <button className="profile-btn">My Profile</button>
                    </Link>
                    <LogoutButton logoutAll={logoutAll} />
                  </div>
                  <div className="profile-menu-watchlist">
                    <div className="watchlist-h">
                      <h2>My Watchlist</h2>
                    </div>
                    <motion.div layout className="watchlist-items">
                      {currentUser?.watchlist.length > 0 &&
                        currentUser?.watchlist.map((listing) => {
                          return (
                            <WatchlistListing
                              listing={listing}
                              profileOpen={profileOpen}
                              setProfileOpen={setProfileOpen}
                            />
                          );
                        })}
                    </motion.div>
                  </div>
                </div>
              </>
            ) : (
              <LoginButton />
            )}
          </div>
          <MenuButton
            profileOpen={profileOpen}
            toggle={() => setProfileOpen(!profileOpen)}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

function WatchlistListing({ listing, profileOpen, setProfileOpen }) {
  const api = "https://lime-market-backend.herokuapp.com";
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = sessionStorage.getItem("token");

  const [removeOpen, setRemoveOpen] = useState(false);
  const listingId = listing.id;
  const [listingData, setListingData] = useState();
  console.log(listingId);
  const [likes, setLikes] = useState();

  const toggleRemove = () => setRemoveOpen(!removeOpen);

  const remove = () => {
    axios
      .patch(
        `${api}/listings/${listingId}/like`,
        {
          like_count: likes - 1,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        const newWatchlist = currentUser?.watchlist;
        const index = newWatchlist.findIndex(
          (l) => l.id == listingId.toString()
        );
        if (index > -1) {
          newWatchlist.splice(index, 1);
        }
        console.log(newWatchlist);

        return axios.patch(
          `${api}/users/update/${currentUser?.username}`,
          {
            watchlist: newWatchlist,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      })
      .then(() => {
        return axios
          .get(`${api}/users/view/${currentUser?.username}`)
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            setCurrentUser(response.data);
          });
      });
    // .then(() => {
    //   return axios
    //     .get(`${api}/listings/${listingId}/likeCount`)
    //     .then((response) => {
    //       setLikes(response.data.like_count);
    //       setIsStopped(!isStopped);
    //       setLiked(!liked);
    //     });
    // });
  };

  useEffect(() => {
    const getListing = () => {
      axios.get(`${api}/listings/${listingId}`).then((response) => {
        setListingData(response.data);
      });
    };
    const getLikes = () => {
      const listingId = listing.id;
      axios.get(`${api}/listings/${listingId}/likeCount`).then((response) => {
        setLikes(response.data.like_count);
      });
    };
    getListing();
    getLikes();
    console.log(listingData);
  }, [currentUser]);

  return (
    <motion.div
      layout
      className="watchlist-listing"
      // initial={{ opacity: 0}}
      // animate={{
      //   opacity: 1,
      // }}
      // exit={{ opacity: 0 }}
      // transition= {{ duration: 0.2 }}
    >
      <motion.div layout className="watchlist-listing-initial">
        <motion.div className="watchlist-listing-img">
          <Link to={`/listings/${listingData?.id}`}>
            <motion.img
              src={listingData?.image1}
              onClick={() => setProfileOpen(!profileOpen)}
            ></motion.img>
          </Link>
        </motion.div>
        <motion.div className="watchlist-listing-info"
          onClick={() => {
            history.push(`/listings/${listingData?.id}`);
            setProfileOpen(!profileOpen)
          }}
        >
          <motion.h4 className="watchlist-title">
            {listingData?.title}
          </motion.h4>
          <motion.h4 className="watchlist-price">
            ${listingData?.price}
          </motion.h4>
        </motion.div>
        <motion.div className="watchlist-listing-buttons">
          <motion.a>
            <motion.img src={deleteSvg} onClick={toggleRemove}></motion.img>
          </motion.a>
          <Link to={`/listings/${listingData?.id}`}>
            <motion.img
              src={goSvg}
              onClick={() => setProfileOpen(!profileOpen)}
            ></motion.img>
          </Link>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {removeOpen && (
          <motion.div
            layout
            className="watchlist-listing-bottom"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, delay: 0.25 },
            }}
            exit={{ opacity: 0 }}
          >
            {/* <motion.div layout className="watchlist-listing-bottom-text">
            <motion.h5 className="watchlist-listing-bottom-text-h" layout>Are you sure?</motion.h5>
          </motion.div> */}
            <motion.div className="watchlist-listing-bottom-buttons">
              <motion.button
                className="watchlist-listing-bottom-buttons-remove"
                onClick={remove}
              >
                Remove
              </motion.button>
              <motion.button
                className="watchlist-listing-bottom-buttons-cancel"
                onClick={toggleRemove}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
