import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentView } from '../currentView/currentViewSlice.js'

const ShowRestaurant = props => {
    const dispatch = useDispatch()
    const restaurant = props.restaurant
    const address = restaurant.address
    const [menuView, setMenuView] = useState(0)

    const returnToIndex = () => {
        dispatch(setCurrentView('allRestaurants'))
        props.setShowRestaurant({})
    }

    const selectChangeHandler = e => {
        setMenuView(parseInt(e.target.value))
    }

    const scrollButtonHandler = e => {
        document.getElementById(e.target.name).scrollIntoView({behavior:'smooth'})
    }

    return (
        <div className='showRestaurant'>
            <h1>{restaurant.restaurant_name}</h1>
            <p>{address.street} {address.city[0]+address.city.slice(1).toLowerCase()}, {address.state} {address.postal_code}</p>
            <select onChange={selectChangeHandler}>
                {restaurant.menus.map((menu, index) => {
                    return(
                        <option key={index} value={index}>{menu.menu_name}</option>
                    )
                })}
            </select>
            <div className='btnBox'>
                {restaurant.menus[menuView].menu_sections.map((section, index) => {
                    return(
                        <button onClick={scrollButtonHandler} name={section.section_name}>{section.section_name}</button>
                    )
                })}
            </div>
            {restaurant.menus[menuView].menu_sections.map((section, index) => {
                return(
                    <MenuSection key={index} section={section} />
                )
            })}
        </div>
    )
}


const MenuSection = props => {
    const section = props.section

    return (
        <div className='menu' id={section.section_name}>
            <h2>{section.section_name}</h2>
            <div className='menuItemContainer'>
                {section.menu_items.map((item) => {
                    return(
                        <div className='menuItem'>
                            <h3>{item.name} - ${item.price}</h3>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShowRestaurant
