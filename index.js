const express = require("express");
const connectDatbase = require("./Database/config");
const userRouter = require("./Routes/users");
const tasksRouter = require("./Routes/tasks");
const cookieParser = require("cookie-parser");
const { Response } = require("./Utils/Features");
const ifAuthenticated = require("./Middlewares/Auth");

const app = express();
connectDatbase();

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/tasks", ifAuthenticated, tasksRouter);

app.get("/", (req, res) => {
  Response(res);
});

app.listen(2000, () => {
  console.log("Server running smooth");
});