import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../App";
import Heart from "../assets/Heart";
import { formatDistance } from "date-fns";

const Listing = ({ listing, currentPage }) => {
  const api = "https://lime-market-backend.herokuapp.com";
  const listingId = listing.id.toString();
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log(currentUser);
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState();
  const [isStopped, setIsStopped] = useState(true);
  // console.log(listing);
  const toggleLike = () => {
    if (!liked) {
      axios
        .patch(
          `${api}/listings/${listingId}/like`,
          {
            like_count: likes + 1,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          console.log(user?.watchlist);
          let newWatchlist = Object.values(user?.watchlist);
          const index = newWatchlist.length;
          newWatchlist[index] = {
            id: listingId,
            img: listing.image1,
            title: listing.title,
            price: listing.price,
          };
          return axios.patch(
            `${api}/users/update/${user.username}`,
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
            .get(`${api}/users/view/${user.username}`)
            .then((response) => {
              sessionStorage.setItem("user", JSON.stringify(response.data));
              setCurrentUser(response.data);
              getLikes(listingId);
            });
        })
        .then(() => {
          return axios
            .get(`${api}/listings/${listingId}/likeCount`)
            .then((response) => {
              setLikes(response.data.like_count);
              setIsStopped(!isStopped);
              setLiked(!liked);
            });
        });
    } else if (liked) {
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
          const newWatchlist = user?.watchlist;
          const index = newWatchlist.findIndex(
            (l) => l.id == listingId.toString()
          );
          if (index > -1) {
            newWatchlist.splice(index, 1);
          }
          return axios.patch(
            `${api}/users/update/${user.username}`,
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
            .get(`${api}/users/view/${user.username}`)
            .then((response) => {
              sessionStorage.setItem("user", JSON.stringify(response.data));
              setCurrentUser(response.data);
            });
        })
        .then(() => {
          return axios
            .get(`${api}/listings/${listingId}/likeCount`)
            .then((response) => {
              setLikes(response.data.like_count);
              setIsStopped(!isStopped);
              setLiked(!liked);
            });
        });
    }
  };

  const getLikes = (listing_id) => {
    axios.get(`${api}/listings/${listing_id}/likeCount`).then((response) => {
      setLikes(response.data.like_count);
    });
  };

  useEffect(() => {
    getLikes(listingId);
    if (user) {
      const likedBool = user?.watchlist.some(
        (listing) => listing.id === listingId.toString()
      );
      setIsStopped(!likedBool);
      setLiked(likedBool);
    }
  }, [currentUser, currentPage]);

  return (
    <>
      <motion.div
        className="listing"
      >
        {/* listing image */}
        <div className="listing-img-div">
          <img
            src={listing.image1}
            onClick={() => {
              history.push(`/listings/${listingId}`);
            }}
          />
        </div>

        {/* title, price, details btn */}
        <div className="listing-text">
          <div className="listing-text-top"
               onClick={() => {
                 history.push(`/listings/${listingId}`);
               }}>
            <div className="listing-title">
              <h3>{listing.title}</h3>
            </div>
            <div className="listing-price">
              <h2>${listing.price}</h2>
            </div>
          </div>
          <div className="listing-text-bottom">
            <div className="listing-like">
              <span className="listing-like-heart"
                    onClick={() => {
                      if(user) {
                        setLiked(prevLiked => !prevLiked);
                        toggleLike();
                      }
                    }}>
                <Heart liked={liked} />
              </span>
              <span className="listing-like-text">
                <h5>{likes} Likes</h5>
              </span>
              {!user &&
              <span id="listing-like-tooltip">
                <p>You must be logged in to like and save a listing.</p>
              </span>
              }
            </div>
            <div className="listing-date">
              <h5>
                {formatDistance(new Date(listing.created_at), new Date(), {
                  addSuffix: true,
                })}
              </h5>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Listing;
