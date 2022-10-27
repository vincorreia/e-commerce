import { number } from 'prop-types'
import { formatPrice } from 'utils'

export const PriceTag = ({ price }) => {
	return (
		<span className='price'>
			<span className='sign'>US$</span>
			{formatPrice(price)}
			<span className='cents'>00</span>
		</span>
	)
}

PriceTag.propTypes = {
	price: number.isRequired
}
