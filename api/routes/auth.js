const router = require("express").Router();

router.get("/", (req, res) => {res.send("in auth")})

module.exports = router;