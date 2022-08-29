import purchaseService from "../../../services/purchase.service";

function ButtonBuyNow({ items, color, price }) {

  const payload = {
    items,
    price
  }

  const handleClick = () => {
    purchaseService.createPurchase(payload);
  };

  return (
    <button className={color} onClick={handleClick}>
      Buy now!
    </button>
  );
}

export default ButtonBuyNow;
