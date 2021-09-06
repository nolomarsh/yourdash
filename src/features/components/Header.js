import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Documenu from 'documenu'
import axios from 'axios'

import SearchBar from '../searchParams/SearchBar'

import { selectCurrentView, setCurrentView } from '../currentView/currentViewSlice.js'
import { selectCurrentZip, setCurrentZip } from "../currentZip/currentZipSlice.js"
import { selectCurrentUser, setCurrentUser } from '../currentUser/currentUserSlice.js'
import { selectSearchParams, setCoords} from '../searchParams/searchParamsSlice.js'
import { getRestaurantsByZip, setRestaurants, extendRestaurants } from '../allRestaurants/allRestaurantsSlice.js'
import { selectCurrentAddress, setAddress } from '../currentAddress/currentAddressSlice.js'

const Header = () => {
    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const currentView = useSelector(selectCurrentView)
    // const currentZip = useSelector(selectCurrentZip)
    const currentAddress = useSelector(selectCurrentAddress)
    const currentUser = useSelector(selectCurrentUser)
    const searchParams = useSelector(selectSearchParams)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(setCurrentUser({}))
        localStorage.removeItem('currentUser')
        dispatch(setCurrentView('home'))
    }

    const viewChangeHandler = e => {
        dispatch(setCurrentView(e.target.name))
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser')){
            let storedUser = JSON.parse(localStorage.getItem('currentUser'))
            dispatch(setCurrentUser(storedUser))
            dispatch(setAddress(storedUser.streetAddress))
            dispatch(setCurrentView('allRestaurants'))
        }
    },[])

    return (
        <header
            style={currentView !== 'home' && currentView !== 'login' && currentView !== 'signup'? {background: '#003049'} : {}}
        >
            <h1 onClick={()=>{dispatch(setCurrentView('home'))}}>YourDash</h1>
            <SearchBar />
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
