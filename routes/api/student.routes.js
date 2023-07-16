const express = require("express");
const { isAuth } = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");
const sequelize = require("../../config/connection");

router.post("/", [isAuth], studentController.registation);
router.get("/",[isAuth], studentController.getAll);
module.exports = router;
