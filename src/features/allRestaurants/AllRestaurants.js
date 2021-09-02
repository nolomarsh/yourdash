import { useEffect } from 'react'
import Documenu from 'documenu'
import { selectAllRestaurants, setRestaurantsByZip } from './allRestaurantsSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentZip } from '../currentZip/currentZipSlice.js'

import RestaurantCard from './RestaurantCard'



const AllRestaurants = props => {
    // const [pageNum, setPageNum] = useState(1)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(selectAllRestaurants)
    const currentZip = useSelector(selectCurrentZip)

    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    // const getRestaurantsByZip = zipCode => {
    //     Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true})
    //     .then((response) => {
    //         dispatch(setData(response.data))
    //     })
    // }

    useEffect(() => {
        setRestaurantsByZip(currentZip, dispatch)
    }, [])

    return (
        <div id='allRestaurantContainer'>
            {allRestaurants.map((restaurant) => {return(
                <RestaurantCard
                    restaurant={restaurant}
                    key={restaurant.restaurant_id}
                />
            )})}
        </div>
    )
}

export default AllRestaurants
