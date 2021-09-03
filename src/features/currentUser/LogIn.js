import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './currentUserSlice.js'
import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const LogIn = () => {
    const [loginData, setLoginData] = useState({username:'', password:''})
    const [errorMessage, setErrorMessage] = useState('')
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
                    dispatch(setCurrentZip(response.data.zipCode))
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

    return (
        <div className='login'>
            <form onSubmit={loginFormSubmitHandler}>
                <label>Username: <input type='text' name='username' onChange={formChangeHandler} required /></label>
                <label>Password: <input type='text' name='password' onChange={formChangeHandler} required /></label>
                <input type='submit' value='Log In'/>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}

export default LogIn
