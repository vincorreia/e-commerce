import { useLocation, Link } from "react-router-dom";

function Form() {
    let location = useLocation().pathname
    let type = location.slice(1);
    const locationVars = {
        "login": {
            header: "Log in to your account",
            buttonTxt: "Log in",
            grayMsg: {
                text:"New to Watches? ",
                link: <Link to='/signup'>Sign up</Link>
            }
        },
        "signup": {
            header: "Sign up for free",
            buttonTxt: "Sign up",
            grayMsg: {
                text: "Already have an account? ",
                link: <Link to='/login'>Login</Link>
            }
        }
    }

    const pageTexts = locationVars[type]
    
    return ( 
        <div className="sectionContainer flex-col center form">
            <div className="form-card flex-col">
                <h1>{pageTexts.header}</h1>
                <form action={location}>
                    <div className="form-control flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="form-icon">
                            <circle cx="12" cy="7.858" r="2.5" stroke="#265BFF" strokeWidth="1.5"/>
                            <rect width="10" height="4" x="7" y="13.926" stroke="#0A0A30" strokeWidth="1.5" rx="2"/>
                        </svg>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Email address"/>
                    </div>
                    <div className="form-control flex-col password">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="form-icon">
                            <path fill="#265BFF" d="M15.236 10.811a.736.736 0 01-.736-.736V8.811a2.5 2.5 0 00-5 0v5H8v-5a4 4 0 018 0v1.236a.764.764 0 01-.764.764z" />
                            <path fill="#fff" d="M6.6 13.704a3 3 0 013-3h4.8a3 3 0 013 3v3a3 3 0 01-3 3H9.6a3 3 0 01-3-3v-3z"/>
                            <path fill="#0A0A30" d="M9.6 11.454h4.8v-1.5H9.6v1.5zm7.05 2.25v3h1.5v-3h-1.5zm-2.25 5.25H9.6v1.5h4.8v-1.5zm-7.05-2.25v-3h-1.5v3h1.5zm2.25 2.25a2.25 2.25 0 01-2.25-2.25h-1.5a3.75 3.75 0 003.75 3.75v-1.5zm7.05-2.25a2.25 2.25 0 01-2.25 2.25v1.5a3.75 3.75 0 003.75-3.75h-1.5zm-2.25-5.25a2.25 2.25 0 012.25 2.25h1.5a3.75 3.75 0 00-3.75-3.75v1.5zm-4.8-1.5a3.75 3.75 0 00-3.75 3.75h1.5a2.25 2.25 0 012.25-2.25v-1.5zm1.543 5.198a.857.857 0 011.714 0v.104a.857.857 0 11-1.714 0v-.104z"/>
                        </svg>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                        {location === "/signup" &&                         
                                <>
                                <div>
                                    <label htmlFor="repeat-password">Repeat Password</label>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="form-icon repeat">
                                        <path fill="#265BFF" d="M15.236 10.811a.736.736 0 01-.736-.736V8.811a2.5 2.5 0 00-5 0v5H8v-5a4 4 0 018 0v1.236a.764.764 0 01-.764.764z" />
                                        <path fill="#fff" d="M6.6 13.704a3 3 0 013-3h4.8a3 3 0 013 3v3a3 3 0 01-3 3H9.6a3 3 0 01-3-3v-3z"/>
                                        <path fill="#0A0A30" d="M9.6 11.454h4.8v-1.5H9.6v1.5zm7.05 2.25v3h1.5v-3h-1.5zm-2.25 5.25H9.6v1.5h4.8v-1.5zm-7.05-2.25v-3h-1.5v3h1.5zm2.25 2.25a2.25 2.25 0 01-2.25-2.25h-1.5a3.75 3.75 0 003.75 3.75v-1.5zm7.05-2.25a2.25 2.25 0 01-2.25 2.25v1.5a3.75 3.75 0 003.75-3.75h-1.5zm-2.25-5.25a2.25 2.25 0 012.25 2.25h1.5a3.75 3.75 0 00-3.75-3.75v1.5zm-4.8-1.5a3.75 3.75 0 00-3.75 3.75h1.5a2.25 2.25 0 012.25-2.25v-1.5zm1.543 5.198a.857.857 0 011.714 0v.104a.857.857 0 11-1.714 0v-.104z"/>
                                    </svg>
                                </div>
                                <input type="password" name="password" id="password" placeholder="Repeat Password"/>
                                </>
                        }
                        
                    </div>
                    <button className="primary" type="submit">{pageTexts.buttonTxt}</button>
                </form>
            </div>
            <div className="gray flex-col center">
                    <h2>{pageTexts.grayMsg.text}{pageTexts.grayMsg.link}</h2>
            </div>
        </div>
     );
}

export default Form;