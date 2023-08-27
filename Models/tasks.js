const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isCompleted: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

const Tasks = new mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
