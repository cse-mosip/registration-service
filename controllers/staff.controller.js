const { staffFormValidation } = require("./../validation/form");

const userController = require("./user.controller");
const StaffRegistationForm = require("./../dto/StaffRegistationForm");
const Staff = require("../model/staff.model");
const User = require("../model/user.model");
const sequelize = require("../config/connection");

exports.registation = (req, res) => {
    let { email, firstName, lastName, faculty, department, password } = req.body;
    console.log(req.body);
    let registationForm = new StaffRegistationForm(
        email,
        firstName,
        lastName,
        faculty,
        department
    );
    let userRegistrationForm = new UserRegistrationForm(
        email,
        firstName,
        lastName,
        password,
        "staff"
    );
    let isValid = staffFormValidation(registationForm);
    console.log(isValid);
    if (isValid) {
        sequelize
            .sync()
            .then(() => {
                userController
                    .registationFunction(userRegistrationForm)
                    .then(() => {
                        Staff.create({...registationForm })
                            .then((staff) => {
                                res.status(201).json({ data: staff, msg: "Add new user" });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(409).json({ data: {}, msg: err.message });
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(409).json({ data: {}, msg: err.message });
                    });
            })
            .catch((error) => {
                console.error("SOMETHING WRONG : ", error.message);
            });
    } else {
        //response
        res.status(400).json({ data: {}, msg: "Invalid form data" });
    }
};