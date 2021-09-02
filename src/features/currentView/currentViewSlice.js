const initialState = 'home'

export const currentViewReducer = (currentView = initialState, action) => {
    switch(action.type) {
        case 'currentView/set':
            return action.payload
        default:
            return currentView
    }
}

export const setCurrentView = view => {
    return {
        type: 'currentView/set',
        payload: view
    }
}

export const selectCurrentView = state => state.currentView
