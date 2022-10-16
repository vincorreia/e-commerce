export const formatPrice = price => {
	return Intl.NumberFormat('en-IN').format(price)
}
