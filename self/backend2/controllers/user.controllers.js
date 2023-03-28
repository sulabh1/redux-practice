const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const Users = require("../models/user.models");
const AppError = require("../middlewares/AppError.middlewares");

exports.register = async (req, res, next) => {
  const error = validationResult(req);
  const { name, email, password } = req.body;

  try {
    if (!error.isEmpty()) {
      return next(new AppError(error.array()[0].msg, StatusCodes.BAD_REQUEST));
    }

    const users = await Users.findOne({ email });

    if (users) {
      return next(
        new AppError(
          "Email already exist please try to login",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await promisify(jwt.sign)(
      { id: createdUser._id, name, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
        algorithm: "HS256",
      }
    );

    res.status(StatusCodes.ACCEPTED).json({
      status: "Successfully registered",
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const error = validationResult(req);
  const { email, password } = req.body;

  try {
    if (!error.isEmpty()) {
      return next(new AppError(error.array()[0].msg, StatusCodes.BAD_REQUEST));
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return next(
        new AppError("Invalid email or password", StatusCodes.BAD_REQUEST)
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(
        new AppError("Invalid email or password", StatusCodes.BAD_REQUEST)
      );
    }

    const token = await promisify(jwt.sign)(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
        algorithm: "HS256",
      }
    );

    res.status(StatusCodes.ACCEPTED).json({
      status: "Successfully login",
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
