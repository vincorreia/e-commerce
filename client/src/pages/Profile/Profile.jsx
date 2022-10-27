import { useEffect, useState } from 'react'
import { useRefreshToken } from 'hooks'
import { UserReviews, UserDetails, UserPurchases } from 'components/organisms'

export const Profile = () => {
	const [refreshed, setRefreshed] = useState(false)
	const refreshToken = useRefreshToken()

	useEffect(() => {
		refreshToken().then(() => {
			setRefreshed(true)
		})
	}, [])

	return (
		<div className='sectionContainer flex-row center'>
			<div className='profile-page'>
				<UserDetails refreshed={refreshed} />
				<UserReviews refreshed={refreshed} />
				<UserPurchases refreshed={refreshed} />
			</div>
		</div>
	)
}
