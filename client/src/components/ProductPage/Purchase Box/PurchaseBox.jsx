import formatPrice from "../../../function/formatPrice";
import { cartServices } from "../../../services/cart.service";

function PurchaseBox({ product }) {
  return (
    <section className="purchase-box flex-col wrap">
      <span className="price">
        <span className="sign">US$</span>
        {formatPrice(product.price)}
        <span className="cents">00</span>
      </span>
      <span>
        Purchase now and receive <strong>in the next 24 hours!</strong>
      </span>
      <span className={product.stock > 10 ? "allow" : "deny"}>
        {product.stock > 10
          ? "In stock"
          : product.stock === 0
          ? "Sold out!"
          : "Hurry up! Only " + product.stock + " left!"}
      </span>
      <div className="button-wrapper flex-col">
        {product.stock > 0 ? (
          <>
            <button
              className="primary"
              onClick={() => {
                cartServices.addToCart(product);
              }}
            >
              Add to Cart
            </button>
            <button className="allow">Buy now</button>
          </>
        ) : (
          <button className="sold-out">Sold Out</button>
        )}
      </div>
      <span>
        <strong>Refund policy:</strong>
        <br />
        Products are non-refundable by default. <br />
        You may contact Watches user support at hello@watches.com
        <br />
        if there is any incidence with the retrieval of the product.
      </span>
    </section>
  );
}

export default PurchaseBox;
