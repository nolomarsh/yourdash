const initialState = []

export const allRestaurantsReducer = (allRestaurants = initialState, action) => {
    switch(action.type) {
        case 'allRestaurants/setData':
            return action.payload
        case 'allrestaurants/extendData':
            return [...allRestaurants, ...action.payload]
        default:
            return allRestaurants
    }
}

export const setData = data => {
    return {
        type: 'allRestaurants/setData',
        payload: data
    }
}

export const extendData = data => {
    return {
        type: 'allRestaurants/extendData',
        payload: data
    }
}

export const selectAllRestaurants = state => state.allRestaurants
