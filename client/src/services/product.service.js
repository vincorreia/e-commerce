import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/products"

function createProduct(product){
    return axios.post(API_URL + "/create", {}, {headers: authHeader(product)})
}

function getProducts(){
    return axios.get(API_URL)
}

const productService = {
    createProduct,
    getProducts
}

export default productService;