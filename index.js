const express = require("express");
const router = require("../New folder/routes/users.js");

const app = express();
module.exports = app;


app.use(express.json());
app.use("/users", router);