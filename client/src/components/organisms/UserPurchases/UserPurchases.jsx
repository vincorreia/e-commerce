import { useEffect, useState } from 'react'
import { userService } from 'services'
import { Spinner, NotFound } from 'components/atoms'
import { PurchaseList } from 'components/molecules'
import { bool } from 'prop-types'

export const UserPurchases = ({ refreshed }) => {
	const [loading, setLoading] = useState(true)
	const [purchases, setPurchases] = useState([])
	useEffect(() => {
		if (refreshed) {
			userService.getUserPurchases().then(response => {
				setPurchases(response.data)
				setLoading(false)
			})
		}
	}, [refreshed])
	return (
		<section className='profile-purchases profile-section'>
			{loading ? (
				<Spinner size='small' />
			) : (
				<>
					<h2 className='profile-section-title'>Your Purchases</h2>
					{purchases.length ? (
						<PurchaseList purchases={purchases} />
					) : (
						<NotFound page='profile' />
					)}
				</>
			)}
		</section>
	)
}

UserPurchases.propTypes = {
	refreshed: bool
}
