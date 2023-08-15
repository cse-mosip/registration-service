const router = require("express").Router();
const retrieveController = require("../../controllers/retrieve.controller");

//sign in endpoint
router.post("/data", retrieveController.retrieve);
router.post("/verify", retrieveController.verify);
router.get("/photo", retrieveController.photo);
module.exports = router;