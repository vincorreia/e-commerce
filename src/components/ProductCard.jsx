import React from "react";
import { useUpdateCart } from "../context/CartContext";

export default function ProductCard(props){
    const product = props.product;
    const updateCart = useUpdateCart();

    return(
        <div className="flex-col center card">
            <figure className="flex-row center">
                <img src={product.image} alt={product.name} className="product-image"/>
            </figure>

            <div className="card-details flex-col center">
                <h2>{product.name}</h2>
                <div className="tag-wrapper flex-row center">
                    {product.tags.map((tag, i) => {
                        return <span key={i} className={"tag " + tag}>{tag}</span>
                    })}
                </div>
                <span className="price">${Intl.NumberFormat('en-IN').format(product.price)}.00</span>
                <div className="buttons-wrapper flex-row space-around">
                    <button className="dark">More Details</button>
                    <button className="allow" onClick={() => {
                        updateCart("inc", product)
                    }}>Add to Cart</button>
                </div>
            </div>
            
        </div>
    )
}