const express = require("express");
const {isAuth} = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");

router.post("/getInfoByIndexList", [isAuth], studentController.getInfoByIndexList);
router.get("/:id", [isAuth], studentController.getById);
router.delete("/:id", [isAuth], studentController.deleteById);
router.get("/", [isAuth], studentController.getAll);
router.post("/", [isAuth], studentController.registation);
module.exports = router;
