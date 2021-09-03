// import React, { useEffect } from 'react'
// import axios from 'axios'

const initialState = []

export const allUsersReducer = (allUsers = initialState, action) => {
    switch(action.type) {
        case 'allUsers/set':
            return action.payload
        case 'allUsers/addUser':
            console.log('received: ', action.payload)
            return [...allUsers, action.payload]
        case 'allUsers/removeUser':
            return allUsers.filter(user => user.id !== action.payload.id)
        default:
            return allUsers
    }
}

export const setUsers = (data) => {
    return {
        type: 'allUsers/set',
        payload: data
    }
}

export const addUser = user => {
    return {
        type: 'allUsers/addUser',
        payload: user
    }
}

export const removeUser = user => {
    return {
        type: 'allUsers/removeUser',
        payload: user
    }
}

export const selectAllUsers = state => state.allUsers
