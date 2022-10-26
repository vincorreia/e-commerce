import { useSelector } from 'react-redux'
import { ButtonBuyNow, NotFound } from 'components/atoms'
import { CartItem } from 'components/molecules'
import { bool, func } from 'prop-types'
import { createPortal } from 'react-dom'
import { Transition } from '@headlessui/react'

export const Cart = ({ cartOpen, setCartOpen }) => {
	const cart = useSelector(state => state.cart)
	const cartItems = Object.entries(cart.items).map(item => item[1])
	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.amount,
		0
	)

	return createPortal(
		<Transition
			className='flex-row cart'
			show={cartOpen}
			appear={true}
			unmount={true}
		>
			<Transition.Child
				enter='transition-opacity'
				enterFrom='opacity-0'
				enterTo='opacity-50'
				leave='transition-opacity'
				leaveFrom='opacity-50'
				leaveTo='opacity-0'
				className='blackout'
				onClick={() => setCartOpen(prevValue => !prevValue)}
			/>
			<Transition.Child
				className='flex-col cart-wrapper'
				enter='transition-x'
				enterFrom='left-100'
				enterTo='left-0'
				leave='transition-x'
				leaveFrom='left-0'
				leaveTo='left-100'
			>
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
			</Transition.Child>
		</Transition>,
		document.getElementById('root')
	)
}

Cart.propTypes = {
	cartOpen: bool,
	setCartOpen: func
}
