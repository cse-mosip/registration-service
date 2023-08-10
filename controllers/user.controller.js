const User = require("../model/user.model");
const UserRegistrationForm = require("../dto/UserRegistrationForm");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 9;
const { userRegistrationFormValidation } = require("../validation/form");

exports.registation = async(req, res) => {
    let { email, firstName, lastName, password, role } = req.body;
    // console.log(req.body);
    let userRegistationForm = new UserRegistrationForm(
        email,
        firstName,
        lastName,
        password,
        role
    );
    const result = await this.registationFunction(userRegistationForm);
    if ("error" in result) {
        res.status(404).json(result);
    }
    res.status(200).json(result.success);
};

exports.registationFunction = async(userRegistationForm) => {
    const { error } = userRegistrationFormValidation(userRegistationForm);

    if (error) {
        return { error: error };
    }

    userRegistationForm.password = await bcrypt.hash(password, SALT_ROUNDS);

    existingUser = await User.findOne({ where: { email: email } });
    // console.log(existingUser)
    if (existingUser) {
        return { error: "Email already exists" };
    }

    sequelize
        .sync()
        .then(() => {
            User.create({...userRegistationForm })
                .then((user) => {
                    return { success: user };
                })
                .catch((err) => {
                    console.log(err);
                    return { error: err };
                });
        })
        .catch((error) => {
            console.error("SOMETHING WRONG : ", error.message);
            return { error: error };
        });
};