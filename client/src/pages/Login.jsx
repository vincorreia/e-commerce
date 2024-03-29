import { FormCard } from 'components/organisms'
import { Link, useLocation } from 'react-router-dom'
import { authService } from 'services'

export const Login = () => {
	const location = useLocation()

	const header = 'Log in to your account'

	const buttonTxt = 'Log in'

	const footer = {
		text: 'New to Watches? ',
		link: <Link to='/signup'>Sign up</Link>
	}

	const fields = [
		{
			type: 'email',
			title: 'email',
			placeholder: 'Email address'
		},
		{
			type: 'password',
			title: 'password',
			placeholder: 'Password'
		}
	]

	return (
		<FormCard
			fields={fields}
			footer={footer}
			header={header}
			func={authService.login}
			location={location}
			buttonTxt={buttonTxt}
		/>
	)
}
