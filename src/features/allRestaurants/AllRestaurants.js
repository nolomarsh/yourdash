import { useEffect } from 'react'
import Documenu from 'documenu'
import { selectAllRestaurants, setRestaurants, extendRestaurants } from './allRestaurantsSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentZip } from '../currentZip/currentZipSlice.js'

import RestaurantCard from './RestaurantCard'



const AllRestaurants = props => {
    // const [pageNum, setPageNum] = useState(1)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(selectAllRestaurants)
    const currentZip = useSelector(selectCurrentZip)

    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const getRestaurantsByZip = (zipCode, page = 1) => {
        Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true, page: page, size: 50})
        .then((response) => {
            if (page === 1) {
                dispatch(setRestaurants(response.data))
                console.log(response)
            } else {
                dispatch(extendRestaurants(response.data))
                console.log(response)
            }
            // if(response.more_pages){
            //     getRestaurantsByZip(zipCode, page+1)
            // }
        })
    }

    useEffect(() => {
        getRestaurantsByZip(currentZip)
    }, [])

    return (
        <div id='allRestaurantContainer'>
            {allRestaurants.map((restaurant) => {return(
                <RestaurantCard
                    restaurant={restaurant}
                    key={restaurant.restaurant_id}
                    setShowRestaurant={props.setShowRestaurant}
                />
            )})}
        </div>
    )
}

export default AllRestaurants
