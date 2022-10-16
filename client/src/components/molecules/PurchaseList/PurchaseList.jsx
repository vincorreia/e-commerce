import { PurchaseItem } from 'components/atoms'
import { ProductI } from 'interfaces'
import { arrayOf, number, string } from 'prop-types'

export const PurchaseList = ({ purchases }) => {
	return (
		<ul className='purchase-list'>
			{purchases.map(purchase => {
				return (
					<PurchaseItem
						key={purchase.id}
						price={purchase.price}
						items={purchase.items}
						id={purchase.id}
					/>
				)
			})}
		</ul>
	)
}

PurchaseList.propTypes = {
	purchases: {
		id: string.isRequired,
		price: number.isRequired,
		items: arrayOf(ProductI).isRequired
	}
}
