const { where } = require("sequelize");
const { Project, WorkspaceMember } = require("../model/index.js");

// Create Project
const createProject = async (req, res) => {
  const { name, description, workspaceId } = req.body;
  const userId = req.user.userId;

  if (!workspaceId) {
    return res.status(400).json({ message: "workspaceId is required" });
  }

  // // Check if user is workspace member
  const member = await WorkspaceMember.findOne({
    where: { workspace_id: workspaceId, user_id: userId },
  });
  if (!member) return res.status(403).json({ message: "Access denied" });

  const project = await Project.create({
    name,
    description,
    workspace_id: workspaceId,
  });
  res.json({ message: "Project created successfuly" });
};

// Get Projects by Workspace
const getProjectsByWorkspace = async (req, res) => {
  const { workspaceId } = req.query;
  const userId = req.user.userId;

  const member = await WorkspaceMember.findOne({
    where: { workspace_id: workspaceId, user_id: userId },
  });
  if (!member) return res.status(403).json({ message: "Access denied" });

  const projects = await Project.findAll({
    where: { workspace_id: workspaceId },
  });
  res.json(projects);
};

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createProject,
  getProjectsByWorkspace,
  GetProjects
};
