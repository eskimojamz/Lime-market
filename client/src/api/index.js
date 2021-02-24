import axios from 'axios'

const url = 'https://hoppang.herokuapp.com/listings'

export const fetchListings = () => axios.get(url)
export const createListing = (newListing) => axios.post(url, newListing)
export const updateListing = (id, updatedListing) => axios.patch(`${url}/${id}`, updatedListing)
export const deleteListing = (id) => axios.delete(`${url}/${id}`)
// export const followListing = (id) => axios.patch(`${url}/${id}/followListing`)