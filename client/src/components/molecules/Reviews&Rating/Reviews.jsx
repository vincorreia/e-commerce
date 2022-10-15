import { useRef, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Rating } from "components/atoms";

export const Reviews = ({ reviews, width = "90%", height = "10rem" }) => {
  const [current, setCurrent] = useState(0);
  const length = reviews.length;
  const reviewRef = useRef();
  const previousRev = useRef();

  if (!Array.isArray(reviews) || length <= 0) {
    return null;
  }

  function nextReview() {
    previousRev.current = current;
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  function previousReview() {
    previousRev.current = current;
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  return (
    <section
      className="reviews flex-row"
      style={{ width: width, height: height }}
    >
      <FaArrowAltCircleLeft className="left-arrow" onClick={previousReview} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextReview} />
      {reviews.map((review, index) => {
        if (current === index) {
          let position =
            (previousRev.current > current &&
              !(current === 0 && previousRev.current === length - 1)) ||
            (previousRev.current < current &&
              current === length - 1 &&
              previousRev.current === 0)
              ? "left"
              : "right";

          setTimeout(() => {
            reviewRef.current.classList.add("active");
            reviewRef.current.classList.add(position);
          }, 1);

          return (
            <div
              ref={reviewRef}
              className="flex-col review"
              style={position === "left" ? { left: "50%" } : { left: "-50%" }}
            >
              <div className="flex-col rating-info">
                <p>{review.userName}</p>
                <Rating preset={review.rating} size={12.5} />
              </div>
              <h3>{review.content}</h3>
            </div>
          );
        } else {
          return null;
        }
      })}
    </section>
  );
};
