import { useEffect, useRef, useState, useReducer } from 'react'
import { useRefreshToken } from 'hooks'
import { productService } from 'services'
import { bool, number, string } from 'prop-types'

const plusSign = 'https://i.imgur.com/pJYS4Df.png'

export const CreateProduct = ({
	product = {
		name: '',
		price: '',
		image: plusSign,
		tags: '',
		id: null,
		isCreated: false,
		description: '',
		stock: 11
	}
}) => {
	const refreshToken = useRefreshToken()

	const formReducer = (state, action) => {
		return { ...state, [action.payload.name]: action.payload.content }
	}

	const [form, dispatch] = useReducer(formReducer, product)
	const { name, price, image, stock, tags, description } = form
	const [hidden, setHidden] = useState('')
	const imageInputRef = useRef()
	const imageRef = useRef()

	function handleSubmit(e) {
		e.preventDefault()

		const newProduct = {
			name,
			price,
			image,
			stock,
			tags: product.isCreated ? tags : tags.split(','),
			description: product.isCreated ? description : undefined,
			id: product.isCreated ? product.id : undefined
		}

		refreshToken().then(() => {
			if (product.isCreated) {
				productService.updateProduct(newProduct).then(() => {
					window.location.reload()
				})
			} else {
				productService.createProduct(newProduct).then(() => {
					window.location.reload()
				})
			}
		})
	}

	function handleChange(e) {
		const type = e.target.id
		const payload = {
			name: e.target.id,
			content: e.target.value
		}

		const action = {
			type,
			payload
		}

		dispatch(action)
	}

	useEffect(() => {
		if (imageRef.current) {
			imageRef.current.addEventListener('click', () => {
				if (imageInputRef.current.className.trim().length > 0) {
					setHidden('')
				} else {
					setHidden('hidden')
				}
			})
		}
	}, [imageRef])

	return (
		<form className='flex-row center product-creator' onSubmit={handleSubmit}>
			<div className='flex-col center card'>
				<figure className='flex-row center'>
					<img
						ref={imageRef}
						src={image}
						alt='Placeholder'
						className='product-image'
					/>
				</figure>
				<input
					ref={imageInputRef}
					type='text'
					className={hidden}
					id='image'
					placeholder='insert image link'
					value={image}
					onChange={handleChange}
				/>

				<div className='card-details flex-col center'>
					<input
						className='new-product-name'
						type='text'
						placeholder='New Product Name'
						id='name'
						value={name}
						onChange={handleChange}
					/>
					<div className='tag-wrapper flex-row center'>
						<input
							type='text'
							className='new-tags'
							placeholder='Tag1,Tag2,Tag3'
							id='tags'
							value={tags}
							onChange={handleChange}
						/>
					</div>
					<span className='price'>
						$
						<input
							className='new-price'
							type='text'
							id='price'
							placeholder='100'
							value={price}
							onChange={handleChange}
						/>
						.00
					</span>
					<div className='buttons-wrapper flex-row space-around'>
						<button className='dark'>Place Holder</button>
						{product.isCreated ? (
							<button className='primary' type='submit'>
								Update Product
							</button>
						) : (
							<button className='allow' type='submit'>
								Create Product
							</button>
						)}
					</div>
				</div>
			</div>
			{product.isCreated && (
				<div className='flex-col internal-update'>
					<div>
						<textarea
							name='description'
							id='description'
							cols='60'
							rows='20'
							value={description}
							placeholder='new description goes here'
							onChange={handleChange}
						>
							{description}
						</textarea>
					</div>
					<label htmlFor='stock'>
						<span>Stock:</span>
						<input
							type='number'
							id='stock'
							value={stock}
							min={0}
							onChange={handleChange}
						/>
					</label>
				</div>
			)}
		</form>
	)
}

CreateProduct.propTypes = {
	product: {
		name: string,
		price: string,
		image: string,
		tags: string,
		id: number,
		isCreated: bool,
		description: string,
		stock: number
	}
}
