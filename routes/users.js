const express = require("express");
const ifAuthenticated = require("../Middlewares/Auth");
const { login, signup, getProfile, logOut, } = require("../Controllers/Users");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/me", ifAuthenticated, getProfile);
userRouter.get("/logout",ifAuthenticated, logOut);

module.exports = userRouter;
