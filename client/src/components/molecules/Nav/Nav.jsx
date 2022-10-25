import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Cart } from 'components/organisms'

export const Nav = () => {
	const cart = useSelector(state => state.cart)
	const auth = useSelector(state => state.auth)
	const isAuthenticated = auth.isAuthenticated

	const [cartOpen, setCartOpen] = useState(false)
	const handleOpenCart = e => {
		e.preventDefault()
		setCartOpen(prevValue => !prevValue)
	}
	return (
		<>
			<nav className={`flex-row space-around nav${cartOpen ? ' black' : ''}`}>
				<div className='flex-row center'>
					<NavLink className='brand' to='/'>
						Watches
					</NavLink>
				</div>
				<div className='profile-section flex-row'>
					<NavLink className='nav-link' to='/products'>
						STORE
					</NavLink>
					{isAuthenticated ? (
						<NavLink className='nav-link' to='/profile'>
							PROFILE
						</NavLink>
					) : (
						<>
							<NavLink className='nav-link' to='/login'>
								LOGIN
							</NavLink>
							<NavLink className='nav-link' to='/signup'>
								SIGN UP
							</NavLink>
						</>
					)}
					<button
						className={`nav-link ${cartOpen ? 'active' : ''}`}
						onClick={handleOpenCart}
					>
						<span>CART</span>
						<span className={cart.length > 0 ? 'amount' : 'amount hidden'}>
							{cart.length}
						</span>
					</button>
				</div>
			</nav>
			<Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
		</>
	)
}
