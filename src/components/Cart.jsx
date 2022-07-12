import React from "react";
import { useCart } from "../context/CartContext";
import NotFound from "./NotFound";


export default function Cart(){

    const cart = useCart()
    const cartItems = Object.entries(cart)
    return (
    <div className="sectionContainer flex-row center">
        <div className="flex-col cart-wrapper">
            <div className="cart-products flex-col">
                {cartItems.length > 0 ? cartItems.map(item => {return <h1 className="cart-item">{item[1].name}</h1>}) : <NotFound page="cart" />}
            </div>
            <div className="checkout-details">
            </div>
        </div>
    </div>
    )
}