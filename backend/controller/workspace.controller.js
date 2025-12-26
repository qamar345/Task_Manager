const { where } = require("sequelize");
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

const addWorkSpaceMembers = async (req, res) => {
  const { id } = req.params; //workspaceid
  const { user_id, role } = req.body;
  const currentUserId = req.user.userId;

  try {
    const admin = await WorkspaceMember.findOne({
      where: {
        workspace_id: id,
        user_id: currentUserId,
        role: "admin",
      },
    });

    if (!admin) {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyMember = await WorkspaceMember.findOne({
      where: {
        workspace_id: id,
        user_id,
      },
    });

    if (alreadyMember) {
      return res.status(400).json({ message: "User already a member" });
    }

    const member = await WorkspaceMember.create({
      workspace_id: id,
      user_id,
      role: role || "member",
    });

    res.status(201).json({
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getWorkspaceMembers = async (req, res) => {
  const { id } = req.params; // workspace id
  const userId = req.user.userId;
  console.log(req.params);
  try {
    const membership = await WorkspaceMember.findOne({
      where: { workspace_id: id, user_id: userId },
    });

    if (!membership) return res.status(403).json({ message: "Access denied" });

    const members = await WorkspaceMember.findAll({
      where: { workspace_id: id },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    include: [
      {
        model: WorkspaceMember,
        where: { user_id: userId }, // membership check
        attributes: ["role"],
        include: [User],
        required: true, // ensures workspace is returned only if user is a member
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
  addWorkSpaceMembers,
  getWorkspaceMembers,
};
