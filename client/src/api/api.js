import axios from 'axios';

const auth = 'http://localhost:8000/auth/'
const users = 'http://localhost:8000/users'
const listings = 'http://localhost:8000/listings';
const comments = 'http://localhost:8000/comments/';

// Authorization Token Call
export const authUser = (userCredentials) => axios.post(auth, userCredentials)

// User Profiles
export const createUser = (userCredentials, auth) => axios.post(`${users}/create/`, userCredentials, auth)
export const deleteUser = (userId, auth) => axios.delete(`${users}/create/${userId}/`, auth)
export const updateUser = (userId, auth) => axios.patch(`${users}/update/${userId}/`, auth)
export const fetchUser = (userId) => axios.get(`${users}/view/${userId}/`)
export const fetchUsers = () => axios.get(users)

// Listings
export const fetchListings = () => axios.get(listings)
export const fetchListing = (listingId) => axios.get(`${listings}/${listingId}`)
export const createListing = (newListing) => axios.post(listings, newListing)
export const updateListing = (listingId, updatedListing) => axios.patch(`${listings}/update/${listingId}`, updatedListing)
export const deleteListing = (id) => axios.delete(`${listings}/${id}`)
export const fetchLikes = (listingId) => axios.get(`${listings}/${listingId}/likeCount`)
export const likeCount = (listingId, updatedCount, auth) => axios.patch(`${listings}/${listingId}/like`, updatedCount, auth)
export const likeListing = (userId, watchlist, auth) => axios.patch(`${users}/update/${userId}`, watchlist, auth)

// Comments
export const fetchComments = () => axios.get(comments)
export const addComment = (newComment) => axios.post(comments, newComment)
export const editComment = (id, editedComment) => axios.patch(`${comments}/${id}`, editedComment)
export const deleteComment = (id) => axios.delete(`${comments}/${id}`)