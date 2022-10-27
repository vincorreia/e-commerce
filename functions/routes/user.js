import { Router as router } from "express";
import { authToken } from "middleware";
import { User, Purchase, Review } from "database";

router.get("/", authToken, async (req, res) => {
  const id = req.user.id;
  const user = await User.doc(id).get();

  let newUser = {
    email: user.data().email,
    name: user.data().name,
  };
  res.json(newUser);
});

router.get("/reviews", authToken, async (req, res) => {
  const userId = req.user.id;
  const reviews = (await Review.where("userId", "==", userId).get()).docs.map(
    (doc) => {
      return { ...doc.data(), id: doc.id };
    }
  );

  res.json(reviews);
});

router.get("/purchases", authToken, async (req, res) => {
  const userId = req.user.id;
  const purchases = (
    await Purchase.where("userId", "==", userId).get()
  ).docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  res.json(purchases);
});

module.exports = router;
