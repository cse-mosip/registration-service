const router = require("express").Router();
const retrieveController = require("../../controllers/retrieve.controller");

//sign in endpoint
router.post("/", retrieveController.retrieve);
module.exports = router;