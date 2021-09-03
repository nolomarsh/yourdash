import { useDispatch } from 'react-redux'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const ShowRestaurant = props => {
    const dispatch = useDispatch()

    const returnToIndex = () => {
        dispatch(setCurrentView('allRestaurants'))
        props.setShowRestaurant({})
    }

    return (
        <>
            <h1>{props.restaurant.restaurant_name}</h1>
            <button onClick={returnToIndex}>Back</button>
        </>
    )
}

export default ShowRestaurant
