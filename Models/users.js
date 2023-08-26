const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

const users = new mongoose.model("users", userSchema);

module.exports = users;
