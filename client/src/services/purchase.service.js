import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/purchase";

const createPurchase = (
  payload = {
    items: [],
    price: 0,
  }
) => {
  axios.post(API_URL + "/create", payload, { headers: authHeader() });
};

const purchaseService = {
  createPurchase,
};

export default purchaseService;
