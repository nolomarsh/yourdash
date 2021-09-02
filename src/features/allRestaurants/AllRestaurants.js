import { useState, useEffect } from 'react'
import Documenu from 'documenu'
import { setData, selectAllRestaurants } from './allRestaurantsSlice.js'
import { useSelector, useDispatch } from 'react-redux'

import Restaurant from '../../components/Restaurant'

const AllRestaurants = props => {
    const [pageNum, setPageNum] = useState(1)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(selectAllRestaurants)

    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const getRestaurantsByZip = zipCode => {
        Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true, size:50, page:pageNum})
        .then((response) => {
            dispatch(setData(response.data))
            setPageNum(pageNum + 1)
        })
    }

    useEffect(() => {
        getRestaurantsByZip(49002)
    }, [])

    return (
        <div id='allRestaurantContainer'>
            {allRestaurants.map((restaurant) => {return(
                <Restaurant
                    restaurant={restaurant}
                    key={restaurant.restaurant_id}
                />
            )})}
        </div>
    )
}

export default AllRestaurants
