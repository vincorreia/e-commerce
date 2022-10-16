import './App.scss'
import { Nav } from 'components/molecules'
import {
	Home,
	Store,
	Cart,
	Profile,
	ProductPage,
	UpdateProduct,
	Login,
	Signup
} from 'pages'
import Layout from './components/Layout'
import { useEffect } from 'react'
import { authService, cartServices } from 'services'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions, cartActions } from 'store'

function App() {
	let location = useLocation().pathname
	const dispatch = useDispatch()
	if (location === '/') {
		location = 'home'
	} else {
		location = location.slice(1)
	}

	useEffect(() => {
		const user = authService.getStorageUser()
		const cart = cartServices.getStorageCart()
		try {
			if (user.accessToken.length) {
				dispatch(authActions.login(user))
			}
		} catch {}
		try {
			if (cart.length) {
				dispatch(cartActions.setCart(cart))
			}
		} catch {}
	}, [dispatch])

	return (
		<div className={'App ' + location}>
			<main className='main'>
				<Nav />
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='products' element={<Store />} />
						<Route path='products/:id' element={<ProductPage />} />
						<Route path='products/:id/update' element={<UpdateProduct />} />
						<Route path='cart' element={<Cart />} />
						<Route path='login' element={<Login />} />
						<Route path='signup' element={<Signup />} />
						<Route path='profile' element={<Profile />} />
					</Route>
				</Routes>
			</main>
		</div>
	)
}

export default App
