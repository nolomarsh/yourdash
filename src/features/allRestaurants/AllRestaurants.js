import { useState, useEffect } from 'react'
import Documenu from 'documenu'
import axios from 'axios'
import { selectAllRestaurants, setRestaurants, extendRestaurants } from './allRestaurantsSlice.js'
import { useSelector, useDispatch } from 'react-redux'
// import { selectCurrentZip } from '../currentZip/currentZipSlice.js'
import { selectCurrentAddress } from '../currentAddress/currentAddressSlice.js'
import { selectSearchParams, setCoords, setDistance } from '../searchParams/searchParamsSlice.js'

import RestaurantCard from './RestaurantCard'

const AllRestaurants = props => {
    // const [pageNum, setPageNum] = useState(1)
    const dispatch = useDispatch()
    const allRestaurants = useSelector(selectAllRestaurants)
    // const currentZip = useSelector(selectCurrentZip)
    const currentAddress = useSelector(selectCurrentAddress)
    const searchParams = useSelector(selectSearchParams)
    const [cuisinesArray, setCuisinesArray] = useState([])

    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const setRestaurantsByAddress = (address) => {
        let mapboxToken = 'pk.eyJ1Ijoibm9sb21hcnNoIiwiYSI6ImNrdDNoNmljMTA3aDYycHI3amF6eGFlc2QifQ.56OPfWNnYkk6Ut8lskQ6Ug'
        axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.split(' ').join('%20')}.json?access_token=${mapboxToken}`)
            .then((response) => {
                let coordinates = response.data.features[0].geometry.coordinates
                dispatch(setCoords(coordinates))
                setRestaurantsByCoordinates(coordinates, searchParams.distance)
                getCuisinesByCoordinates(coordinates, searchParams.distance)
            })
    }

    const setRestaurantsByCoordinates = (coords, distance, page=1) => {
        Documenu.Restaurants.searchGeo({lat: coords[1], lon: coords[0], distance: distance, page: page, fullmenu: true, size: 100})
        .then((response) => {
            if (page === 1) {
                dispatch(setRestaurants(response.data))
            } else {
                dispatch(extendRestaurants(response.data))
            }
            if(response.more_pages){
                setRestaurantsByCoordinates(coords, distance, page+1)
            }
        })
    }

    const getCuisinesByCoordinates = (coords, distance) => {
        axios
            .get(`https://api.documenu.com/v2/restaurants/search/geo?lat=${coords[1]}&lon=${coords[0]}&distance=${distance}&top_cuisines=true&key=d51fb5ef4342fbe99b76d644f8000896`)
            .then((response) => {
                setCuisinesArray(response.data.data)
            })
    }

    const handleDistanceChange = e => {
        if (e.target.value >= 1) {
            dispatch(setDistance(e.target.value))
            setRestaurantsByCoordinates([searchParams.lon, searchParams.lat], e.target.value)
        }
    }

    useEffect(() => {
        setRestaurantsByAddress(currentAddress)
    }, [])

    return (
        <div className='allRestaurants'>
            <p>Showing results for {currentAddress} within <input className='smallInput' type='number' placeholder={searchParams.distance} onChange={handleDistanceChange}/> miles</p>
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
