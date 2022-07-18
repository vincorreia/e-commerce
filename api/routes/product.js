const router = require("express").Router();
const { Product, Review } = require("../database/indexDB")
const authToken = require("../middleware/authToken")
router.get("/", async (req, res) => {

    const products = await Product.sync()
    .then(() => {
        return Product.findAll()
    })

    res.json(products)
})

router.post("/create", authToken, async (req, res) => {
    const newProduct = JSON.parse(req.header("product"))

    await Product.create({
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        tags: newProduct.tags,
        description: newProduct.description || null
    })
    res.send("Product created.")
})
module.exports = router;