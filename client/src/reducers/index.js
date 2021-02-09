import { combineReducers } from 'redux'

import listingsReducer from './listings'
import currentIdReducer from './currentId'

export const reducers = combineReducers({ listings: listingsReducer, currentId: currentIdReducer })