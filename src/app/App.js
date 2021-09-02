import React, { useState } from 'react'
import '../css/App.css'
import Documenu from 'documenu'
import axios from 'axios'
import Header from '../components/Header'
import AllUsers from '../features/allUsers/AllUsers'
import AllRestaurants from '../features/allRestaurants/AllRestaurants'

const App = (props) => {
    const { state, dispatch } = props
    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')
    let [newUsername, setNewUsername] = useState('')
    let [newPassword, setNewPassword] = useState('')

    // const getMenuItemsByGeo = (lat, lon, distance) => {
    //     Documenu.MenuItems.searchGeo(lat, lon, distance)
    //     .then((response) => {
    //         console.log(response.data)
    //     })
    // }

    const testGet = () => {
        axios
            .get('http://localhost:8080/users')
            .then((response) => {
            console.log(response.data)
        })
    }

    const testPost = () => {
        axios.post('http://localhost:8080/users', {username: newUsername, password: newPassword})
            .then((response) => {
                console.log(response.data)
            })
    }

    const handleChangeNewUsername = e => {
        setNewUsername(e.target.value)
    }

    const handleChangeNewPassword = e => {
        setNewPassword(e.target.value)
    }


    return (
        <>
        <Header />
        <button onClick={testGet}>test2</button>
        <form onSubmit={testPost}>
            <input type="text" placeholder="username" onChange={handleChangeNewUsername}/>
            <input type="password" placeholder="password" onChange={handleChangeNewPassword}/>
            <input type="submit" value="submit"/>
        </form>
        <AllRestaurants />
        </>
    )
}

export default App;
