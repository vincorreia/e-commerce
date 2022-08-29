import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import Spinner from "../../Misc/Spinner/Spinner";

function UserDetails({ refreshed }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if(refreshed){
      userService.getUser().then((response) => {
        setDetails(response.data);
        setLoading(false);
      });
    }
  }, [refreshed]);
  return (
    <div className="profile-details">
      {loading ? (
        <Spinner size="small" />
      ) : (
        <>
          <h1 className="">{details.name}</h1>
          <h2>{details.email}</h2>
        </>
      )}
    </div>
  );
}

export default UserDetails;
