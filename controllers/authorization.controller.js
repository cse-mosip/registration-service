const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signIn = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send("Email or Password is Missing");
    } else {
        // Validate if user exist in our database
        // const user = await User.findOne({ email });

        const salt = bcrypt.genSaltSync(saltRounds);
        encryptedPassword = bcrypt.hashSync(process.env.PASSWORD, salt);
        try {
            if (!bcrypt.compareSync(password, encryptedPassword)) {
                res.status(400).json("Password does not match !");
            } else {
                const token = jwt.sign(
                    { email_id: email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );
                res.status(201).json(token);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

exports.deleteUser = (req, res) => {
    const userId = req.body.userId;
    if (!userId) {
        return res.status(400).send("User Id is Missing");
    }
    // Validate if user exist in our database
    User.findByIdAndRemove(userId, (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    });
};