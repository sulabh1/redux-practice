const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

const AppError = require("./middlewares/AppError.middlewares");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const protect = require("./middlewares/protect.middlewares");

const app = express();

app.use(express.json());
app.use(cors({ allowedHeaders: "*", origin: "*" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", protect, taskRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find this url ${req.originalUrl} on this server`,
      StatusCodes.NOT_FOUND
    )
  );
});

app.use((error, req, res, next) => {
  if (error.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "fail",
      message: error.message,
    });
  }
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});
module.exports = app;
