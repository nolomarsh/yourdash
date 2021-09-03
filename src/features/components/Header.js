import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Documenu from 'documenu'

import { selectCurrentView, setCurrentView } from '../currentView/currentViewSlice.js'
import { selectCurrentZip, setCurrentZip } from "../currentZip/currentZipSlice.js"
import { selectCurrentUser, setCurrentUser } from '../currentUser/currentUserSlice.js'
import { getRestaurantsByZip, setRestaurants, extendRestaurants } from '../allRestaurants/allRestaurantsSlice.js'

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

    const getRestaurantsByZip = (zipCode, page = 1) => {
        Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true, page: page})
        .then((response) => {
            if (page === 1) {
                dispatch(setRestaurants(response.data))
                console.log(response)
            } else if (page > 1){
                dispatch(extendRestaurants(response.data))
                console.log(response)
            }
            // if(response.more_pages){
            //     getRestaurantsByZip(zipCode, page+1)
            // }
        })
    }

    const handleZipSubmit = (e) => {
        e.preventDefault()
        dispatch(setCurrentZip(newZip))
        getRestaurantsByZip(newZip)
        e.target.reset()
    }

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
            dispatch(setCurrentZip(storedUser.zipCode))
            dispatch(setCurrentView('allRestaurants'))
        }
    },[])

    return (
        <header
            style={currentView !== 'home' ? {background: '#003049'} : {}}
        >
            <h1 onClick={()=>{dispatch(setCurrentView('home'))}}>YourDash</h1>
            <form className='roundBar' onSubmit={handleZipSubmit}>
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
