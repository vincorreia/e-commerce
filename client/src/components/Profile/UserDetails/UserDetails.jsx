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
    <section className="profile-details profile-section">
      {loading ? (
        <Spinner size="small" />
      ) : (
        <>
          <div>
            <h2 className="profile-section-title">{details.name}</h2>
            <h3>{details.email}</h3>
          </div>
        </>
      )}
    </section>
  );
}

export default UserDetails;
