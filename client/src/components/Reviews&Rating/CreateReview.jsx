import { useState } from "react";
import Rating from "./Rating";
import productService from "../../services/product.service";
import useRefreshToken from "../../hooks/useRefreshToken";

function CreateReview({ productId }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const refreshToken = useRefreshToken();

  function handleSubmit(e) {
    e.preventDefault();

    if (content.length > 200) {
      setError("Review content must contain a maximum of 200 characters!");
      return;
    } else if (rating === 0) {
      setError("Review must have a rating!");
      return;
    }

    refreshToken().then(() => {
      const newReview = {
        rating,
        content,
      };

      productService.createReview(newReview, productId);
      window.location.reload();
    });
  }

  return (
    <form className="flex-col create-review wrap" onSubmit={handleSubmit}>
      <Rating size={17.5} rating={rating} setRating={setRating} />
      <textarea
        type="text"
        rows="7"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button className="dark" type="submit">
        Post Review
      </button>
      <p>{error}</p>
    </form>
  );
}

export default CreateReview;
