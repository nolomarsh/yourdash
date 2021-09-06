import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'
import { randomBackgroundUrl, randomImageUrl } from '../../images/images.js'

import SearchBar from '../searchParams/SearchBar'


const Landing = () => {
    const dispatch = useDispatch()
    // const [newZip, setNewZip] = useState('')
    const [backgroundStyle, setBackgroundStyle] = useState({})

    // const formChangeHandler = e => {
    //     setNewZip(e.target.value)
    // }

    const formSubmitHandler = e => {
        e.preventDefault()
        // dispatch(setCurrentZip(newZip))
        dispatch(setCurrentView('allRestaurants'))
    }

    useEffect(() => {
        setBackgroundStyle({backgroundImage: 'url(' + randomBackgroundUrl() + ')'})
    },[])

    return (
        <div className='landing' style={backgroundStyle}>
            <div className='middle'>
                <h2>Enter an address and get started!</h2>
                <SearchBar />
            </div>
        </div>
    )
}

export default Landing
