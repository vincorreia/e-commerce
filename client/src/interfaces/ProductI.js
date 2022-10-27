import { arrayOf, number, string } from 'prop-types'

export const ProductI = {
	tags: arrayOf(string).isRequired,
	price: number.isRequired,
	stock: number.isRequired
}
