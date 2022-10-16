import axios from 'axios'
import { store, authActions } from 'store'

const API_URL = process.env.REACT_APP_URL + '/api/auth'

function signup(email, password) {
	return axios
		.post(API_URL + '/signup', {
			email,
			password
		})
		.then(response => {
			authenticate(response)
			return response.data
		})
}

function login(email, password) {
	return axios
		.post(API_URL + '/login', {
			email,
			password
		})
		.then(response => {
			authenticate(response)
			return response.data
		})
}

function authenticate(response) {
	if (response.data.accessToken) {
		localStorage.setItem('user', JSON.stringify(response.data))
		store.dispatch(authActions.login(response.data))
	} else {
		throw new Error('User could not be authenticated')
	}
}

function logout() {
	localStorage.removeItem('user')
	store.dispatch(authActions.logout())
}

function getCurrentUser() {
	return store.getState().auth
}

function getStorageUser() {
	return JSON.parse(localStorage.getItem('user'))
}

export const authService = {
	signup,
	login,
	logout,
	getCurrentUser,
	getStorageUser,
	authenticate
}
