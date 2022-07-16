const express = require("express");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/reviews", require("./routes/reviews.js"));

app.listen(4000, () => {
    console.log("Listening on port 4000");
})