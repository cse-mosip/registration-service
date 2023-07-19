const express = require("express");
const {isAuth, isAdmin} = require("../../middleware/authorization");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.post("/", [isAuth, isAdmin], userController.registation);

module.exports = router;