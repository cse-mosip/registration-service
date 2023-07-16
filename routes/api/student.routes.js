const express = require("express");
const { isAuth } = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");

router.post("/", [isAuth], studentController.registation);
module.exports = router;
