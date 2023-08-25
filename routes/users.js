const usersData = require("../Models/usersData.js");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Root page working");
});

router.get("/all", async (req, res) => {
  const user = await usersData.find({});
  console.log(user);
  res.json(user);
});

router.post("/new", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  await usersData.create({ name, email });

  res.status(201).json({
    status: "success",
    message: "User registard succesfully",
  });
});

router.get("/special", async (req, res) => {
  res.json({
    status: "success",
    message: "Special hai",
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params;
  const response = await usersData.findById(id.id);
  console.log(response);

  res.json({
    status: "success",
    response,
  });
});

module.exports = router;
