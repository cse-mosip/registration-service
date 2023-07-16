const router = require("express").Router();
const apiStudentRoutes = require("./student.routes");
const authorizationRoutes = require("./authorization.routes");

router.use("/student", apiStudentRoutes);
router.use("/authorization", authorizationRoutes);
//router.use('/registration', registrationRoutes);

module.exports = router;
