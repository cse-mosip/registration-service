const router = require("express").Router();
const apiStudentRoutes = require("./student.routes");
const authorizationRoutes = require("./authorization.routes");
const authorizationController = require("../../controllers/authorization.controller");
const { isAuth } = require("./../../middleware/authorization");

router.use("/student", apiStudentRoutes);
router.use("/authorization", authorizationRoutes);
//router.use('/registration', registrationRoutes);

module.exports = router;
