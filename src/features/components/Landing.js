import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const Landing = () => {
    const dispatch = useDispatch()
    const [newZip, setNewZip] = useState('')

    const formChangeHandler = e => {
        setNewZip(e.target.value)
    }

    const formSubmitHandler = e => {
        e.preventDefault()
        dispatch(setCurrentZip(newZip))
        dispatch(setCurrentView('allRestaurants'))
    }

    return (
        <div className='landing'>
            <div className='middle'>
                <h2>Enter a zip code and get started!</h2>
                <form className='roundBar' onSubmit={formSubmitHandler}>
                    <input type='text' placeholder='Zip Code' onChange={formChangeHandler}/>
                    <input type='submit' value='Search' />
                </form>
            </div>
        </div>
    )
}

export default Landing
