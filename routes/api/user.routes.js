const express = require("express");
const {isAuth} = require("../../middleware/authorization");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.post("/", [isAuth], userController.registation);

module.exports = router;