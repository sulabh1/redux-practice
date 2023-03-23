require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 7000;
const db = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.set("strictQuery", true);

mongoose
  .connect(db)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log("something went wrong", err);
  });

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
