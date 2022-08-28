import Rating from "../../Reviews and Rating/Rating";
import Reviews from "../../Reviews and Rating/Reviews";
import formatPrice from "../../../function/formatPrice";
import CreateReview from "../../Reviews and Rating/CreateReview";
import { useSelector } from "react-redux";
function ProductDetails({ product, reviews, params }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <section className="product-details flex-col">
      <h1 className="product-name">{product.name}</h1>
      <div className="tag-wrapper flex-row">
        {product.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <hr className="separator" />
      <h2 className="price">
        <span className="sign">US$</span>
        {formatPrice(product.price)}
        <span className="cents">00</span>
      </h2>
      <div className="flex-row align-end">
        <Rating preset={reviews.rating} />
        <p className="rating-p">{reviews.rating}/5</p>
      </div>
      <p className="description">{product.description}</p>
      {reviews.reviews.length && (
        <>
          <hr className="separator" />
          <Reviews reviews={reviews.reviews} />
        </>
      )}
      {isAuthenticated && (
        <>
          <hr className="separator" />
          <CreateReview productId={params} />
        </>
      )}
    </section>
  );
}

export default ProductDetails;
