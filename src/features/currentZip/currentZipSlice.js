const initialState = null

export const currentZipReducer = (currentZip = initialState, action) => {
    switch(action.type) {
        case 'currentZip/set':
            return action.payload
        default:
            return currentZip
    }
}

export const setCurrentZip = zip => {
    return {
        type: 'currentZip/set',
        payload: zip
    }
}

export const selectCurrentZip = state => state.currentZip
