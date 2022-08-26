import React, { useState } from "react";
import { useUpdateCart } from "../../store/CartContext";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../function/formatPrice";
import { useUserContext } from "../../store/AuthContext";
import useRefreshToken from "../../hooks/useRefreshToken";
import productService from "../../services/product.service";

export default function ProductCard(props){
    const product = props.product;
    const refreshToken = useRefreshToken();
    const updateCart = useUpdateCart();
    const navigate = useNavigate();
    const admin = useUserContext()?.isStaff || false
    const [err, setErr] = useState(null)
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
                <div className="buttons-wrapper flex-row center wrap">
                    <button className="dark" onClick={() => {
                        navigate("/products/" + product.id)
                    }}>More Details</button>
                    {product.stock > 0 ? 
                    <button className="allow" onClick={() => {
                        updateCart("inc", product)
                    }}>Add to Cart</button>
                    :
                    <button className="sold-out">Sold Out</button>
                    }

                    {admin &&
                    <>                  
                        <button className="primary" onClick={() => {
                            navigate("/products/" + product.id + "/update")
                        }}>Update</button>
                        <button className="deny" onClick={() => {
                            refreshToken()
                            .then(() => {
                                productService.deleteProduct(product.id)
                                .then(() => {
                                    window.location.reload()
                                })
                                .catch((err) => {
                                    setErr(err)
                                })
                            })
                        }}>Delete</button>
                        <p className="error">{err}</p>
                    </>
                    }
                </div>
            </div>
            
        </div>
    )
}