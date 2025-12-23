const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Workspace = require("./workspaces.model");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    workspace_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Workspace,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "projects",
    timestamps: false,
  }
);

module.exports = Project;
