import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from 'store'

export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const isAuthenticated = auth.isAuthenticated

	return (
		<div className='sectionContainer flex-row center'>
			<div className='mainText flex-col center'>
				<h1>Welcome to Watches</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
					aliquam condimentum malesuada.
				</p>
				<div className='flex-row center'>
					{!isAuthenticated ? (
						<>
							<button
								className='primary'
								onClick={() => {
									navigate('/signup')
								}}
							>
								Sign Up!
							</button>
							<button
								className='dark'
								onClick={() => {
									navigate('/login')
								}}
							>
								Login
							</button>
						</>
					) : (
						<>
							<button
								className='primary'
								onClick={() => {
									navigate('/profile')
								}}
							>
								Profile
							</button>
							<button
								className='dark'
								onClick={() => {
									dispatch(authActions.logout())
								}}
							>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
