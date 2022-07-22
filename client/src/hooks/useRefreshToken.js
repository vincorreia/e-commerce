import axios from "axios"
import { useSetUserContext, useLogout } from "../context/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
function useRefreshToken(){
    const setUserContext = useSetUserContext();
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();

    return async function refreshToken(){
        let user = JSON.parse(localStorage.getItem("user"))
        const header = {
            "x-auth-token": user.refreshToken
        }
        if(user){
            return await axios.post("/auth/token", {}, { headers: header})
            .then(response => {
                user = {
                    accessToken: response.data.accessToken,
                    refreshToken: user.refreshToken,
                    isStaff: user.isStaff
                }
                localStorage.setItem("user", JSON.stringify(user))
                setUserContext(user)
            })
            .catch(err => {
                logout();
                navigate("/login", {state: {from: location, err: "Session expired, please log in again"}, replace: true});
            })
        }
    }
}

export default useRefreshToken