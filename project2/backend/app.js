const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/user.rotes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/post", require("./routes/posts.routes"));

module.exports = app;
