import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

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
                <Link className="brand" to="/">Watches</Link>
            </div>
            <div className="profile-section flex-row">
                <Link to="/products">STORE</Link>
                {isAuthenticated ? 
                <Link to="/profile">PROFILE</Link> 
                :
                <>
                    <Link to="/login">LOGIN</Link>
                    <Link to="/signup">SIGN UP</Link>
                </>
                }
                <Link to="/cart">CART <span className={amount > 0 ? "amount" : "amount hidden"}>{amount}</span></Link>
            </div>
    </nav>)
}