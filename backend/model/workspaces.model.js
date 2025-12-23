const DataTypes = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./user.model");

const Workspace = sequelize.define(
  "Workspace",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "workspaces",
    timestamps: false,
  }
);

module.exports = Workspace;
