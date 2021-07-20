import axios from 'axios';

const listings = 'https://hoppang-server.herokuapp.com/listings';
const comments = 'https://hoppang-server.herokuapp.com/comments';

export const fetchListings = () => axios.get(listings)
export const fetchComments = () => axios.get(comments)
export const createListing = (newListing) => axios.post(listings, newListing)
export const updateListing = (id, updatedListing) => axios.patch(`${listings}/${id}`, updatedListing)
export const deleteListing = (id) => axios.delete(`${listings}/${id}`)
export const likeListing = (id, userId) => axios.patch(`${listings}/${id}/likeListing`, userId)
export const addComment = (newComment) => axios.post(comments, newComment)
export const editComment = (id, editedComment) => axios.patch(`${comments}/${id}`, editedComment)
export const deleteComment = (id) => axios.delete(`${comments}/${id}`)