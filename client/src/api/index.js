import axios from 'axios';

const auth = 'http://localhost:8000/auth/'
const users = 'http://localhost:8000/users/'
const listings = 'http://localhost:8000/listings/';
const comments = 'http://localhost:8000/comments/';

// Authorization Token Call
export const authUser = (userCredentials) => axios.post(auth, userCredentials)

// User Profiles
export const createUser = (userCredentials, auth) => axios.post(`${users}/create/`, userCredentials, auth)
export const deleteUser = (userId, auth) => axios.delete(`${users}/create/${userId}/`, auth)
export const updateUser = (userId, auth) => axios.patch(`${users}/update/${userId}/`, auth)
export const viewUser = (userId) => axios.get(`${users}/view/${userId}/`)
export const fetchUsers = () => axios.get(users)

// Listings
export const fetchListings = () => axios.get(listings)
export const fetchListing = (id) => axios.get(`${listings}${id}`)
export const createListing = (newListing) => axios.post(listings, newListing)
export const updateListing = (id, updatedListing) => axios.patch(`${listings}/${id}`, updatedListing)
export const deleteListing = (id) => axios.delete(`${listings}/${id}`)
export const likeListing = (id, userId) => axios.patch(`${listings}/${id}/likeListing`, userId)
export const saveListing = (id, userId) => axios.patch(`${listings}/${id}/saveListing`, userId)

// Comments
export const fetchComments = () => axios.get(comments)
export const addComment = (newComment) => axios.post(comments, newComment)
export const editComment = (id, editedComment) => axios.patch(`${comments}/${id}`, editedComment)
export const deleteComment = (id) => axios.delete(`${comments}/${id}`)