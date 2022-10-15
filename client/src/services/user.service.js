import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_URL + "/api/user";

function getUser() {
  return axios.get(API_URL, { headers: authHeader() });
}

function getUserPurchases() {
  return axios.get(API_URL + "/purchases", { headers: authHeader() });
}

function getUserReviews() {
  return axios.get(API_URL + "/reviews", { headers: authHeader() });
}

export const userService = {
  getUser,
  getUserPurchases,
  getUserReviews,
};
