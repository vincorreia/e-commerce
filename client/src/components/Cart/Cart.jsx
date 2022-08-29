import React from "react";
import { useSelector } from "react-redux";
import ButtonBuyNow from "../Misc/Buttons/ButtonBuyNow";
import NotFound from "../Misc/NotFound/NotFound";
import CartItem from "./CartItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartItems = Object.entries(cart.items).map((item) => item[1]);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  return (
    <div className="sectionContainer flex-row center">
      <div className="flex-col cart-wrapper">
        <div className="cart-products flex-col">
          {cartItems.length ? (
            cartItems.map((item, i) => {
              return <CartItem key={i} item={item} />;
            })
          ) : (
            <NotFound page="cart" />
          )}
        </div>
        <div className="checkout-details flex-row space-between">
          <ButtonBuyNow items={cartItems} price={totalPrice} color="allow" />
          <p>Total price: {cartItems ? "$" + totalPrice + ".00" : "0.00"}</p>
        </div>
      </div>
    </div>
  );
}
