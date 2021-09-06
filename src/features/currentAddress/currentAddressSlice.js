const initialState = ''

export const currentAddressReducer = (currentAddress = initialState, action) => {
    switch(action.type) {
        case 'currentAddress/set':
            return action.payload
        default:
            return currentAddress
    }
}

export const setAddress = address => {
    return {
        type: 'currentAddress/set',
        payload: address
    }
}

export const selectCurrentAddress = state => state.currentAddress
