import { configureStore } from '@reduxjs/toolkit'
import { cartReducer, authReducer } from './slices'
export const store = configureStore({
	reducer: { cart: cartReducer, auth: authReducer }
})
