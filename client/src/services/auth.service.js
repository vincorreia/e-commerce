import axios from "axios"

const API_URL = "/auth"

function signup(email, password) {

    return axios
    .post(API_URL + "/signup", {
        email,
        password
    })
    .then(response => {
        authenticate(response)
        return response.data;
    })

}


function login(email, password){
    return axios
    .post(API_URL + "/login", {
        email,
        password
    })
    .then(response => {
        authenticate(response)
        return response.data
    })
}


function authenticate(response){
    if(response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    else {
        throw new Error("User could not be authenticated")
    }
}

function logout() {
    localStorage.removeItem("user");
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem("user"));
}

const authService = {
    signup,
    login,
    logout,
    getCurrentUser
};

export default authService;