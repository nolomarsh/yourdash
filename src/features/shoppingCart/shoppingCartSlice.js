const initialState = []

const containsItem = (array, item) => {
    for (let object of array) {
        if (object.name === item.name && object.price === item.price){
            return object.count
        }
    }
    return false
}

const sorterByName = (a,b) => {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

export const shoppingCartReducer = (shoppingCart = initialState, action) => {
    switch(action.type){
        case 'shoppingCart/add':
            let oldCount = containsItem([...shoppingCart], action.payload)
            if (oldCount){
                return[...shoppingCart.filter(item => item.name !== action.payload.name), {...action.payload, count:oldCount+1}].slice().sort(sorterByName)
            } else {
                return [...shoppingCart, {...action.payload, count:1}].slice().sort(sorterByName)
            }
        case 'shoppingCart/remove':
            let filteredCart = [...shoppingCart.filter(item => item.name !== action.payload.name)]
            if (action.payload.count > 1) {
                return [...filteredCart, {...action.payload, count: action.payload.count - 1}].slice().sort(sorterByName)
            } else {
                return filteredCart.slice().sort(sorterByName)
            }
        default:
            return shoppingCart
    }
}

export const addItemToCart = item => {
    return {
        type: 'shoppingCart/add',
        payload: item
    }
}

export const removeItemFromCart = item => {
    return {
        type: 'shoppingCart/remove',
        payload: item
    }
}

export const selectShoppingCart = state => state.shoppingCart
