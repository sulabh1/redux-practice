const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { promisify } = require("util");

const AppError = require("./AppError.middlewares");
const Users = require("../models/user.models");

const protect = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token, "token");

  try {
    const user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!user) {
      return next(new AppError("User unauthorized", StatusCodes.UNAUTHORIZED));
    }

    const { name, email } = user;
    const userExist = await Users.findOne({ email });

    if (!userExist) {
      return next(new AppError("User doesnot exist", StatusCodes.BAD_REQUEST));
    }

    req.user = { id: userExist._id, name, email };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
