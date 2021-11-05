import { useState, useEffect, useContext } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import deleteSvg from "../assets/delete.svg";
import goSvg from "../assets/go.svg";
import sidebarCloseSvg from "../assets/sidebarclose.svg";
import MenuButton from "./MenuButton";
import { UserContext } from "../App";
import axios from "axios";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(currentUser);
  const [menuOpen, setMenuOpen] = useState(false);
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
      <nav className="nav-container">
        <div className="nav">
          <div className="nav-left">
            <Link to="/">
              <motion.img
                className="logo"
                src={logo}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.25 }}
              ></motion.img>
            </Link>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.25 }}
            >
              Lime Market
            </motion.h1>
          </div>

          <MenuButton
            menuOpen={menuOpen}
            toggle={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <motion.div
              className="mobile-menu"
              // variants={RightLeftFast}
              // initial="hidden"
              // animate="visible"
              // exit="exit"
            >
              <div className="mobile-menu-top">
                <Link to="/listings">
                  <button className="listings-nav-btn-mobile">Listings</button>
                </Link>
                <Link to="/form">
                  <button className="sell-nav-btn-mobile">Sell Now</button>
                </Link>
              </div>
              {user || currentUser ? (
                <>
                  <div className="mobile-menu-profile">
                    <div className="mobile-menu-profile-left">
                      <img
                        className="profile-mobile"
                        src={currentUser?.profile_img || user?.profile_img}
                      />
                    </div>
                    <div className="mobile-menu-profile-right">
                      <h5>Signed in as: </h5>
                      <h4>{currentUser?.username || user?.username}</h4>
                    </div>
                  </div>
                  <div className="mobile-menu-bottom-logout">
                    <Link to="/profile">
                      <button className="profile-btn-mobile">My Profile</button>
                    </Link>
                    <LogoutButton logoutAll={logoutAll} />
                  </div>
                  <div className="mobile-menu-liked">
                    <h2>Liked Items</h2>
                  </div>
                </>
              ) : (
                <LoginButton />
              )}
            </motion.div>
          )}

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
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
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
                      <h2>Watchlist</h2>
                    </div>
                      <motion.div layout className="watchlist-items">
                        {currentUser?.watchlist.map((listing) => {
                          return <WatchlistListing listing={listing} />;
                        })}
                      </motion.div>
                  </div>
                </div>
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

function WatchlistListing({ listing }) {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  const token = sessionStorage.getItem('token')

  const [removeOpen, setRemoveOpen] = useState(false);
  const listingId = listing.id
  console.log(listingId)
  const [likes, setLikes] = useState()

  const toggleRemove = () => setRemoveOpen(!removeOpen);

  const remove = () => {
    axios
      .patch(
        `http://localhost:8000/listings/${listingId}/like`,
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
          `http://localhost:8000/users/update/${currentUser?.username}`,
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
          .get(`http://localhost:8000/users/view/${currentUser?.username}`)
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            setCurrentUser(response.data);
          });
      })
      // .then(() => {
      //   return axios
      //     .get(`http://localhost:8000/listings/${listingId}/likeCount`)
      //     .then((response) => {
      //       setLikes(response.data.like_count);
      //       setIsStopped(!isStopped);
      //       setLiked(!liked);
      //     });
      // });
  };

  useEffect(() => {
    const getLikes = () => {
      const listingId = listing.id
      axios.get(`http://localhost:8000/listings/${listingId}/likeCount`)
      .then(response => {
          setLikes(response.data.like_count)
      })
    }
    getLikes()
    console.log(likes)
  })

  return (
    <motion.div layout className="watchlist-listing"
      initial={{ opacity: 0, y: 10}}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 },
      }}
      exit={{ opacity: 0 }}
    >
      <motion.div layout className="watchlist-listing-initial">
        <motion.div className="watchlist-listing-img">
          <motion.img src={listing.img}></motion.img>
        </motion.div>
        <motion.div className="watchlist-listing-info">
          <motion.h4 className="watchlist-title">{listing.title}</motion.h4>
          <motion.h4 className="watchlist-price">${listing.price}</motion.h4>
        </motion.div>
        <motion.div className="watchlist-listing-buttons">
          <motion.a>
            <motion.img src={deleteSvg} onClick={toggleRemove}></motion.img>
          </motion.a>
          <Link to={`/listings/${listing.id}`}>
            <motion.img src={goSvg}></motion.img>
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
              transition: { duration: 0.5, delayChildren: 1.5 },
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
