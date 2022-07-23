import productService from "../../services/product.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../function/formatPrice";
import Rating from "../Rating";
import { useUserContext } from "../../context/AuthContext";
import CreateReview from "../CreateReview";
import useRefreshToken from "../../hooks/useRefreshToken";

function ProductPage() {
    const user = useUserContext() || null
    const params = Number(useParams().id) || false
    const [product, setProduct] = useState(null)
    const [reviews, setReviews]= useState({
        rating: 5,
        reviews: []
    })
    const refreshToken = useRefreshToken()

    useEffect(() => {
        if(params){
            productService.getProductById(params)
            .then(response => {
                if(response.data.reviews.length > 0){
                    let responseReviews = response.data.reviews;
                    let rating = 0
                    responseReviews.forEach(review => { // add all ratings to rating let to make a medium value out of them, ex: 5 + 4 + 3 / 3 (ratings length) = 4
                        rating += review.rating  
                    })
                    rating = rating / responseReviews.length
                    setReviews({rating: rating, reviews: responseReviews})
                }
                setProduct(response.data.product)
            })
            
        }

        if(user){
            refreshToken()
        }
    }, [])

    return (
        <div className="sectionContainer flex-col center align-center">
            <div className="product-page flex-row space-around wrap">
                {product ? 
                <>
                    <figure className="product-figure flex-row">
                        <img className="product-image" src={product.image} alt={product.name} />
                    </figure>
                    <div className="product-details flex-col">
                        <h1 className="product-name">{product.name}</h1>
                        <div className="tag-wrapper flex-row">
                            {product.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
                        </div>
                        <hr className="separator" />
                        <h2 className="price"><span className="sign">US$</span>{formatPrice(product.price)}<span className="cents">00</span></h2>
                        <p className="description">{product.description}</p>
                        <hr className="separator" />
                        <div className="ratingnreviews">
                                <Rating preset={reviews}/>
                        </div>
                        <hr  className="separator"/>
                        {user && <CreateReview productId={params}/>}
                    </div>
                </>
                :
                <h1>Loading...</h1>
                }
            </div>
        </div>
    );
}

export default ProductPage;