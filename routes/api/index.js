const router = require("express").Router();
const apiStudentRoutes = require("./student.routes");
const authorizationRoutes = require("./authorization.routes");
const userRoutes = require("./user.routes");
const retrieveRoutes = require("./public.routes");

router.use("/student", apiStudentRoutes);
router.use("/authorization", authorizationRoutes);
router.use("/user", userRoutes);
router.use("/public", retrieveRoutes);

module.exports = router;
