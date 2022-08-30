const functions = require("firebase-functions");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({origin: true}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/purchase", require("./routes/purchase"));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);
