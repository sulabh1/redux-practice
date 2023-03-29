const { validationResult } = require("express-validator");

const Users = require("../models/user.models");
const Tasks = require("../models/tasks.models");
const AppError = require("../middlewares/AppError.middlewares");
const { StatusCodes } = require("http-status-codes");

exports.createTask = async (req, res, next) => {
  const { name, date, completed } = req.body;
  const error = validationResult(req);

  try {
    if (!error.isEmpty()) {
      return next(new AppError(error.array()[0].msg, StatusCodes.BAD_REQUEST));
    }
    console.log(req.user);
    const task = await Tasks.create({
      name,
      date,
      user: req.user.id,
      completed,
    });

    res.status(StatusCodes.ACCEPTED).json({
      status: "Task created",
      task,
    });
  } catch (error) {
    next(error);
  }
};

exports.listTask = async (req, res, next) => {
  try {
    const task = await Tasks.find().populate("user");
    res.status(StatusCodes.OK).json({ status: "Listing task", task });
  } catch (error) {
    next(error);
  }
};

exports.listSingleTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findById(id).populate("user");
    res.status(StatusCodes.OK).json({ status: "Listing single task", task });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { name, date, completed } = req.body;

  console.log(id);

  try {
    await Tasks.findByIdAndUpdate({ _id: id }, { name, date, completed });

    res.status(StatusCodes.OK).json({ status: "Task update successfully" });
  } catch (error) {
    next(error);
  }
};
