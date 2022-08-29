import { useEffect, useState } from "react";
import userService from "../../../services/user.service";
import Spinner from "../../Misc/Spinner/Spinner";

function UserPurchases({ refreshed }) {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    if(refreshed){
      userService.getUserPurchases().then((response) => {
        setPurchases(response.data);
        setLoading(false)
      });
    }
  }, [refreshed]);
  return <div>
    {loading ? <Spinner size="small"/>: null}
  </div>;
}

export default UserPurchases;
