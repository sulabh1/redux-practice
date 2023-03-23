const app = require("./app");

const { sequelize } = require("./models");
const port = 8001;

app.listen(port, () => {
  try {
    sequelize.authenticate();
    console.log("Successfully connected db");
  } catch (error) {
    console.log("something went wrong while connecting database", error);
  }
  console.log("Listening to the port", port);
});
