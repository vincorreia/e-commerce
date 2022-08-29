import store from "../store/store";
import { cartActions } from "../store/slices/cartSlice";

const addToCart = (item) => {
  store.dispatch(cartActions.addToCart(item));

  const newCart = store.getState().cart;

  localStorage.setItem("cart", JSON.stringify(newCart));
};

const removeFromCart = (item) => {
  store.dispatch(cartActions.removeFromCart(item));

  const newCart = store.getState().cart;

  localStorage.setItem("cart", JSON.stringify(newCart));
};

const clearCart = () => {
  store.dispatch(cartActions.clearCart())
  localStorage.removeItem("cart")
}

const getStorageCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};
export const cartServices = {
  removeFromCart,
  addToCart,
  getStorageCart,
  clearCart
};
