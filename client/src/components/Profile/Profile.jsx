import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import UserReviews from "./UserReviews/UserReviews";
import UserDetails from "./UserDetails/UserDetails";
import UserPurchases from "./UserPurchases/UserPurchases";

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
      <div className="profile-page">
          <UserDetails refreshed={refreshed}/>
          <UserReviews refreshed={refreshed}/>
          <UserPurchases refreshed={refreshed}/>
      </div>
    </div>
  );
}

export default Profile;
