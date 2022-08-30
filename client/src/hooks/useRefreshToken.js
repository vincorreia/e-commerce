import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/auth.service";

function useRefreshToken() {
  const navigate = useNavigate();
  const location = useLocation();

  return async function refreshToken() {
    const auth = JSON.parse(localStorage.getItem("user"))

    if (auth.accessToken.length) {
      const header = {
        "x-auth-token": auth.refreshToken,
      };
      return await axios
        .post("https://us-central1-e-commerce-api-48aac.cloudfunctions.net/app/api/auth/token", {}, { headers: header })
        .then((response) => {
          const user = {
            data: {
              accessToken: response.data.accessToken,
              refreshToken: auth.refreshToken,
              isStaff: auth.isStaff,
            }
          };
          authService.authenticate(user);
        })
        .catch((err) => {
          console.log(err)
          authService.logout();
          navigate("/login", {
            state: {
              from: location,
              err: "Session expired, please log in again",
            },
            replace: true,
          });
        });
    }
  };
}

export default useRefreshToken;
