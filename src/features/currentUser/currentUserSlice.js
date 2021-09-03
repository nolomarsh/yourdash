const initialState = {}

export const currentUserReducer = (currentUser = initialState, action) => {
    switch(action.type) {
        case 'currentUser/set':
            return action.payload
        case 'currentUser/unset':
            return initialState
        default:
            return currentUser
    }
}

export const setCurrentUser = user => {
    return {
        type: 'currentUser/set',
        payload: user
    }
}

export const unsetCurrentUser = () => {
    return {
        type: 'currentUser/unset'
    }
}

export const selectCurrentUser = state => state.currentUser
