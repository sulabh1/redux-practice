const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const port = process.env.PORT || 2020;

app.listen(port, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Successfully connected database");
    })
    .catch((err) => {
      console.log("error while connecting the database", err);
    });
  console.log(`Listening to the port ${port}`);
});
