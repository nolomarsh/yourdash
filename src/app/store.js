import { createStore, combineReducers } from 'redux'
import { allUsersReducer } from '../features/allUsers/allUsersSlice.js'
import { allRestaurantsReducer } from '../features/allRestaurants/allRestaurantsSlice.js'
import { currentUserReducer } from '../features/currentUser/currentUserSlice.js'

export const store = createStore(combineReducers({
    allUsers: allUsersReducer,
    allRestaurants: allRestaurantsReducer,
    currentUser: currentUserReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
