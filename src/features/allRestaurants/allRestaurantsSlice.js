
import { dispatch } from 'react-redux'
import Documenu from 'documenu'

const initialState = []

export const allRestaurantsReducer = (allRestaurants = initialState, action) => {
    switch(action.type) {
        case 'allRestaurants/set':
            return action.payload
        case 'allrestaurants/extend':
            return [...allRestaurants, ...action.payload]
        default:
            return allRestaurants
    }
}

export const setRestaurants = data => {
    return {
        type: 'allRestaurants/set',
        payload: data
    }
}

export const extendRestaurants = data => {
    return {
        type: 'allRestaurants/extend',
        payload: data
    }
}

export const setRestaurantsByZip = (zipCode, dispatcher) => {
    Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true})
    .then((response) => {
        return dispatcher(setRestaurants(response.data))
    })
}

export const selectAllRestaurants = state => state.allRestaurants
