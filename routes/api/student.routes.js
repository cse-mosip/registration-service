const express = require("express");
const { isAuth } = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");
const { upload } = require("../../uploads/storage");

router.get("/:id", [isAuth], studentController.getById);
router.delete("/:id", [isAuth], studentController.deleteById);
router.get("/", [isAuth], studentController.getAll);
router.post(
    "/", [isAuth, upload.single("image")],
    studentController.registation
);
router.put("/:id", [isAuth], studentController.editUser);
module.exports = router;