import { createStore, combineReducers } from 'redux'
import { allUsersReducer } from '../features/allUsers/allUsersSlice.js'

export const store = createStore(combineReducers({
    allUsers: allUsersReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
