import { createStore, combineReducers } from 'redux'
import { allUsersReducer } from '../features/allUsers/allUsersSlice.js'
import { allRestaurantsReducer } from '../features/allRestaurants/allRestaurantsSlice.js'
import { currentUserReducer } from '../features/currentUser/currentUserSlice.js'
import { currentViewReducer } from '../features/currentView/currentViewSlice.js'
import { currentZipReducer } from '../features/currentZip/currentZipSlice.js'

export const store = createStore(combineReducers({
    allUsers: allUsersReducer,
    allRestaurants: allRestaurantsReducer,
    currentUser: currentUserReducer,
    currentView: currentViewReducer,
    currentZip: currentZipReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
