import { purchaseService, cartServices } from "services";

export const ButtonBuyNow = ({ items, color, price, clear = false }) => {
  const payload = {
    items: items.map((item) => {
      const { id, name, price, image, amount = 1 } = item;
      const newItem = {
        id,
        name,
        price,
        image,
        amount,
      };
      return newItem;
    }),
    price,
  };

  const handleClick = () => {
    purchaseService.createPurchase(payload).then(() => {
      if (clear) {
        cartServices.clearCart();
      }
    });
  };

  return (
    <button className={color} onClick={handleClick}>
      Buy now!
    </button>
  );
};
