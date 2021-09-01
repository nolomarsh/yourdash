import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setData, selectAllUsers, addUser } from './allUsersSlice.js'
import { useSelector, useDispatch } from 'react-redux'

const AllUsers = (props) => {
    const dispatch = useDispatch()
    const allUsers = useSelector(selectAllUsers)

    const loadUsers = () => {
        axios
            .get('https://yourdash-api.herokuapp.com/users')
            // .get('http://localhost:8080/users')
            .then((response) => {
                dispatch(setData(response.data))
                // console.log(response.data)
            })
    }

    const handleAddUser = user => {
        axios
            .post('https://yourdash-api.herokuapp.com/users',user)
            // .post('http://localhost:8080/users',user)
            .then((response) => {
                dispatch(addUser(response.data))
            })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <>
        <h1>All Users</h1>
        <p>{allUsers.length}</p>
        <button onClick={()=>handleAddUser({username:'Boblin', password:'boblin', homeAddress:'The sewers'})}>add</button>
        </>
    )
}

export default AllUsers
