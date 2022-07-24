import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service"
import { useUserContext } from "../context/AuthContext";

function Form() {
    const isAuthenticated = useUserContext()
    let location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const sentErr = location.state?.err || "";
    let type = location.pathname.slice(1);
    const [error, setError] = useState(sentErr)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const navigate = useNavigate()
    const locationVars = {
        "login": {
            header: "Log in to your account",
            buttonTxt: "Log in",
            func: authService.login,
            grayMsg: {
                text:"New to Watches? ",
                link: <Link to='/signup'>Sign up</Link>
            }
        },
        "signup": {
            header: "Sign up for free",
            buttonTxt: "Sign up",
            func: authService.signup,
            grayMsg: {
                text: "Already have an account? ",
                link: <Link to='/login'>Login</Link>
            }
        }
    }

    const pageVars = locationVars[type]
    
    async function handleSubmit(e) {
        e.preventDefault();

        if(location === "/signup"){
            if(password !== rePassword){
                setError("Passwords do not match")
                return
            }
        }
        try {
            await pageVars.func(email, password).then(
                (user) => {
                    console.log(user)
                    console.log(localStorage)
                    navigate(from, { replace: true });
                    window.location.reload();
                },
                (error) => {
                    setError(error.response.data.errors[0].msg)
                }
            )
        }
        catch (err) {
            setError(error.response.data.errors[0].msg)
        }
    }
    
    useEffect(() => {
        setError(sentErr)
    }, [location]);

    if(isAuthenticated){
        return navigate("/profile")
    }
    
    return ( <div className="sectionContainer flex-col center form">
            <div className="form-card flex-col">
                <h1>{pageVars.header}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="form-icon">
                            <circle cx="12" cy="7.858" r="2.5" stroke="#265BFF" strokeWidth="1.5"/>
                            <rect width="10" height="4" x="7" y="13.926" stroke="#0A0A30" strokeWidth="1.5" rx="2"/>
                        </svg>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Email address" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="form-control flex-col password">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="form-icon">
                            <path fill="#265BFF" d="M15.236 10.811a.736.736 0 01-.736-.736V8.811a2.5 2.5 0 00-5 0v5H8v-5a4 4 0 018 0v1.236a.764.764 0 01-.764.764z" />
                            <path fill="#fff" d="M6.6 13.704a3 3 0 013-3h4.8a3 3 0 013 3v3a3 3 0 01-3 3H9.6a3 3 0 01-3-3v-3z"/>
                            <path fill="#0A0A30" d="M9.6 11.454h4.8v-1.5H9.6v1.5zm7.05 2.25v3h1.5v-3h-1.5zm-2.25 5.25H9.6v1.5h4.8v-1.5zm-7.05-2.25v-3h-1.5v3h1.5zm2.25 2.25a2.25 2.25 0 01-2.25-2.25h-1.5a3.75 3.75 0 003.75 3.75v-1.5zm7.05-2.25a2.25 2.25 0 01-2.25 2.25v1.5a3.75 3.75 0 003.75-3.75h-1.5zm-2.25-5.25a2.25 2.25 0 012.25 2.25h1.5a3.75 3.75 0 00-3.75-3.75v1.5zm-4.8-1.5a3.75 3.75 0 00-3.75 3.75h1.5a2.25 2.25 0 012.25-2.25v-1.5zm1.543 5.198a.857.857 0 011.714 0v.104a.857.857 0 11-1.714 0v-.104z"/>
                        </svg>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        {location === "/signup" &&                         
                                <>
                                <div>
                                    <label htmlFor="re-password">Repeat Password</label>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="form-icon repeat">
                                        <path fill="#265BFF" d="M15.236 10.811a.736.736 0 01-.736-.736V8.811a2.5 2.5 0 00-5 0v5H8v-5a4 4 0 018 0v1.236a.764.764 0 01-.764.764z" />
                                        <path fill="#fff" d="M6.6 13.704a3 3 0 013-3h4.8a3 3 0 013 3v3a3 3 0 01-3 3H9.6a3 3 0 01-3-3v-3z"/>
                                        <path fill="#0A0A30" d="M9.6 11.454h4.8v-1.5H9.6v1.5zm7.05 2.25v3h1.5v-3h-1.5zm-2.25 5.25H9.6v1.5h4.8v-1.5zm-7.05-2.25v-3h-1.5v3h1.5zm2.25 2.25a2.25 2.25 0 01-2.25-2.25h-1.5a3.75 3.75 0 003.75 3.75v-1.5zm7.05-2.25a2.25 2.25 0 01-2.25 2.25v1.5a3.75 3.75 0 003.75-3.75h-1.5zm-2.25-5.25a2.25 2.25 0 012.25 2.25h1.5a3.75 3.75 0 00-3.75-3.75v1.5zm-4.8-1.5a3.75 3.75 0 00-3.75 3.75h1.5a2.25 2.25 0 012.25-2.25v-1.5zm1.543 5.198a.857.857 0 011.714 0v.104a.857.857 0 11-1.714 0v-.104z"/>
                                    </svg>
                                </div>
                                <input type="password" name="re-password" id="re-password" placeholder="Repeat Password" value={rePassword} onChange={(e) => {
                                    setRePassword(e.target.value)
                                }}/>
                                </>
                        }
                        
                    </div>
                    {error && <span className="error">{error}</span>}
                    <button className="primary" type="submit">{pageVars.buttonTxt}</button>
                </form>
            </div>
            <div className="gray flex-col center">
                    <h2>{pageVars.grayMsg.text}{pageVars.grayMsg.link}</h2>
            </div>
        </div>
     );
}

export default Form;