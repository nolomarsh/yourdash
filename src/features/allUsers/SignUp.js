import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// import { setCurrentView } from '../currentView/currentViewSlice.js'
// import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setAddress } from '../currentAddress/currentAddressSlice.js'
import { setCurrentUser } from '../currentUser/currentUserSlice.js'
import { selectAllUsers, setUsers, addUser } from './allUsersSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'
import { randomBackgroundUrl } from '../../images/images.js'

const SignUp = () => {
    const dispatch = useDispatch()
    const allUsers = useSelector(selectAllUsers)

    const [newUser, setNewUser] = useState({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [backgroundStyle, setBackgroundStyle] = useState({})

    const formChangeHandler = e => {
        setNewUser({...newUser, [e.target.name]:e.target.value})
    }

    const confirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const signupFormSubmitHandler = e => {
        e.preventDefault()
        if (newUser.password === confirmPassword){
            axios
                .post('https://yourdash-api.herokuapp.com/users', newUser)
                .then((response) => {
                        dispatch(addUser(response.data))
                        dispatch(setCurrentUser(response.data))
                        dispatch(setAddress(response.data.streetAddress))
                        setErrorMessage('')
                        setCurrentView('allRestaurants')
                        localStorage.setItem('currentUser', JSON.stringify(response.data))
                    },(error) => {
                        if (allUsers.map(user => user.username).includes(newUser.username)) {
                            setErrorMessage('That username is taken.')
                        }
                    }
            )
        }
    }

    const loadUsers = () => {
        axios
            .get('https://yourdash-api.herokuapp.com/users')
            // .get('http://localhost:8080/users')
            .then((response) => {
                dispatch(setUsers(response.data))
            })
    }

    useEffect(() => {
        loadUsers()
        setBackgroundStyle({backgroundImage: 'url(' + randomBackgroundUrl() + ')'})
    },[])

    return (
        <div className='signup background' style={backgroundStyle}>
            <form onSubmit={signupFormSubmitHandler} className='middle'>
                <label htmlFor='username'>Username: </label>
                <input id='username' type='text' name='username' onChange={formChangeHandler} required />
                <label htmlFor='password'>Password: </label>
                <input id='password' type='password' name='password' onChange={formChangeHandler} required />
                <label htmlFor='confirmPassword'>Password: </label>
                <input id='confirmPassword' type='password' onChange={confirmPasswordHandler} required />
                <label htmlFor='address'>Street Address: </label>
                <input id='address' type='text' name='streetAddress' onChange={formChangeHandler} required />
                <input type='submit' className='button' value='Sign Up'/>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}

export default SignUp
