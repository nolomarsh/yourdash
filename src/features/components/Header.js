import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Documenu from 'documenu'

import { selectCurrentView, setCurrentView } from '../currentView/currentViewSlice.js'
import { selectCurrentZip, setCurrentZip } from "../currentZip/currentZipSlice.js"
import { selectCurrentUser, setCurrentUser } from '../currentUser/currentUserSlice.js'
import { setRestaurantsByZip } from '../allRestaurants/allRestaurantsSlice.js'

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

    const logOut = () => {
        dispatch(setCurrentUser({}))
        localStorage.removeItem('currentUser')
    }

    const viewChangeHandler = e => {
        dispatch(setCurrentView(e.target.name))
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser')){
            let storedUser = JSON.parse(localStorage.getItem('currentUser'))
            dispatch(setCurrentUser(storedUser))
            dispatch(setCurrentZip(storedUser.zipCode))
            dispatch(setCurrentView('allRestaurants'))
        }
    },[])

    return (
        <header>
            <h1>YourDash</h1>
            <form onSubmit={handleZipSubmit}>
                <input type='text' onChange={handleZipChange}/>
                <input type='submit' value='Search' />
            </form>
            <div className='btnBox'>
                {currentUser.username ?
                    <button onClick={logOut}>Log Out</button>
                    :
                    <>
                        <button name='login' onClick={viewChangeHandler}>Log In</button>
                        <button name='signup' onClick={viewChangeHandler}>Sign Up</button>
                    </>
                }

            </div>
        </header>
    )
}

export default Header
