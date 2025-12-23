const express = require("express");
const {
  createWorkspace,
  getWorkspace,
} = require("../controller/workspace.controller");
const Auth = require("../middleware/auth");

const router = express.Router();

router.post("/", Auth, createWorkspace);
router.get("/", Auth, getWorkspace);

module.exports = router ;
