const router = require('express').Router();
const authorizationController = require("../../controllers/authorization.controller");

//sign in endpoint
router.get("/signIn", authorizationController.signIn);
module.exports = router;