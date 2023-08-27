const express = require("express");
const isAuthenticated = require("../Middlewares/Auth");
const { login, signup, getProfile, } = require("../Controllers/Users");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", isAuthenticated, getProfile);

module.exports = router;
