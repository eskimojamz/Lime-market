import { combineReducers } from 'redux'

import listingsReducer from './listings'
import listingReducer from './listing'
import currentListingReducer from './currentListing'
import currentUserReducer from './currentUser'
import commentsReducer from './comments'

export const reducers = combineReducers({ 
    listings: listingsReducer, 
    listing: listingReducer, 
    currentListing: currentListingReducer, 
    currentUser: currentUserReducer, 
    comments: commentsReducer 
})