import { useSelector } from 'react-redux'
import { ButtonBuyNow, NotFound } from 'components/atoms'
import { CartItem } from 'components/molecules'
import { bool, func } from 'prop-types'
import { createPortal } from 'react-dom'

export const Cart = ({ cartOpen, setCartOpen }) => {
	if (cartOpen) {
		const cart = useSelector(state => state.cart)
		const cartItems = Object.entries(cart.items).map(item => item[1])
		const totalPrice = cartItems.reduce(
			(sum, item) => sum + item.price * item.amount,
			0
		)

		return createPortal(
			<div className='flex-row center cart'>
				<div className='flex-col cart-wrapper'>
					<div className='cart-products flex-col'>
						{cartItems.length ? (
							cartItems.map((item, i) => {
								return <CartItem key={i} item={item} />
							})
						) : (
							<NotFound page='cart' />
						)}
					</div>
					<div className='checkout-details flex-row space-around'>
						<ButtonBuyNow
							items={cartItems}
							price={totalPrice}
							color='allow'
							clear={true}
						/>
						<p>Total price: {cartItems ? '$' + totalPrice + '.00' : '0.00'}</p>
					</div>
				</div>
				<div
					className='blackout'
					onClick={() => setCartOpen(prevValue => !prevValue)}
				></div>
			</div>,
			document.getElementById('root')
		)
	} else {
		return null
	}
}

Cart.propTypes = {
	cartOpen: bool,
	setCartOpen: func
}
