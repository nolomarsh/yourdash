import {useSelector, useDispatch} from 'react-redux'

const RestaurantCard = props => {

    return (
        <p>{props.restaurant.restaurant_name}</p>
    )
}

export default RestaurantCard
