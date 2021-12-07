import axios from 'axios';

const auth = 'https://lime-market-backend.herokuapp.com/auth'
const users = 'https://lime-market-backend.herokuapp.com/users'
const listings = 'https://lime-market-backend.herokuapp.com/listings';
const comments = 'https://lime-market-backend.herokuapp.com/comments';

// Authorization Token Call
export const authUser = (userCredentials) => axios.post(auth, userCredentials)

// User Profiles
// export const createUser = (userCredentials, auth) => axios.post(`${users}/create`, userCredentials, auth)
// export const deleteUser = (userId, auth) => axios.delete(`${users}/create/${userId}`, auth)
// export const updateUser = (userId, auth) => axios.patch(`${users}/update/${userId}`, auth)
export const fetchUser = (userId) => axios.get(`${users}/view/${userId}`)
// export const fetchUsers = () => axios.get(users)

// Listings
export const fetchListings = () => axios.get(listings)
export const fetchListing = (listingId) => axios.get(`${listings}/${listingId}`)
export const createListing = (newListing, auth) => axios.post(`${listings}/create`, newListing, auth)
export const updateListing = (listingId, updatedListing) => axios.patch(`${listings}/update/${listingId}`, updatedListing)
export const deleteListing = (id) => axios.delete(`${listings}/${id}`)
export const fetchLikes = (listingId) => axios.get(`${listings}/${listingId}/likeCount`)
export const likeCount = (listingId, updatedCount, auth) => axios.patch(`${listings}/${listingId}/like`, updatedCount, auth)
export const likeListing = (userId, watchlist, auth) => axios.patch(`${users}/update/${userId}`, watchlist, auth)

// Comments
export const fetchComments = (listingId) => axios.get(`${comments}/?listing_id=${listingId}`)
export const addComment = (comment, auth) => axios.post(`${comments}/create`, comment, auth)
export const editComment = (listingId, editedComment) => axios.patch(`${comments}/${listingId}`, editedComment)
export const deleteComment = (commentId, auth) => axios.delete(`${comments}/delete/${commentId}`, auth)