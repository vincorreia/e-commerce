import { string } from 'prop-types'

export const NotFound = ({ page = '' }) => {
	return (
		<div className={'not-found ' + page}>
			<h1>No results found 😔</h1>
		</div>
	)
}

NotFound.propTypes = {
	page: string
}
