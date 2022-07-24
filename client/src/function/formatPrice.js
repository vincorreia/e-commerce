
function formatPrice(price){
    return Intl.NumberFormat('en-IN').format(price)
}

export default formatPrice