"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tasks.belongsTo(models.Users, { foreignKey: "user" });
    }
  }
  Tasks.init(
    {
      taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      date: {
        type: DataTypes.DATE(6),
        defaultValue: Date.now(),
      },
      user: DataTypes.UUID,
    },
    {
      underscored: true,
      freezeTableName: true,
      sequelize,
      modelName: "Tasks",
      tableName: "tasks",
    }
  );
  return Tasks;
};
