import { useState, useEffect } from 'react'
import { userService } from 'services'
import { NotFound, Spinner } from 'components/atoms'
import { Reviews } from 'components/molecules'

export const UserReviews = ({ refreshed }) => {
	const [loading, setLoading] = useState(true)
	const [reviews, setReviews] = useState()

	useEffect(() => {
		if (refreshed) {
			userService.getUserReviews().then(response => {
				setReviews(response.data)
				setLoading(false)
			})
		}
	}, [refreshed])

	return (
		<section className='profile-reviews profile-section'>
			{loading ? (
				<Spinner size='small' />
			) : (
				<>
					<h2 className='profile-section-title'>Your Reviews</h2>
					{reviews.length ? (
						<Reviews reviews={reviews} width='50%' height='50%' />
					) : (
						<NotFound page='profile' />
					)}
				</>
			)}
		</section>
	)
}
