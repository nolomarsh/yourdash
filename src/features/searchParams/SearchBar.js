import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Documenu from 'documenu'

import { selectSearchParams, setCoords } from './searchParamsSlice.js'
import { setAddress } from '../currentAddress/currentAddressSlice.js'
import { setRestaurants, extendRestaurants } from '../allRestaurants/allRestaurantsSlice.js'
import { setCurrentView } from '../currentView/currentViewSlice.js'


const SearchBar = () => {
    const dispatch = useDispatch()
    const searchParams = useSelector(selectSearchParams)
    // const currentAddress = useSelector(selectCurrentAddress)

    const [newAddress, setNewAddress] = useState('')

    const handleAddressChange = e => {
        setNewAddress(e.target.value)
    }

    const setRestaurantsByAddress = (address) => {
        let mapboxToken = 'pk.eyJ1Ijoibm9sb21hcnNoIiwiYSI6ImNrdDNoNmljMTA3aDYycHI3amF6eGFlc2QifQ.56OPfWNnYkk6Ut8lskQ6Ug'
        axios
            .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.split(' ').join('%20')}.json?access_token=${mapboxToken}`)
            .then((response) => {
                let coordinates = response.data.features[0].geometry.coordinates
                dispatch(setCoords(coordinates))
                setRestaurantsByCoordinates(coordinates, searchParams.distance)
            })
    }

    const setRestaurantsByCoordinates = (coords, distance, page=1) => {
        Documenu.Restaurants.searchGeo({lat: coords[1], lon: coords[0], distance: distance, page: page, fullmenu: true, size: 100})
        .then((response) => {
            console.log(response)
            if (page === 1) {
                dispatch(setRestaurants(response.data))
                dispatch(setCurrentView('allRestaurants'))
            } else {
                dispatch(extendRestaurants(response.data))
            }
            // if(response.more_pages){
            //     getRestaurantsByZip(zipCode, page+1)
            // }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setAddress(newAddress))
        setRestaurantsByAddress(newAddress)
        dispatch(setCurrentView('allRestaurants'))
    }


    return (
        <form className='roundBar' onSubmit={handleSubmit}>
            <input type='text' onChange={handleAddressChange}/>
            <input type='submit' value='Search' />
        </form>
    )
}

export default SearchBar
