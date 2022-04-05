const express = require("express");
const createUser = require("../controllers/users/createUser.js");
const { spawn } = require("child_process");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").post(createUser);

module.exports = router;
