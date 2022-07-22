import productService from "../../services/product.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../function/formatPrice";
import Rating from "../Rating";
function ProductPage() {
    const params = Number(useParams().id) || false
    const [product, setProduct] = useState(null)
    const [reviews, setReviews]= useState([])

    useEffect(() => {
        if(params){
            productService.getProductById(params)
            .then(response => {
                setReviews(response.data.reviews)
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
                                <Rating product={reviews.length > 0 ? reviews : {rating: 5}}/>
                        </div>
                    </div>
                    <div className=""></div>
                </>
                :
                <h1>Loading...</h1>
                }
            </div>
        </div>
    );
}

export default ProductPage;