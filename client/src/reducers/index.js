import { combineReducers } from 'redux'

import listingsReducer from './listings'
import currentIdReducer from './currentId'
import commentsReducer from './comments'

export const reducers = combineReducers({ listings: listingsReducer, currentId: currentIdReducer, comments: commentsReducer })