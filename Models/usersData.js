const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const usersData = mongoose.model("users", usersSchema);

module.exports =  usersData;
