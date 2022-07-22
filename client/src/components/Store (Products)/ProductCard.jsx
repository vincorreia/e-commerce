import React from "react";
import { useUpdateCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../function/formatPrice";
import { useUserContext } from "../../context/AuthContext";

export default function ProductCard(props){
    const product = props.product;
    const updateCart = useUpdateCart();
    const navigate = useNavigate();
    const admin = useUserContext()?.isStaff || false
    return(
        <div className="flex-col center card">
            <figure className="flex-row center">
                <img src={product.image} alt={product.name} className="product-image"/>
            </figure>

            <div className="card-details flex-col center">
                <h2>{product.name}</h2>
                <div className="tag-wrapper flex-row center">
                    {product.tags.map((tag, i) => {
                        return <span key={i} className={"tag"}>{tag}</span>
                    })}
                </div>
                <span className="price">${formatPrice(product.price)}.00</span>
                <div className="buttons-wrapper flex-row space-around">
                    <button className="dark" onClick={() => {
                        navigate("/products/" + product.id)
                    }}>More Details</button>
                    <button className="allow" onClick={() => {
                        updateCart("inc", product)
                    }}>Add to Cart</button>
                    {admin &&                     
                    <button className="primary" onClick={() => {
                        navigate("/products/" + product.id + "/update")
                    }}>Update</button>
                    }
                </div>
            </div>
            
        </div>
    )
}