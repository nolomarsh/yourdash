import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'
import { randomBackgroundUrl } from '../../images/images.js'

import SearchBar from '../searchParams/SearchBar'


const Landing = () => {
    const dispatch = useDispatch()
    // const [newZip, setNewZip] = useState('')
    const [backgroundStyle, setBackgroundStyle] = useState({})

    useEffect(() => {
        setBackgroundStyle({backgroundImage: 'url(' + randomBackgroundUrl() + ')'})
    },[])

    return (
        <div className='landing background' style={backgroundStyle}>
            <div className='middle'>
                <h2>Enter an address and get started!</h2>
                <SearchBar />
            </div>
        </div>
    )
}

export default Landing
