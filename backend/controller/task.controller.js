const { where, Model } = require("sequelize");
const {
  Task,
  WorkspaceMember,
  ActivityLog,
  User,
  Project,
} = require("../model/index.js");

// Create Task
const createTask = async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    dueDate,
    projectId,
    assignedTo,
    workspaceId,
  } = req.body.values;
  const userId = req.user.userId;

  console.log(req.body);
  console.log(userId);
  // Check if user is workspace member
  // (Assuming Task belongs to Project -> Workspace)
  const member = await WorkspaceMember.findOne({
    where: { workspace_id: workspaceId, user_id: userId },
  });
  if (!member) return res.status(403).json({ message: "Access denied" });

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    due_date: dueDate,
    project_id: projectId,
    assigned_to: assignedTo,
  });

  // Create initial activity log
  await ActivityLog.create({
    task_id: task.id,
    user_id: userId,
    action: "Task created",
  });

  res.json({ message: "Task created successfuly" });
};

// Get Tasks by Project with filters
const getTasks = async (req, res) => {
  const { projectId, status } = req.query;
  const userId = req.user.userId;

  try {
    const member = await WorkspaceMember.findOne({
      where: { user_id: userId },
    });
    if (!member) return res.status(403).json({ message: "Access denied" });

    const tasks = await Task.findAll({
      where: {
        project_id: projectId, // DB column
        ...(status && { status }),
        ...(userId && { assigned_to: userId }), // map variable to DB column
      },
    });

    res.json({ tasks: tasks, role: member.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAdminTasks = async (req, res) => {
  const { workspaceId } = req.params;
  const userId = req.user.userId;

  try {
    const member = await WorkspaceMember.findOne({
      where: {
        workspace_id: workspaceId,
        user_id: userId,
        role: "admin", // only admin allowed
      },
    });
    if (!member) return res.status(403).json({ message: "Access denied" });

    const projects = await Project.findAll({
      where: { workspace_id: workspaceId },
    });

    const projectIds = projects.map((p) => p.id);

    const tasks = await Task.findAll({
      where: { project_id: projectIds },
      order: [["created_at", "DESC"]],
    });

    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      where: {
        id: id,
      },
    });
    res.json(task);
  } catch (error) {
    res.json(error);
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.user.userId;

  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.update(updates);

  // Log update
  await ActivityLog.create({
    task_id: task.id,
    user_id: userId,
    action: "Task updated",
  });

  res.json({ message: "Task Updated Successfuly" });
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.destroy();

  res.json({ message: "Task deleted" });
};

// Get Activity Logs for Task
const getTaskLogs = async (req, res) => {
  const userId = req.user.userId;

  const logs = await ActivityLog.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Task,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });
  res.json(logs);
};

const GetTasksUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const tasks = await Task.findAll({
      where: {
        assigned_to: userId, // sirf current user ke tasks
      },
    });

    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskLogs,
  GetTasksUser,
  getSingleTask,
  getAdminTasks,
};
