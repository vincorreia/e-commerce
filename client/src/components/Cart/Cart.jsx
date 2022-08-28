import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NotFound from "../NotFound";
import CartItem from "./CartItem";


export default function Cart(){

    const cart = useSelector(state => state.cart)
    const cartItems = Object.entries(cart.items)
    const totalPrice = cartItems.map(item => item[1].price * item[1].amount).reduce((sum, num) => sum + num, 0);

    useEffect(() => {console.log(cartItems)}, [])
    return (
    <div className="sectionContainer flex-row center">
        <div className="flex-col cart-wrapper">
            <div className="cart-products flex-col">
                {cartItems.length > 0 ? 
                    cartItems.map((item, i) => {return <CartItem key={i} item={item[1]} />}) 
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