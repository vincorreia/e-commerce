const router = require("express").Router();
const { Purchase } = require("../database/indexDB");
const authToken = require("../middleware/authToken");

router.get("/", authToken, async (req, res) => {
  const isStaff = req.user.isStaff;

  if (isStaff) {
    const purchases = await Purchase.sync().then(() => {
      return Purchase.findAll();
    });

    res.send(purchases);
  } else {
    res.send("Something went wrong!");
  }
});

router.post("/create", authToken, async (req, res) => {
  const userId = req.user.id;
  const { price, items } = req.body;

  const newPurchase = {
    userId,
    price,
    items: items.map((item) => JSON.stringify(item)),
  };
  await Purchase.create(newPurchase);

  res.json("Purchase completed successfully!");
});

module.exports = router;
