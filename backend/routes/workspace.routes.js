const express = require("express");
const {
  createWorkspace,
  getWorkspace,
  addWorkSpaceMembers,
  getWorkspaceMembers,
} = require("../controller/workspace.controller");
const Auth = require("../middleware/auth");

const router = express.Router();

router.post("/", Auth, createWorkspace);
router.post("/:id/members", Auth, addWorkSpaceMembers);
router.get("/get-members/:id", Auth, getWorkspaceMembers);
router.get("/", Auth, getWorkspace);

module.exports = router;
