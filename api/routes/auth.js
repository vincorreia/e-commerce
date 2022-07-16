const router = require("express").Router();

const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {res.send("in auth")})

module.exports = router;