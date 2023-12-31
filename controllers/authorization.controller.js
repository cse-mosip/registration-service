const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

exports.signIn = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send("Email or Password is Missing");
    } else {
        // Validate if user exist in our database
        try {
            const user = await User.findOne({ where: { email: email } });
            if (user == null) {
                return res.status(401).send("No account for this email");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json("Password does not match !");
            } else {
                const token = jwt.sign({ email_id: email, role: user.role },
                    process.env.JWT_SECRET, {
                        expiresIn: "20m",
                    }
                );
                return res.status(201).json(token);
            }
        } catch (err) {
            return res.status(500).send(err.message);
        }
    }
};