const express = require("express");
const {isAuth} = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");
const sequelize = require("../../config/connection");


router.get("/:id", [isAuth], studentController.getById);
router.get("/", [isAuth], studentController.getAll);
router.post("/", [isAuth], studentController.registation);
module.exports = router;
