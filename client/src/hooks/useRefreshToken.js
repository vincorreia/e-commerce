import axios from "axios"
import { useSetUserContext } from "../context/AuthContext"

function useRefreshToken(){
    const setUserContext = useSetUserContext();
    

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
                    refreshToken: user.refreshToken
                }
                localStorage.setItem("user", JSON.stringify(user))
                setUserContext(user)
            })
            .catch(err => {
                throw new Error(err)
            })
        }
    }
}

export default useRefreshToken