import { PriceTag } from 'components/atoms'
export const PurchaseItem = ({ price, items, id }) => {
	return (
		<li className='purchase-item'>
			<p>Purchase ID: {id}</p>
			<PriceTag price={price} />
			<div className='flex-row purchase-item-image-wrapper'>
				{items.map(item => (
					<img
						className='purchase-item-image'
						src={item.image}
						alt={item.name}
					/>
				))}
			</div>
		</li>
	)
}
