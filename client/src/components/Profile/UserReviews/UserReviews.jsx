import { useState, useEffect } from "react";
import userService from "../../../services/user.service";
import NotFound from "../../Misc/NotFound/NotFound";
import Spinner from "../../Misc/Spinner/Spinner";
import Reviews from "../../Reviews&Rating/Reviews";

function UserReviews({ refreshed }) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    if (refreshed) {
      userService.getUserReviews().then((response) => {
        setReviews(response.data);
        setLoading(false);
      });
    }
  }, [refreshed]);

  return (
    <section className="profile-reviews profile-section">
      {loading ? (
        <Spinner size="small" />
      ) : (
        <>
        <h2 className="profile-section-title">Your Reviews</h2>
        {reviews.length ? <Reviews reviews={reviews} /> : <NotFound page="profile"/>}
        </>
      )}
    </section>
  );
}

export default UserReviews;
