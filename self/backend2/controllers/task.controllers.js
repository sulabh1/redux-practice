const { validationResult } = require("express-validator");

const Users = require("../models/user.models");
const Tasks = require("../models/tasks.models");
const AppError = require("../middlewares/AppError.middlewares");
const { StatusCodes } = require("http-status-codes");

exports.createTask = async (req, res, next) => {
  const { name, date } = req.body;
  const error = validationResult(req);

  try {
    if (!error.isEmpty()) {
      return next(new AppError(error.array()[0].msg, StatusCodes.BAD_REQUEST));
    }
    console.log(req.user);
    const task = await Tasks.create({ name, date, user: req.user.id });

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
    console.log("aaa");
    const task = await Tasks.findById(id).populate("user");
    res.status(StatusCodes.OK).json({ status: "Listing single task", task });
  } catch (error) {
    next(error);
  }
};

// exports.updateTask = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const task = await Tasks.up(
//       {
//         include: [
//           {
//             model: Users,
//             attributes: ["name", "email", "created_at", "updated_at"],
//           },
//         ],
//       },
//       { where: { taskId: id } }
//     );
//     res.status(StatusCodes.OK).json({ status: "Listing single task", task });
//   } catch (error) {
//     next(error);
//   }
// };
