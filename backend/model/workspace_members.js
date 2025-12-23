const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Workspace = require("./workspaces.model");
const User = require("./user.model");

const WorkspaceMember = sequelize.define(
  "WorkspaceMember",
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "member", "viewer"),
      defaultValue: "member",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "workspace_members",
    timestamps: false,
  }
);

module.exports = WorkspaceMember;
