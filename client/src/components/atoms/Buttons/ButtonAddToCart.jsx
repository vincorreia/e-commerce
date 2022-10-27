import { ProductI } from 'interfaces'
import { string } from 'prop-types'
import { cartServices } from 'services'

export const ButtonAddToCart = ({ product, color = 'allow' }) => {
	const handleClick = () => {
		cartServices.addToCart(product)
	}
	return (
		<button className={color} onClick={handleClick}>
			Add to Cart
		</button>
	)
}

ButtonAddToCart.propTypes = {
	product: ProductI,
	color: string
}
