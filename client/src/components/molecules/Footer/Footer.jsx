import { string } from 'prop-types'

export const Footer = ({ data }) => {
	return (
		<div className='gray flex-col center'>
			<h2>
				{data.text}
				{data.link}
			</h2>
		</div>
	)
}

Footer.propTypes = {
	data: {
		text: string.isRequired,
		link: string.isRequired
	}
}
