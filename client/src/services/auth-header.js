export default function authHeader(payload) {
    const user = JSON.parse(localStorage.getItem("user"))
    
    const header = {
        "x-auth-token": user.accessToken,
        ...payload
    }

    if(user && user.accessToken) {
        return header;
    }
    else {
        return {};
    }
}