import { combineReducers } from 'redux'

import listingsReducer from './listings'
import listingReducer from './listing'
import commentsReducer from './comments'
import currentListingReducer from './currentListing'

export const reducers = combineReducers({ 
    listings: listingsReducer, 
    listing: listingReducer,
    comments: commentsReducer,
    currentListing: currentListingReducer 
})