const express = require("express");
const connectDatbase = require("./Database/config");
const router = require("./Routes/users");
const cookieParser = require("cookie-parser");
const { Response } = require("./Utils/Features");

const app = express();
connectDatbase();
app.use(express.json());
app.use(cookieParser());
app.use("/users", router);

app.get("/", (req, res) => {
  Response(res);
});

app.listen(2000, () => {
  console.log("Server running smooth");
});
