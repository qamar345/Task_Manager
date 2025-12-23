const express = require("express");
const { Register, Login, getUsers } = require("../controller/auth.controller");
const Auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", Auth, getUsers);

module.exports = router;
