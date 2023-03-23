const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { promisify } = require("util");

const AppError = require("./AppError");
const { Users } = require("../models");

const protect = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    const user = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!user) {
      return next(new AppError("User unauthorized", StatusCodes.UNAUTHORIZED));
    }

    const { id, name, email } = user;
    console.log(email);
    const userExist = await Users.findOne({ where: { email } });

    if (!userExist) {
      return next(new AppError("User doesnot exist", StatusCodes.BAD_REQUEST));
    }

    req.user = { id, name, email };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
