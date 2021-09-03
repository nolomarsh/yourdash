import { useSelector, useDispatch } from 'react-redux'
import { setCurrentView } from '../currentView/currentViewSlice.js'
import { randomImageUrl } from '../../images/images.js'

const RestaurantCard = props => {
    const dispatch = useDispatch()
    const restaurant = props.restaurant
    const address = restaurant.address

    const openShow = () => {
        props.setShowRestaurant(restaurant)
        dispatch(setCurrentView('showRestaurant'))
    }

    return (
        <div className='restaurantCard' onClick={openShow}>
            <img src={randomImageUrl()} />
            <div className='cardBody'>
                <h3>{restaurant.restaurant_name}</h3>
                <p>{restaurant.cuisines.join(', ')}</p>
                <p>{restaurant.price_range}</p>
                <p>{restaurant.restaurant_phone}</p>
            </div>
        </div>
    )
}

export default RestaurantCard
