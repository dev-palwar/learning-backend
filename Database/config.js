const mongoose = require("mongoose");

const connectDatbase = () => {
  module.exports = mongoose
    .connect("mongodb://127.0.0.1:27017/toDoApplication")
    .then(() => console.log("Database connected"))
    .catch((e) => console.log("Failed to connect to database"));
};

module.exports = connectDatbase;