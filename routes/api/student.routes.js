const express = require("express");
const { isAuth } = require("../../middleware/authorization");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const studentController = require("../../controllers/student.controller");

router.get("/:id", [isAuth], studentController.getById);
router.delete("/:id", [isAuth], studentController.deleteById);
router.get("/", [isAuth], studentController.getAll);
router.post("/", [isAuth], upload.none(), studentController.registation);
module.exports = router;
