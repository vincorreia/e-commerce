import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { authActions } from "../store/slices/authSlice";

function useRefreshToken() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const store = useStore().getState();

  return async function refreshToken() {
    let user = store.auth;
    if (user.accessToken.length) {
      const header = {
        "x-auth-token": user.refreshToken,
      };
      return await axios
        .post("/auth/token", {}, { headers: header })
        .then((response) => {
          user = {
            accessToken: response.data.accessToken,
            refreshToken: user.refreshToken,
            isStaff: user.isStaff,
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authActions.login(user));
        })
        .catch((err) => {
          dispatch(authActions.logout());
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
