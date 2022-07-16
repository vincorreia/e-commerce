import React from "react";
import { useCart } from "../context/CartContext";
import NotFound from "./NotFound";
import CartItem from "./CartItem";

export default function Cart(){

    const cart = useCart()
    const cartItems = Object.entries(cart)
    const totalPrice = cartItems.map(item => item[1].price * item[1].amount).reduce((sum, num) => sum + num, 0);
    return (
    <div className="sectionContainer flex-row center">
        <div className="flex-col cart-wrapper">
            <div className="cart-products flex-col">
                {cartItems.length > 0 ? 
                    cartItems.map(item => {return <CartItem item={item[1]} />}) 
                    : <NotFound page="cart" />}
            </div>
            <div className="checkout-details flex-row space-between">
                    <button className="allow">Buy now!</button>
                    <p>Total price: {cartItems ? "$" + totalPrice + ".00" : "0.00"}</p>
            </div>
        </div>
    </div>
    )
}