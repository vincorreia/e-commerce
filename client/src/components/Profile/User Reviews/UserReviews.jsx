import { useState, useEffect } from "react";
import userService from "../../../services/user.service";
import Spinner from "../../Misc/Spinner/Spinner";

function UserReviews({ refreshed }) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    if(refreshed){
      userService.getUserReviews().then((response) => {
        setReviews(response.data);
        setLoading(false);
      });
    }
  }, [refreshed]);
  
  return <div>
    {loading ? <Spinner size="small"/> : null}
  </div>;
}

export default UserReviews;
