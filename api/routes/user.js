const router = require("express").Router();
const authToken = require("../middleware/authToken")
const { User, Purchase, Review } = require("../database/indexDB")


router.get("/", authToken, async (req, res) => {
    const userEmail = req.user.email;
    const user = await User.sync()
    .then(() => {
        return User.findOne(
            {
                where: {email: userEmail}
            }
        )
        }
    )

    let newUser = {
        email: user.email,
        name: user.name
    }
    res.json(newUser)
})

router.get("/reviews", authToken, async (req, res) => {
    const userId = req.user.id;
    const reviews = await Review.sync()
    .then(() => {
        return Review.findAll(
            {
                where: {userId: userId}
            }
        )
    })
    
    res.json(reviews)
})

router.get("/purchases", authToken, async (req, res) => {
    const userId = req.user.id;
    const purchases = await Purchase.sync()
    .then(() => {
        return Purchase.findAll(
            {
                where: {userId: userId}
            }
        )
    })

    let response = {}
    if(purchases){
        response = purchases;
    }

    res.json(response)
})

module.exports = router;