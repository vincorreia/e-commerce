import React from "react";

export default function Home(){
    return (
        <div className="sectionContainer row-center">
            <div className="mainText col-center">
                <h1>Welcome to Watches</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Maecenas aliquam condimentum malesuada. </p>
                <div className="row-center">
                    <button className="primary">Sign Up!</button>
                    <button className="dark">Login</button>
                </div>
            </div>
        </div>
    )
}