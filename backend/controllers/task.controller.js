const { Tasks } = require("../models");
const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await Tasks.create({ name, completed });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",

      message: error.message,
    });
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Tasks.findAll();
    res.status(201).json({
      status: "success",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",

      message: error.message,
    });
  }
};
const getSingleTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Tasks.findOne({ where: { taskId } });
    res.status(201).json({
      status: "success",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",

      message: error.message,
    });
  }
};

module.exports = { createTask, getTask, getSingleTask };
