exports.signIn = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

   res.send("Authorization controller accessed")
}