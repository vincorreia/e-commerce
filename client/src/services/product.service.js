import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/products";

function createProduct(product) {
  const productJSON = { product: JSON.stringify(product) };
  return axios.post(
    API_URL + "/create",
    {},
    { headers: authHeader(productJSON) }
  );
}

function getProducts() {
  return axios.get(API_URL);
}

function getProductById(id) {
  return axios.get("/products/" + id);
}

function deleteProduct(id) {
  let confirmation = prompt(
    "Are you sure you want to delete this product from the database?\nIf you are, please write DELETE"
  );

  return new Promise((resolve, reject) => {
    if (confirmation === "DELETE") {
      resolve(axios.delete(API_URL + "/" + id, { headers: authHeader() }));
    } else {
      reject("Wrong confirmation input");
    }
  });
}

function updateProduct(product) {
  const productJSON = { product: JSON.stringify(product) };
  return axios.put(
    API_URL + "/" + product.id + "/update",
    {},
    { headers: authHeader(productJSON) }
  );
}

function createReview(review, id) {
  return axios.post(API_URL + "/create/" + id + "/review", review, {
    headers: authHeader(),
  });
}

const productService = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  createReview,
  deleteProduct,
};

export default productService;
