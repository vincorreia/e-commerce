const express = require("express");
var cors = require("cors");
const app = express();

(async () => {
    const db = require("./database/database")
    const index = require("./database/indexDB")
    await db.sync();
})();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.listen(4000, () => {
    console.log("Listening on port 4000");
})