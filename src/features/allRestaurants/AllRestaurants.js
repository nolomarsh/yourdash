import { useState, useEffect } from 'react'
import Documenu from 'documenu'
import axios from 'axios'
import { selectAllRestaurants, setRestaurants, extendRestaurants } from './allRestaurantsSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentZip } from '../currentZip/currentZipSlice.js'

import RestaurantCard from './RestaurantCard'



const AllRestaurants = props => {
    // const [pageNum, setPageNum] = useState(1)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(selectAllRestaurants)
    const currentZip = useSelector(selectCurrentZip)
    const [cuisinesArray, setCuisinesArray] = useState([])

    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const getRestaurantsByZip = (zipCode, page = 1) => {
        Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true, page: page, size: 50})
        .then((response) => {
            if (page === 1) {
                dispatch(setRestaurants(response.data))
            } else {
                dispatch(extendRestaurants(response.data))
            }
            // if(response.more_pages){
            //     getRestaurantsByZip(zipCode, page+1)
            // }
        })
    }

    const getCuisinesByZip = zipCode => {
        axios
            .get('https://api.documenu.com/v2/restaurants/zip_code/49002?top_cuisines=true&key=d51fb5ef4342fbe99b76d644f8000896')
            .then((response) => {
                setCuisinesArray(response.data.data)
            })
    }

    useEffect(() => {
        getRestaurantsByZip(currentZip)
        getCuisinesByZip(currentZip)
    }, [])

    return (
        <div className='allRestaurants'>
            {cuisinesArray.filter((cuisine) => {return cuisine.matching_docs >= 3 && cuisine.cuisine}).map((cuisine, index) => {
                    return(
                        <>
                        <h1>{cuisine.cuisine}</h1>
                        <div className='restaurantsContainer'>
                            {allRestaurants.filter(restaurant => restaurant.cuisines.includes(cuisine.cuisine)).map((restaurant, index) => {
                                return(
                                    <RestaurantCard
                                        restaurant={restaurant}
                                        key={restaurant.restaurant_id}
                                        setShowRestaurant={props.setShowRestaurant}
                                    />
                                )
                            })}
                        </div>
                        </>
                    )
            })}
            <h1>All Restaurants</h1>
            <div className='restaurantsContainer'>
                {allRestaurants.map((restaurant) => {return(
                    <RestaurantCard
                        restaurant={restaurant}
                        key={restaurant.restaurant_id}
                        setShowRestaurant={props.setShowRestaurant}
                    />
                )})}
            </div>
        </div>
    )
}

export default AllRestaurants
