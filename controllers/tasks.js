const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  // Get all data from database
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create({ name: req.body.name, completed: false });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${req.params.id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const body = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${req.params.id}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskToDelete = await Task.findOneAndDelete({ _id: req.params.id });
    if (!taskToDelete) {
      return res.status(404).json({ msg: `No task with id ${req.params.id}` });
    }
    res.status(200).json({ taskToDelete });
  } catch (error) {
    res.status(500).json({ msg: "Could not find task by that id." });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
