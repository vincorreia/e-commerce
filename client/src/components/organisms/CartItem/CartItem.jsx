import { cartServices } from 'services'
import { formatPrice } from 'utils'
import { ButtonAddToCart } from 'components/atoms'

export const CartItem = ({ item }) => {
	return (
		<div className='cart-item flex-row space-between'>
			<div className='flex-row'>
				<img src={item.image} alt={item.name} className='item-image' />
				<div className='item-details flex-col center'>
					<h2 className='item-name'>{item.name}</h2>
					<p>Amount: {item.amount}</p>
					<div className='button-wrapper flex-row center'>
						<ButtonAddToCart product={item} color='allow' />
						<button
							className='simple'
							onClick={() => {
								cartServices.removeFromCart(item)
							}}
						>
							Remove one
						</button>
					</div>
				</div>
			</div>
			<div className='flex-col'>
				<p className='price'>
					{'$' + formatPrice(item.price * item.amount) + '.00'}
				</p>
				<p className='unit-price'>
					{'($' + formatPrice(item.price) + '.00/u)'}
				</p>
			</div>
		</div>
	)
}
