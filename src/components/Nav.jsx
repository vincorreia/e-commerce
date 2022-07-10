import React from "react";

export default function Nav(){
    return (
    <nav className="row-space-around nav">
            <div className="row-center">
                <a className="brand" href="#">Watches</a>
            </div>
            <div className="row-center profile-section">
                <a href="#">SEARCH</a>
                <a href="#">PROFILE</a>
                <a href="#">CART</a>
            </div>
    </nav>)
}