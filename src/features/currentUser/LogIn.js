import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './currentUserSlice.js'
// import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setAddress } from '../currentAddress/currentAddressSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'
import { randomBackgroundUrl } from '../../images/images.js'

const LogIn = () => {
    const [loginData, setLoginData] = useState({username:'', password:''})
    const [errorMessage, setErrorMessage] = useState('')
    const [backgroundStyle, setBackgroundStyle] = useState({})
    const dispatch = useDispatch()

    const formChangeHandler = e => {
        setLoginData({...loginData, [e.target.name]:e.target.value})
    }

    const loginFormSubmitHandler = e => {
        e.preventDefault()
        axios
            .post('https://yourdash-api.herokuapp.com/users/login', loginData)
            .then((response) => {
                if (response.data){
                    dispatch(setAddress(response.data.streetAddress))
                    dispatch(setCurrentView('allRestaurants'))
                    dispatch(setCurrentUser(response.data))
                    localStorage.setItem('currentUser', JSON.stringify(response.data))
                    setErrorMessage('')
                } else {
                    setErrorMessage('We have no user with that username/password combination')
                }
            }, (error) => {
                setErrorMessage('We have no user with that username/password combination')
            })
    }

    useEffect(() => {
        setBackgroundStyle({backgroundImage: 'url(' + randomBackgroundUrl() + ')'})
    }, [])

    return (
        <div className='login' style={backgroundStyle}>
            <form className='middle' onSubmit={loginFormSubmitHandler}>
                <label>Username: <input type='text' name='username' onChange={formChangeHandler} required /></label>
                <label>Password: <input type='text' name='password' onChange={formChangeHandler} required /></label>
                <input type='submit' value='Log In'/>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}

export default LogIn
