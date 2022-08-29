import { cartServices } from "../../../services/cart.service";

function ButtonAddToCart({ product, color = "allow" }) {
  const handleClick = () => {
    cartServices.addToCart(product);
  };
  return (
    <button className={color} onClick={handleClick}>
      Add to Cart
    </button>
  );
}

export default ButtonAddToCart;
