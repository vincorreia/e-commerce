import { ReactComponent as PasswordIcon } from 'assets/Icons/password.svg'
import { ReactComponent as UserIcon } from 'assets/Icons/user.svg'

export const Icon = (name, className) => {
	if (name === 'user') {
		return <UserIcon className={className} />
	} else if (name === 'password') {
		return <PasswordIcon className={className} />
	}
}
