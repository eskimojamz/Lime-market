import axios from 'axios'

const url = 'http://localhost:5000/listings'

export const fetchListings = () => axios.get(url)
export const createListing = (newListing) => axios.post(url, newListing)
export const updateListing = (id, updatedListing) => axios.patch(`/${url}/${id}`, updatedListing)
// export const deleteListing = (id) => API.delete(`${url}/${id}`)
// export const followListing = (id) => axios.patch(`${url}/${id}/followListing`)