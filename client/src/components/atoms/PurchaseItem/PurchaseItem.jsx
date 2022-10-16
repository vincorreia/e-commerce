import { PriceTag } from 'components/atoms'
import { ProductI } from 'interfaces'
import { arrayOf, number } from 'prop-types'
export const PurchaseItem = ({ price, items, id }) => {
	return (
		<li className='purchase-item'>
			<p>Purchase ID: {id}</p>
			<PriceTag price={price} />
			<div className='flex-row purchase-item-image-wrapper'>
				{items.map((item, i) => (
					<img
						className='purchase-item-image'
						src={item.image}
						alt={item.name}
						key={i}
					/>
				))}
			</div>
		</li>
	)
}

PurchaseItem.propTypes = {
	price: number.isRequired,
	items: arrayOf(ProductI).isRequired,
	id: number.isRequired
}
