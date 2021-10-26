import { combineReducers } from 'redux'

import listingsReducer from './listings'
import listingReducer from './listing'
import currentListingReducer from './currentListing'
import userReducer from './user'
import commentsReducer from './comments'

export const reducers = combineReducers({ 
    listings: listingsReducer, 
    listing: listingReducer, 
    currentListing: currentListingReducer, 
    user: userReducer,
    comments: commentsReducer 
})