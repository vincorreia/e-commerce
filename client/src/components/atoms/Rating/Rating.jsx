import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export const Rating = ({ preset, size = 20, rating, setRating }) => {
	const [hover, setHover] = useState(null)

	return (
		<div className='rating'>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1

				if (preset) {
					return (
						<label key={i}>
							<FaStar
								size={size}
								color={ratingValue <= preset ? '#ffc107' : '#e4e5e9'}
							/>
						</label>
					)
				}
				return (
					<label key={i}>
						<input
							type='radio'
							name='rating'
							value={ratingValue}
							onClick={() => {
								if (rating === ratingValue) {
									setRating(0)
								} else {
									setRating(ratingValue)
								}
							}}
						/>
						<FaStar
							className='star'
							size={size}
							color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
							onMouseOver={() => setHover(ratingValue)}
							onMouseOut={() => setHover(null)}
						/>
					</label>
				)
			})}
		</div>
	)
}
