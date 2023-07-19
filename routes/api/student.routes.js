const express = require("express");
const {isAuth} = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");

router.post("/index", [isAuth], studentController.getInfoByIndexList);
router.get("/:id", [isAuth], studentController.getById);
router.delete("/:id", [isAuth], studentController.deleteById);
router.get("/", [isAuth], studentController.getAll);
router.post("/", [isAuth], studentController.registation);
router.put("/:id", [isAuth], studentController.editUser);
module.exports = router;
