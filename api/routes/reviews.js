const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("in reviews")
})

module.exports = router;