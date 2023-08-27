const Tasks = require("../Models/tasks");
const { Response } = require("../Utils/Features");

const addTask = async (req, res) => {
  if (req.body.title) {
    const { title, description, isCompleted } = req.body;
    const task = await Tasks.create({
      title,
      description,
      isCompleted,
      user: req.user,
    });
    Response(res, "Success", "Task added successfully", task);
  } else {
    Response(res, "Failed", "Add title");
  }
};

const getAllTasks = async (req, res) => {
  const userID = req.user._id;
  const tasks = await Tasks.find({ user: userID });
  Response(res, "Success", tasks ? "" : "No task found", tasks);
};

const updateTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const task = await Tasks.findById(taskID);
    task.isCompleted = !task.isCompleted;
    await task.save();
    Response(res, "Success", "Task updated successfully", task);
  } catch (error) {
    Response(res, "Failed", "Task not found");
  }
};

const deleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    await Tasks.deleteOne({ _id: taskID });
    Response(res, "Success", "Task deleted successfully");
  } catch (error) {
    Response(res, "Failed", "Task not found");
  }
};

module.exports = { addTask, getAllTasks, updateTask, deleteTask };
