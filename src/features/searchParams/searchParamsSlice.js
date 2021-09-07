const initialState = {
    lat: null,
    lon: null,
    distance: 5,
    fullmenu: true,
}

export const searchParamsReducer = (searchParams = initialState, action) => {
    switch(action.type){
        case 'searchParams/set':
            return action.payload
        case 'searchParams/setCoords':
            return {...searchParams, lat: action.payload[1], lon: action.payload[0]}
        case 'searchparams/setDistance':
            return {...searchParams, distance: action.payload}
        default:
            return searchParams
    }
}

export const setCoords = coords => {
    return {
        type: 'searchParams/setCoords',
        payload: coords
    }
}

export const setDistance = distance => {
    return {
        type: 'searchParams/setDistance',
        payload: distance
    }
}

export const selectSearchParams = state => state.searchParams
