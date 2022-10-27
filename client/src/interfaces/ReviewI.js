import { arrayOf, number, string } from 'prop-types'

export const ReviewI = {
	rating: number.isRequired,
	content: string
}

export const ReviewContainerI = {
	rating: number,
	reviews: arrayOf(ReviewI)
}
