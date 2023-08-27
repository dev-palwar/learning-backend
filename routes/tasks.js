const express = require("express");
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../Controllers/Tasks");
const tasksRouter = express.Router();

tasksRouter.post("/add", addTask);
tasksRouter.get("/getAll", getAllTasks);
tasksRouter.route('/:id').put(updateTask).delete(deleteTask);

module.exports = tasksRouter;