import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import UserReviews from "./User Reviews/UserReviews";
import UserDetails from "./User Details/UserDetails";
import UserPurchases from "./User Purchases/UserPurchases";

function Profile() {
  const [refreshed, setRefreshed] = useState(false);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    refreshToken().then(() => {
      setRefreshed(true);
    });
  }, []);

  return (
    <div className="sectionContainer flex-row center">
      <div className="profile flex-row wrap space-around">
          <UserDetails refreshed={refreshed}/>
          <UserReviews refreshed={refreshed}/>
          <UserPurchases refreshed={refreshed}/>
      </div>
    </div>
  );
}

export default Profile;
