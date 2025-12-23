const { Workspace, WorkspaceMember, User, Project } = require("../model/index");

// Create Workspace
const createWorkspace = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  try {
    const workspace = await Workspace.create({ name, created_by: userId });

    // Add creator as ADMIN
    await WorkspaceMember.create({
      user_id: userId,
      workspace_id: workspace.id,
      role: "admin",
    });

    res.json({ message: "Workspace created successfuly" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Workspace by ID (Only if member)
const getWorkspace = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const member = await WorkspaceMember.findOne({
    where: { user_id: userId },
  });
  if (!member) return res.status(403).json({ message: "Access denied" });

  const workspace = await Workspace.findAll({
    where: {
      created_by: req.user.userId, // <-- filter here
    },
    include: [
      {
        model: WorkspaceMember,
        include: [User],
      },
      {
        model: Project,
      },
    ],
  });

  res.json(workspace);
};

module.exports = {
  createWorkspace,
  getWorkspace,
};
