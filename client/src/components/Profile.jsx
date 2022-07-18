import { useEffect, useState } from "react";
import userService from "../services/user.service";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom"
import { useLogout } from "../context/AuthContext"

function Profile() {
    const [loading, setLoading] = useState(true)
    const [refreshed, setRefreshed] = useState(false)
    const refreshToken = useRefreshToken();
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    useEffect(() => {
         refreshToken()
         .then(() => {
            setRefreshed(true)
         })
         .catch(err => {
            logout()
            navigate("/login", {state: {from: location, err: "Session expired, please log in again"}, replace: true})
        })
    }, [])

    useEffect(() => {
        if(refreshed){
            userService.getUser()
            .then(data => {
                setUser(data.data)
            })
    
            userService.getUserPurchases()
            .then(purchases => {
                setUser({...user, purchases: purchases.data})
            })
    
            userService.getUserReviews()
            .then(reviews => {
                setUser({...user, reviews: reviews.data})
            })
    
            setLoading(false)
        }
    }, [refreshed])
    return (  
        <div>
            {loading && <h1>"Loading..."</h1>}
            
        </div>
    );
}

export default Profile;