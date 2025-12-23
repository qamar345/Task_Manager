const sequelize = require("../config/connection");

const ActivityLog = require("./activity_logs");
const Project = require("./projects");
const Task = require("./tasks");
const User = require("./user.model");
const WorkspaceMember = require("./workspace_members");
const Workspace = require("./workspaces.model");

// ----- Associations -----

// User -> Workspace (creator)
User.hasMany(Workspace, { foreignKey: "created_by" });
Workspace.belongsTo(User, { foreignKey: "created_by" });

// Workspace -> WorkspaceMembers
Workspace.hasMany(WorkspaceMember, { foreignKey: "workspace_id" });
WorkspaceMember.belongsTo(Workspace, { foreignKey: "workspace_id" });

// User -> WorkspaceMembers
User.hasMany(WorkspaceMember, { foreignKey: "user_id" });
WorkspaceMember.belongsTo(User, { foreignKey: "user_id" });

// Workspace -> Projects
Workspace.hasMany(Project, { foreignKey: "workspace_id" });
Project.belongsTo(Workspace, { foreignKey: "workspace_id" });

// Project -> Tasks
Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

// User -> Tasks (assigned_to)
User.hasMany(Task, { foreignKey: "assigned_to" });
Task.belongsTo(User, { foreignKey: "assigned_to" });

// Task -> ActivityLogs
Task.hasMany(ActivityLog, { foreignKey: "task_id" });
ActivityLog.belongsTo(Task, { foreignKey: "task_id" });

// User -> ActivityLogs
User.hasMany(ActivityLog, { foreignKey: "user_id" });
ActivityLog.belongsTo(User, { foreignKey: "user_id" });


module.exports = {
  sequelize,
  User,
  Task,
  Project,
  Workspace,
  WorkspaceMember,
  ActivityLog,
};
