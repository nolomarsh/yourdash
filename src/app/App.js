import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/App.css'
import Documenu from 'documenu'
import axios from 'axios'

import Header from '../components/Header'
import NewUser from '../features/allUsers/NewUser'
import AllRestaurants from '../features/allRestaurants/AllRestaurants'

import { selectCurrentZip } from '../features/currentZip/currentZipSlice.js'
import { loadUsers } from '../features/allUsers/allUsersSlice.js'

const App = (props) => {
    const { state, dispatch } = props
    const currentZip = useSelector(selectCurrentZip)

    return (
        <>
        <Header />
        <NewUser />
        <main>
            {currentZip &&
                <AllRestaurants />
            }
        </main>
        </>
    )
}

export default App;
