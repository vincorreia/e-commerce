import { Router as router } from "express";
import { Purchase } from "database";
import { authToken } from "middleware";

router.get("/", authToken, async (req, res) => {
  const isStaff = req.user.isStaff;

  if (isStaff) {
    const purchases = (await Purchase.get()).docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
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
    items,
  };
  await Purchase.doc().create(newPurchase);

  res.json("Purchase completed successfully!");
});

module.exports = router;
