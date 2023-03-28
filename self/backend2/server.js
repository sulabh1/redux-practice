require("dotenv").config("./.env");
const mongoose = require("mongoose");

const app = require("./app");

const db = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(db)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3040;

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
