import {
	ButtonAddToCart,
	ButtonBuyNow,
	ButtonSoldOut,
	PriceTag
} from 'components/atoms'

export const PurchaseBox = ({ product }) => {
	const stockMessage =
		product.stock > 10
			? 'In stock'
			: product.stock === 0
			? 'Sold out!'
			: 'Hurry up! Only ' + product.stock + ' left!'

	return (
		<section className='purchase-box flex-col wrap'>
			<PriceTag price={product.price} />
			<span>
				Purchase now and receive <strong>in the next 24 hours!</strong>
			</span>
			<span className={product.stock > 10 ? 'allow' : 'deny'}>
				{stockMessage}
			</span>
			<div className='button-wrapper flex-col'>
				{product.stock ? (
					<>
						<ButtonAddToCart product={product} color='primary' />
						<ButtonBuyNow
							items={[product]}
							price={product.price}
							color='allow'
						/>
					</>
				) : (
					<ButtonSoldOut />
				)}
			</div>
			<span>
				<strong>Refund policy:</strong>
				<br />
				Products are non-refundable by default. <br />
				You may contact Watches user support at hello@watches.com
				<br />
				if there is any incidence with the retrieval of the product.
			</span>
		</section>
	)
}

export default PurchaseBox
