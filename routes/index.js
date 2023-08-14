const router = require("express").Router();
const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Registration service",
    });
});
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(400).send("404 Not Found");
});

module.exports = router;