import { Rating, PriceTag } from "components/atoms";
import { Reviews, CreateReview } from "components/molecules";
import { useSelector } from "react-redux";

export const ProductDetails = ({ product, reviews, params }) => {
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
      <PriceTag price={product.price} />
      <div className="flex-row align-end">
        <Rating preset={reviews.rating} />
        <p className="rating-p">{reviews.rating}/5</p>
      </div>
      <p className="description">{product.description}</p>
      {reviews.reviews.length ? (
        <>
          <hr className="separator" />
          <Reviews reviews={reviews.reviews} />
        </>
      ) : null}
      {isAuthenticated && (
        <>
          <hr className="separator" />
          <CreateReview productId={params} />
        </>
      )}
    </section>
  );
};
