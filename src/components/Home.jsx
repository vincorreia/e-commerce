import React from "react";
import { useNavigate } from "react-router-dom"

export default function Home(){
    let navigate = useNavigate()
    return (
        <div className="sectionContainer row-center">
            <div className="mainText col-center">
                <h1>Welcome to Watches</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Maecenas aliquam condimentum malesuada. </p>
                <div className="row-center">
                    <button className="primary" onClick={() => {navigate('/signup')}}>Sign Up!</button>
                    <button className="dark" onClick={() => {navigate('/login')}}>Login</button>
                </div>
            </div>
        </div>
    )
}