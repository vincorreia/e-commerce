import { useEffect, useState, useRef } from "react";
import userService from "../../services/user.service";
import useRefreshToken from "../../hooks/useRefreshToken";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [refreshed, setRefreshed] = useState(false);
  const refreshToken = useRefreshToken();
  const [user, setUser] = useState({});
  const userRef = useRef({});
  useEffect(() => {
    refreshToken().then(() => {
      setRefreshed(true);
    });
  }, []);

  useEffect(() => {
    if (refreshed) {
      userService.getUser().then((data) => {
        userRef.current = data.data;
        setUser(data.data);
      });

      userService.getUserPurchases().then((purchases) => {
        userRef.current = { ...userRef.current, purchases: purchases.data };
        setUser({ ...userRef.current, purchases: purchases.data });
      });

      userService.getUserReviews().then((reviews) => {
        userRef.current = { ...userRef.current, reviews: reviews.data };
        setUser({ ...userRef.current, reviews: reviews.data });
        setLoading(false);
      });
    }
  }, [refreshed]);

  return (
    <div className="sectionContainer flex-row center">
      <div className="profile flex-row wrap space-around">
        {loading ? (
          <h1>"Loading..."</h1>
        ) : (
          <>
            <div className="profile-details">
              <h1 className="">{user.name}</h1>
              <h2>{user.email}</h2>
            </div>
            <div>
              <h2>Your recent purchases</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
