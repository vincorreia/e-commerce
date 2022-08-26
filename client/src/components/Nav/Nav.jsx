import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../store/AuthContext";
import { useCart } from "../../store/CartContext";

export default function Nav(){

    const cart = useCart()
    const [amount, setAmount] = useState(0)
    const isAuthenticated = useUserContext()

    useEffect(() => {
        let mutateAmount = 0;
        Object.entries(cart).forEach(entry => {mutateAmount += entry[1].amount});
        setAmount(mutateAmount);
    }, [cart])

    return (
    <nav className="flex-row space-around nav">
            <div className="flex-row center">
                <NavLink className="brand" to="/">Watches</NavLink>
            </div>
            <div className="profile-section flex-row">
                <NavLink className="nav-link" to="/products">STORE</NavLink>
                {isAuthenticated ? 
                <NavLink className="nav-link" to="/profile">PROFILE</NavLink> 
                :
                <>
                    <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    <NavLink className="nav-link" to="/signup">SIGN UP</NavLink>
                </>
                }
                <NavLink className="nav-link" to="/cart">CART <span className={amount > 0 ? "amount" : "amount hidden"}>{amount}</span></NavLink>
            </div>
    </nav>)
}