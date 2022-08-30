const db = require("./database");

const Review = db.collection("reviews");

module.exports = Review;