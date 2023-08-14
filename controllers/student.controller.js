const { studentFormValidation } = require("./../validation/form");
const StudentRegistationForm = require("./../dto/StudentRegistationForm");
const UserRegistrationForm = require("./../dto/UserRegistrationForm");
const Student = require("../model/student.model");
const sequelize = require("../config/connection");
const User = require("../model/user.model");
const bcrypt = require('bcrypt');

function base64ToBlob(image) {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    return base64Data;
}

exports.registation = async (req, res) => {
    try {
        let {
            index,
            email,
            firstName,
            lastName,
            faculty,
            department,
            password,
        } = req.body.user;

        let photo = req.body.photo;
        let hashedPassword = bcrypt.hashSync(password, 10);


        const image = base64ToBlob(photo);

        let userRegistrationForm = new UserRegistrationForm(
            email,
            firstName,
            lastName,
            hashedPassword,
            "student"
        );

        let registrationForm = new StudentRegistationForm(
            index,
            email,
            firstName,
            lastName,
            faculty,
            department,
            image
        );

        let isValid = studentFormValidation(registrationForm);
        if (!isValid) {
            return res.status(400).json({ data: {}, msg: "Invalid form data" });
        }
        await sequelize.sync();
        await User.create(userRegistrationForm);
        const student = await Student.create(registrationForm);
        res.status(201).json({
            data: student,
            msg: "Successfully registered student and user",
        });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ msg: "An error occurred while processing the request" });
    }
};

exports.getAll = (req, res) => {
    sequelize
        .sync()
        .then(() => {
            Student.findAll()
                .then((results) => {
                    console.log(results);
                    res.status(200).json(results);
                })
                .catch((error) => {
                    console.error("Failed to retrieve data : ", error);
                    res.status(500).json({ error: "Failed to retrieve data" });
                });
        })
        .catch((error) => {
            console.error("SOMETHING WRONG : ", error.message);
        });
};

exports.getById = (req, res) => {
    let id = req.params.id;

    sequelize
        .sync()
        .then(() => {
            Student.findByPk(id)
                .then((results) => {
                    console.log(results);
                    res.status(200).json(results);
                })
                .catch((error) => {
                    console.error("Failed to retrieve data : ", error);
                    res.status(500).json({ error: "Failed to retrieve data" });
                });
        })
        .catch((error) => {
            console.error("SOMETHING WRONG : ", error.message);
        });
};

exports.deleteById = (req, res) => {
    const studentId = req.params.id;
    sequelize
        .sync()
        .then(() => {
            Student.destroy({
                where: {
                    id: studentId,
                },
            })
                .then((results) => {
                    console.log(results);
                    res.status(200).json(results);
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        })
        .catch((error) => {
            console.error("SOMETHING WRONG : ", error.message);
            res.status(500).json({ error: error.message });
        });
};

exports.editUser = (req, res) => {
    let id = req.params.id;
    let { index, email, firstName, lastName, faculty, department } = req.body;
    let registationForm = new StudentRegistationForm(
        index,
        email,
        firstName,
        lastName,
        faculty,
        department
    );
    let isValid = studentFormValidation(registationForm);
    console.log(isValid);
    if (isValid) {
        sequelize
            .sync()
            .then(() => {
                Student.update({ ...registationForm }, {
                    where: {
                        id: id,
                    },
                })
                    .then((student) => {
                        res.status(201).json({ data: student, msg: "Update the User" });
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