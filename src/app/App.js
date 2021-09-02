import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/App.css'
import Documenu from 'documenu'
import axios from 'axios'

import Header from '../features/components/Header'
import SignUp from '../features/allUsers/SignUp'
import LogIn from '../features/currentUser/LogIn'
import AllRestaurants from '../features/allRestaurants/AllRestaurants'
import ShowRestaurant from '../features/components/ShowRestaurant'

import { selectCurrentZip } from '../features/currentZip/currentZipSlice.js'
import { selectCurrentView } from '../features/currentView/currentViewSlice.js'
import { loadUsers } from '../features/allUsers/allUsersSlice.js'

const App = (props) => {
    const { state, dispatch } = props
    const [showRestaurant, setShowRestaurant] = useState({})
    const currentZip = useSelector(selectCurrentZip)
    const currentView = useSelector(selectCurrentView)

    return (
        <>
        <Header />
        <main>
            {currentView === 'login' &&
                <LogIn />
            }
            {currentView === 'signup' &&
                <SignUp />
            }
            {currentView === 'allRestaurants' &&
                <AllRestaurants
                    setShowRestaurant={setShowRestaurant}
                />
            }
            {currentView === 'showRestaurant' &&
                <ShowRestaurant
                    restaurant={showRestaurant}
                    setShowRestaurant={setShowRestaurant}
                />
            }
        </main>
        </>
    )
}

export default App;
