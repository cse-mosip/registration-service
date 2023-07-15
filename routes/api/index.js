const router = require("express").Router();
const apiStudentRoutes = require("./student");

router.use("/student", apiStudentRoutes);

//router.use('/registration', registrationRoutes);

module.exports = router;
