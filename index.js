const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use built-in urlencoded middleware for form data
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/UserData")
  .then(() => console.log("Database connectedddd"))
  .catch((e) => console.log(e));

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
});


// Creating a model/collection in the database
const users = mongoose.model("users", usersSchema);

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/add", async (req, res) => {
  console.log(req.body);
  const response = await users.create(req.body);
  res.send("User added" + response);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
