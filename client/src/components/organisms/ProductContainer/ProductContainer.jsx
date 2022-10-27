import { productService } from 'services'
import { ProductCard } from 'components/molecules'
import { NotFound, Spinner } from 'components/atoms'
import { CreateProduct } from 'pages'
import { useSelector } from 'react-redux'
import { object } from 'prop-types'
import { useQuery } from 'react-query'
export const ProductContainer = ({ query }) => {
	const {
		data: products,
		isLoading,
		error
	} = useQuery('products', productService.getProducts)

	const { isStaff } = useSelector(state => state.auth)

	function filterByProduct(searchBarQuery) {
		// This function will return a filtered array from query.searchbar
		const filteredArray = products?.data?.filter(item => {
			return item.name.toLowerCase().includes(searchBarQuery.toLowerCase())
		})

		return filteredArray
	}

	function filterByTag(searchBarQuery) {
		// This function returns a filtered array from query.searchbar
		const filteredArray = products?.data?.filter(item => {
			let count = 0

			item.tags.forEach(tag => {
				if (tag.toLowerCase().includes(searchBarQuery.toLowerCase())) {
					count++
				}
			})

			return count > 0
		})

		return filteredArray
	}

	const generateCards = (product, i) => {
		return <ProductCard product={product} key={i} />
	}

	return (
		<div className='flex-row center'>
			<div className='cards-wrapper flex-row space-even wrap'>
				{products && products.length !== 0 ? (
					<>
						{query.searchBar
							? query.by === 'product'
								? filterByProduct(query.searchBar).map(generateCards)
								: filterByTag(query.searchBar).map(generateCards)
							: products.data.map(generateCards)}
						{isStaff && <CreateProduct />}
					</>
				) : isLoading ? (
					<Spinner />
				) : (
					<>
						<NotFound />
						{error}
					</>
				)}
			</div>
		</div>
	)
}

ProductContainer.propTypes = {
	query: object.isRequired
}
