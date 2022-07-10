import React from "react";
import { Link } from "react-router-dom";
export default function Nav(){
    return (
    <nav className="row-space-around nav">
            <div className="row-center">
                <Link className="brand" to="/">Watches</Link>
            </div>
            <div className="profile-section">
                <Link to="/products">STORE</Link>
                <Link to="/profile">PROFILE</Link>
                <Link to="/cart">CART</Link>
            </div>
    </nav>)
}