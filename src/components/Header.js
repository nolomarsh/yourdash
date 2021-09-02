import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Documenu from 'documenu'

import { selectCurrentView, setCurrentView } from '../features/currentView/currentViewSlice.js'
import { selectCurrentZip, setCurrentZip } from "../features/currentZip/currentZipSlice.js"
import { selectCurrentUser, setCurrentUser } from '../features/currentUser/currentUserSlice.js'
import { setRestaurantsByZip } from '../features/allRestaurants/allRestaurantsSlice.js'

const Header = () => {
    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const currentView = useSelector(selectCurrentView)
    const currentZip = useSelector(selectCurrentZip)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const [newZip, setNewZip] = useState(null)

    const handleZipChange = e => {
        setNewZip(e.target.value)
    }

    const handleZipSubmit = (e) => {
        e.preventDefault()
        dispatch(setCurrentZip(newZip))
        setRestaurantsByZip(newZip, dispatch)
        e.target.reset()
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser')){
            let currentUser = JSON.parse(localStorage.getItem('currentUser'))
            console.log(currentUser)
        }
    })

    return (
        <header>
            <h1>YourDash</h1>
            <form onSubmit={handleZipSubmit}>
                <input type='text' onChange={handleZipChange}/>
                <input type='submit' value='Search' />
            </form>
            <div className='btnBox'>
                <button>Sign In</button>
                <button>Sign Up</button>
            </div>
        </header>
    )
}

export default Header
