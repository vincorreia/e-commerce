const db = require("./database");

const Product = db.collection("products");

module.exports = Product;