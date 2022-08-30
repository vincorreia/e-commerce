const db = require("./database");

const User = db.collection("users");

module.exports = User;