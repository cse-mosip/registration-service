const router = require("express").Router();
const apiStudentRoutes = require("./student.routes");
const authorizationRoutes = require("./authorization.routes");
const userRoutes = require("./user.routes")

router.use("/student", apiStudentRoutes);
router.use("/authorization", authorizationRoutes);
router.use("/user", userRoutes)

module.exports = router;
