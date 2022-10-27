import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_URL + '/api/purchase'

const createPurchase = (
	payload = {
		items: [],
		price: 0
	}
) => {
	return axios.post(API_URL + '/create', payload, { headers: authHeader() })
}

export const purchaseService = {
	createPurchase
}
