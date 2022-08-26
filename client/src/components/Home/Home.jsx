import React from "react";
import { useNavigate } from "react-router-dom"
import { useUserContext, useLogout } from "../../store/AuthContext";
export default function Home(){
    let navigate = useNavigate()
    const userToken = useUserContext() 
    const logout = useLogout()
    return (
        <div className="sectionContainer flex-row center">
            <div className="mainText flex-col center">
                <h1>Welcome to Watches</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Maecenas aliquam condimentum malesuada. </p>
                <div className="flex-row center">
                {!userToken ? <>
                    <button className="primary" onClick={() => {navigate('/signup')}}>Sign Up!</button>
                    <button className="dark" onClick={() => {navigate('/login')}}>Login</button>
                </> 
                :
                <>
                    <button className="primary" onClick={() => {navigate('/profile')}}>Profile</button>
                    <button className="dark" onClick={() => {
                        logout();
                        window.location.reload();
                        }}>Logout</button>
                </>
                }
                    
                </div>
            </div>
        </div>
    )
}