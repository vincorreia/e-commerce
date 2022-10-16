import { Footer, AuthForm } from 'components/molecules'
import { arrayOf, func, string } from 'prop-types'

export const FormCard = ({
	fields,
	footer,
	header,
	func,
	location,
	buttonTxt
}) => {
	return (
		<div className='sectionContainer flex-col flex-start form'>
			<div className='form-card flex-col'>
				<h1>{header}</h1>
				<AuthForm
					fields={fields}
					func={func}
					location={location}
					buttonTxt={buttonTxt}
				/>
			</div>
			<Footer data={footer} />
		</div>
	)
}

FormCard.propTypes = {
	fields: arrayOf({
		type: string.isRequired,
		title: string.isRequired,
		placeholder: string
	}).isRequired,
	buttonTxt: string.isRequired,
	func: func.isRequired,
	location: {
		state: {
			err: string
		},
		pathname: string.isRequired
	},
	footer: string.isRequired,
	header: string.isRequired
}
