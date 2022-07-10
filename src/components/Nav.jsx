import React from "react";

export default function Nav(){
    return (
    <nav className="space-around nav">
            <div className="center">
                <a className="brand" href="#">Watches</a>
            </div>
            <div className="center profile-section">
                <a href="#">SEARCH</a>
                <a href="#">PROFILE</a>
                <a href="#">CART</a>
            </div>
    </nav>)
}