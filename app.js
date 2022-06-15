const express = require("express");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");

const PORT = 3000;
require("dotenv/config");

//route 
app.use("/api/user", authRoute);

// IMPORT ROUTES
const postRoute = require("./Routes/posts");
// MIDDLEWARE
app.use(cors())

app.use(bodyParser.json());

//middleware
app.use(express.json());


app.use("/posts", postRoute);
// ROUTES
app.get("/", (req, res) => {
    res.send("app.js file !!!");
});

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("connected to DB");
});
// LISTEN TO PORT 3000
app.listen(PORT, () => {
    console.log(`server run on http://localhost:${PORT}`);
});
