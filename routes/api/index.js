const router = require('express').Router();
const authorizationRoutes = require("./authorization.routes");

router.use('/authorization', authorizationRoutes);
//router.use('/registration', registrationRoutes);

module.exports = router;
