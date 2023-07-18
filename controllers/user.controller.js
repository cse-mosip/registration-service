const User = require("../model/user.model");
const UserRegistrationForm = require("../dto/UserRegistrationForm")
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 9;

exports.registation = async (req, res) => {
    let { email, firstName, lastName, password, role} = req.body;
    // console.log(req.body);
    let userRegistationForm = new UserRegistrationForm(
        email,
        firstName,
        lastName,
        password,
        role
    );
    userRegistationForm.password = await bcrypt.hash(password, SALT_ROUNDS);
    // let isValid = studentFormValidation(registationForm);
    // console.log(isValid);
    isValid = true;
    if (isValid) {
        existingUser = await User.findOne({ where: { email: email } })
        // console.log(existingUser)
        if (existingUser){
            return res.status(400).json({data: {}, msg: "User Already Exists"})
        }

        sequelize.sync().then(() => {
            User.create({...userRegistationForm}).then((user) => {
                res.status(201).json({data: user, msg: "Add new user"});
            }).catch((err) => {
                console.log(err);
                res.status(409).json({data: {}, msg: err.message});
            });
        }).catch((error) => {
            console.error('SOMETHING WRONG : ', error.message);
        });
    } else {
        //response
        res.status(400).json({data: {}, msg: "Invalid form data"});
    }
};