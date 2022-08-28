import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/user";

function getUser() {
  return axios.get(API_URL, { headers: authHeader() });
}

function getUserPurchases() {
  return axios.get(API_URL + "/purchases", { headers: authHeader() });
}

function getUserReviews() {
  return axios.get(API_URL + "/reviews", { headers: authHeader() });
}

const userService = {
  getUser,
  getUserPurchases,
  getUserReviews,
};
export default userService;
