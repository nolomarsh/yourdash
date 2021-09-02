import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// import { setCurrentView } from '../currentView/currentViewSlice.js'
import { setCurrentZip } from '../currentZip/currentZipSlice.js'
import { setCurrentUser } from '../currentUser/currentUserSlice.js'
import { selectAllUsers, setUsers, addUser } from './allUsersSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const SignUp = () => {
    const dispatch = useDispatch()
    const allUsers = useSelector(selectAllUsers)

    const [newUser, setNewUser] = useState({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

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
                        dispatch(setCurrentZip(response.data.zipCode))
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
    },[])

    return (
        <div className='login'>
            <form onSubmit={signupFormSubmitHandler}>
                <label>Username: <input type='text' name='username' onChange={formChangeHandler} required /></label>
                <label>Password: <input type='password' name='password' onChange={formChangeHandler} required /></label>
                <label>Password: <input type='password' onChange={confirmPasswordHandler} required /></label>
                <label>Street Address: <input type='text' name='streetAddress' onChange={formChangeHandler} /></label>
                <label>Zip Code: <input type='number' name='zipCode' onChange={formChangeHandler} required /></label>
                <input type='submit' value='Sign Up'/>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}

export default SignUp
