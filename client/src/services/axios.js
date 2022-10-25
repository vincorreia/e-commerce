import axiosMod from 'axios'

export const axios = (url, options) => {
	const { header, method } = options

	return axiosMod({
		method,
		url,
		headers: {
			...header
		}
	})
}
