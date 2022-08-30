import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://us-central1-e-commerce-api-48aac.cloudfunctions.net/app/api/purchase";

const createPurchase = (
  payload = {
    items: [],
    price: 0,
  }
) => {
  return axios.post(API_URL + "/create", payload, { headers: authHeader() });
};

const purchaseService = {
  createPurchase,
};

export default purchaseService;
