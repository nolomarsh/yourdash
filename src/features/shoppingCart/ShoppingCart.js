import { selectShoppingCart, removeItemFromCart, addItemToCart } from './shoppingCartSlice.js'
import { useSelector, useDispatch } from 'react-redux'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const shoppingCart = useSelector(selectShoppingCart)

    const handleRemoveFromCart = item => {
        dispatch(removeItemFromCart(item))
    }

    const handleAddToCart = item => {
        dispatch(addItemToCart(item))
    }

    const cartTotal = () => {
        let sum = 0
        for (let item of shoppingCart) {
            sum += Number(item.price.slice(1)) * item.count
        }
        return sum
    }

    return(
        <div className='shoppingCart'>
            <table>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            {shoppingCart.map(item => {
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                            <span className='cartBtn' onClick={() => {handleRemoveFromCart(item)}}>-</span>
                        {item.count}
                            <span className='cartBtn' onClick={() => {handleAddToCart(item)}}>+</span>
                        </td>
                    </tr>
                )
            })}
                <tr>
                    <th className='total'>Total: </th>
                    <td className='total'>${cartTotal()}</td>
                    <td> </td>
                </tr>
            </table>
        </div>
    )
}

export default ShoppingCart
