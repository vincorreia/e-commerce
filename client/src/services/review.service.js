import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/reviews"

function getReviews(){
    return axios.get(API_URL + "/reviews", { headers: authHeader() });
}

export default getReviews