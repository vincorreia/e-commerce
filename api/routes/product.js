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

router.get("/:id", async (req, res) => {
    const product = await Product.sync()
    .then(() => {
        return Product.findOne({
            where: {id: Number(req.params.id)}
        })
    })
    
    const reviews = await Review.sync()
    .then(() => {
        return Review.findAll({
            where: {productId: Number(req.params.id)}
        })
    })

    res.json({product: product, reviews: reviews})
})

router.put("/:id/update", authToken, async (req, res) => {
    const productId = Number(req.params.id)
    const modifiedProduct = JSON.parse(req.header("product"))
    const isStaff = req.user.isStaff

    if(isStaff){
        let product = await Product.sync()
        .then(() => {
            return Product.findOne({
                where: {id: Number(productId)}
            })
        })
        
        product.set(modifiedProduct)

        console.log(product)

        product = await product.save()

        res.send("Product updated.")
    }
    else {
        res.send("Something went wrong, please try again later.")
    }
})


router.post("/create/:id/review", authToken, async(req, res) => {
    const productId = Number(req.params.id);
    const userId = req.user.id;
    const reviewReq = req.body

    let review = await Review.create({
        content: reviewReq.content,
        userId: userId,
        productId: productId,
        rating: reviewReq.rating
    })

    res.send("Review created.")
})

router.post("/create", authToken, async (req, res) => {
    const newProduct = JSON.parse(req.header("product"))
    const isStaff = req.user.isStaff

    if(isStaff){
        await Product.create({
            name: newProduct.name,
            price: newProduct.price,
            image: newProduct.image,
            tags: newProduct.tags,
            description: newProduct.description || null
        })
        res.send("Product created.")
    }
    else {
        res.send("Something went wrong, please try again later.")
    }
})
module.exports = router;