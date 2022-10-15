import { Router as router } from "express";
import { Product, Review } from "database";
import { authToken } from "middleware";

const defaultDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec ante sit amet tellus mattis dignissim ut at diam. Curabitur ac elementum sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

router.get("/", async (req, res) => {
  const products = (await Product.get()).docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  res.status(200).json(products);
});

router.get("/:id", async (req, res) => {
  try {
    const rawProduct = await Product.doc(req.params.id).get();
    const product = { ...rawProduct.data(), id: rawProduct.id };

    const rawReviews = await Review.where(
      "productId",
      "==",
      rawProduct.id
    ).get();
    const reviews = rawReviews.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    res.status(200).json({ product, reviews });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", authToken, async (req, res) => {
  const productId = req.params.id;
  const isStaff = req.user.isStaff;

  if (isStaff) {
    await Product.doc(productId).delete();

    res.send("Product successfully deleted.");
  } else {
    res.send("Something went wrong!");
  }
});

router.put("/:id/update", authToken, async (req, res) => {
  const productId = req.params.id;
  const modifiedProduct = JSON.parse(req.header("product"));
  const isStaff = req.user.isStaff;

  if (isStaff) {
    await Product.doc(productId).update(modifiedProduct);
    res.send("Product updated.");
  } else {
    res.send("Something went wrong, please try again later.");
  }
});

router.post("/create/:id/review", authToken, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const userName = req.user.name;
  const { content, rating } = req.body;

  await Review.doc().create({
    content,
    userId,
    productId,
    rating,
    userName,
  });

  res.send("Review created.");
});

router.post("/create", authToken, async (req, res) => {
  const {
    name,
    price,
    image,
    tags,
    description = defaultDescription,
    stock = 11,
  } = JSON.parse(req.header("product"));
  const isStaff = req.user.isStaff;

  if (isStaff) {
    await Product.doc().create({
      name,
      price,
      image,
      tags,
      description: description || null,
      stock,
    });
    res.send("Product created.");
  } else {
    res.send("Something went wrong, please try again later.");
  }
});

module.exports = router;
