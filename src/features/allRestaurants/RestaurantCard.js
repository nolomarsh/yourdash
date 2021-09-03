import {useSelector, useDispatch} from 'react-redux'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const RestaurantCard = props => {
    const dispatch = useDispatch()

    const openShow = () => {
        props.setShowRestaurant(props.restaurant)
        dispatch(setCurrentView('showRestaurant'))
    }

    return (
        <p onClick={openShow}>{props.restaurant.restaurant_name}</p>
    )
}

export default RestaurantCard
