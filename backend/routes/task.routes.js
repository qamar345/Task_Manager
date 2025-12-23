const express = require("express");
const Auth = require("../middleware/auth");
const {
  createTask,
  getTaskLogs,
  getTasks,
  deleteTask,
  updateTask,
  GetTasksUser,
  getSingleTask,
} = require("../controller/task.controller");

const router = express.Router();

router.post("/", Auth, createTask);
router.get("/", Auth, getTasks);
router.patch("/:id", Auth, updateTask);
router.delete("/:id", Auth, deleteTask);
router.get("/logs", Auth, getTaskLogs);
router.get("/get-tasks", Auth, GetTasksUser);
router.get("/:id", Auth, getSingleTask);

module.exports = router;
