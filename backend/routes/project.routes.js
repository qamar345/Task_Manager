const express = require("express");
const Auth = require("../middleware/auth");
const {
  createProject,
  getProjectsByWorkspace,
  GetProjects,
} = require("../controller/project.controller");

const router = express.Router();

router.post("/", Auth, createProject);
router.get("/", Auth, getProjectsByWorkspace);
router.get("/get-projects", Auth, GetProjects);

module.exports = router;
