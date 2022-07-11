import React from "react";

export default function ProductCard(props){
    const product = props.product;

    return(
        <div className="flex-col center card">
            <figure>
                <img src={product.image} alt={product.name} className="product-image"/>
            </figure>

            <div className="card-details flex-col center">
                <h2>{product.name}</h2>
                <div className="tag-wrapper flex-row center">
                    {product.tags.map((tag, i) => {
                        return <span key={i} className={"tag " + tag}>{tag}</span>
                    })}
                </div>
                <span className="price">{product.price}</span>
                <div className="buttons-wrapper flex-row space-around">
                    <button className="primary">More Details</button>
                    <button className="allow">Add to Cart</button>
                </div>
            </div>
            
        </div>
    )
}