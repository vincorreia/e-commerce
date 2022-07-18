import AuthService from "../services/auth.service"
import React, { useContext, useState } from "react";

const userContext = React.createContext();
const setUserContext = React.createContext();
const logout = React.createContext();

export const useLogout = () => {
    return useContext(logout)
}

export const useUserContext = () => {
    return useContext(userContext)
}

export const useSetUserContext = () => {
    return useContext(setUserContext)
}
function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(undefined);

    const logOut = () => {
    AuthService.logout();
    };
    return ( 
        <userContext.Provider value={currentUser}>
          <setUserContext.Provider value={setCurrentUser}>
                <logout.Provider value={logOut}>
                    {children}
                </logout.Provider>
            </setUserContext.Provider>
        </userContext.Provider>
     );
}

export default AuthProvider;