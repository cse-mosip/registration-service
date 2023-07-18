const router = require('express').Router();
const {isAuth} = require("../../middleware/authorization");
const retrieveController = require("../../controllers/retrieve.controller");

//sign in endpoint
router.post("/", [isAuth], retrieveController.retrieve);
module.exports = router;
