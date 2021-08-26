
import './App.css'
import Documenu from 'documenu'

const App = () => {
    Documenu.configure('d51fb5ef4342fbe99b76d644f8000896')

    const getRestaurantsByZip = zipCode => {
        Documenu.Restaurants.getByZipCode(zipCode, {fullmenu: true})
        .then((response) => {
            console.log(response.data)
        })
    }

    const getMenuItemsByGeo = (lat, lon, distance) => {
        Documenu.MenuItems.searchGeo(lat, lon, distance)
        .then((response) => {
            console.log(response.data)
        })
    }


    return (
        <>
        <h1>Hello World</h1>
        <button onClick={()=>getRestaurantsByZip('49002')}>test 1</button>
        <button onClick={()=>getMenuItemsByGeo(42.238443,-85.589471,1)}>test2</button>
        </>
    )
}

export default App;
