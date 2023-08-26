const express = require("express");
const users = require("../Models/users");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working fine",
  });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let resFromDb = await users.findOne({ email });

  if (resFromDb)
    return res.json({
      status: "Failed",
      Message: "User already exists",
    });
  const hashedPass = await bcrypt.hash(password, 10);
  resFromDb = await users.create({ name, email, password: hashedPass });
  res.status(200).json({
    status: "Success",
    resFromDb,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const resFromDb = await users.findOne({ email }).select("+password");

  if (!resFromDb)
    return res.json({
      status: "Failed",
      Message: "Either email or password is wrong",
    });

  const passwordMatch = await bcrypt.compare(password, resFromDb.password);

  if (passwordMatch) {
    res.status(200).json({
      status: "Success",
      resFromDb,
    });
  }
});

router.get("/getAllUsers", async (req, res) => {
  const response = await users.find({});
  res.json(response);
});

router.get("/me/:id", async (req, res) => {
  const response = await users.findById(req.params.id);
  res.json(response);
});

module.exports = router;
