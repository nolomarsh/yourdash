import { useSelector, useDispatch } from 'react-redux'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const RestaurantCard = props => {
    const dispatch = useDispatch()
    const restaurant = props.restaurant

    const openShow = () => {
        props.setShowRestaurant(restaurant)
        dispatch(setCurrentView('showRestaurant'))
    }

    return (
        <>
            <p onClick={openShow}>{restaurant.restaurant_name}</p>

        </>
    )
}

export default RestaurantCard
