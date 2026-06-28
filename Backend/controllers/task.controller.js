const Task = require("../models/task.model");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);

  } catch (error) {
    console.error(error);
    res.status(500).json({
        message: error.message
    });
}
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {
    console.error(error);
    res.status(500).json({
        message: error.message
    });
}
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json(error);
  }
};



module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask
};