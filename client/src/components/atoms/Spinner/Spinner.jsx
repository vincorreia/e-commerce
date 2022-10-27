import { string } from 'prop-types'

export const Spinner = ({ size = 'default' }) => {
	return (
		<div className={'spinner ' + size}>
			<div />
			<div />
		</div>
	)
}

Spinner.propTypes = {
	size: string
}
