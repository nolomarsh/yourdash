import {useSelector, useDispatch} from 'react-redux'

const Restaurant = props => {

    return (
        <p>{props.restaurant.restaurant_name}</p>
    )
}

export default Restaurant
