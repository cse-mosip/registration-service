const router = require('express').Router();
const authorizationController = require("../../controllers/authorization.controller");

//sign in endpoint
router.post("/signIn", authorizationController.signIn);
module.exports = router;
