const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const taskRouter = require("./route/task.route");

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use("/api", taskRouter);

module.exports = app;
