import productService from "../../services/product.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../function/formatPrice";
import Rating from "../Reviews and Rating/Rating";
import { useUpdateCart } from "../../store/CartContext";
import CreateReview from "../Reviews and Rating/CreateReview";
import Reviews from "../Reviews and Rating/Reviews";
import { useSelector } from "react-redux";


function ProductPage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const params = Number(useParams().id) || false
    const [product, setProduct] = useState(null)
    const [reviews, setReviews]= useState({
        rating: 5,
        reviews: []
    })
    const updateCart = useUpdateCart()

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
    }, [])

    return (
        <div className="sectionContainer flex-col center align-center">
            <div className="product-page flex-row space-around wrap">
                {product ? 
                <>
                    <figure className="product-figure flex-row">
                        <img className="product-image" src={product.image} alt={product.name} />
                    </figure>
                    <section className="product-details flex-col">
                        <h1 className="product-name">{product.name}</h1>
                        <div className="tag-wrapper flex-row">
                            {product.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
                        </div>
                        <hr className="separator" />
                        <h2 className="price"><span className="sign">US$</span>{formatPrice(product.price)}<span className="cents">00</span></h2>
                        <div className="flex-row align-end">
                            <Rating preset={reviews.rating}/>
                            <p className="rating-p">{reviews.rating}/5</p>
                        </div>
                        <p className="description">{product.description}</p>
                        {reviews.reviews.length > 0 && 
                        <>
                            <hr className="separator" />
                            <Reviews reviews={reviews.reviews}/>
                        </>
                        }
                        {isAuthenticated &&
                        <>
                            <hr  className="separator"/>
                            <CreateReview productId={params}/>
                        </>
                        }
                    </section>
                    <section className="purchase-box flex-col wrap">
                        <span className="price">
                            <span className="sign">US$</span>
                            {formatPrice(product.price)}
                            <span className="cents">00</span>
                        </span>
                        <span>Purchase now and receive <strong>in the next 24 hours!</strong></span>
                        <span className={product.stock > 10 ? "allow" : "deny"}>{
                        product.stock > 10 ? "In stock" : 
                        product.stock === 0 ? "Sold out!" : 
                        "Hurry up! Only " + product.stock + " left!"}</span>
                        <div className="button-wrapper flex-col">
                        { product.stock > 0 ? 
                        <>
                            <button className="primary" onClick={() => {
                        updateCart("inc", product)
                    }}>Add to Cart</button>
                            <button className="allow">Buy now</button>
                        </>
                        :
                            <button className="sold-out">Sold Out</button>
                        }
                        </div>
                        <span>
                            <strong>Refund policy:</strong><br/> 
                            Products are non-refundable by default. <br />
                            You may contact Watches user support at hello@watches.com<br/>
                            if there is any incidence with the retrieval of the product.
                        </span>
                    </section>
                </>
                :
                <h1>Loading...</h1>
                }
            </div>
        </div>
    );
}

export default ProductPage;