import { cartServices } from "services";

export const ButtonAddToCart = ({ product, color = "allow" }) => {
  const handleClick = () => {
    cartServices.addToCart(product);
  };
  return (
    <button className={color} onClick={handleClick}>
      Add to Cart
    </button>
  );
};
