const Sequelize = require("sequelize");
const Student = require("../model/student.model");
const rolePrivileges = require("../config/roles");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.retrieve = async(req, res) => {
    try {
        if (!req.body || !req.body.indices || !req.body.fields) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        const indices = req.body.indices;
        const fields = req.body.fields;
        if (!Array.isArray(indices) || !Array.isArray(fields)) {
            res.status(400).send({
                message: "indices and fields must be lists!",
            });
            return;
        }

        // if (!(req.user.role in rolePrivileges)) {
        //     res.status(400).send({
        //         message: "Unknown role!",
        //     });
        //     return;
        // }

        // const accessibleFields = rolePrivileges[req.user.role];
        const accessibleFields = [
            "index",
            "email",
            "firstName",
            "lastName",
            "faculty",
            "department",
            "photo",
        ];

        try {
            fields.forEach((field) => {
                if (!(typeof field === "string" || field instanceof String))
                    throw Error("Invalid field");
                if (!accessibleFields.includes(field))
                    throw Error("Unauthorized to access some fields");
            });
        } catch (err) {
            res.status(400).send({
                message: err.message,
            });
            return;
        }

        const Op = Sequelize.Op;
        let results = await Student.findAll({
            attributes: fields,
            where: {
                index: {
                    [Op.in]: indices,
                },
            },
        });
        results = results.map((obj) => obj.dataValues);
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error occured",
        });
        return;
    }
};

exports.verify = async(req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json({
            valid: false,
            reason: "Email or Password is Missing",
        });
    } else {
        // Validate if user exist in our database
        try {
            const user = await User.findOne({ where: { email: email } });
            if (user == null) {
                res.status(400).json({
                    valid: false,
                    reason: "No account for this email",
                });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({
                    valid: false,
                    reason: "Password does not match !",
                });
            } else {
                let data = {
                    valid: true,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                };
                if (user.role == "student") {
                    const student = await Student.findOne({ where: { email: email } });
                    data["index"] = student.index;
                }
                res.status(201).json(data);
            }
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
};

exports.photo = async(req, res) => {
    try {
        console.log(req.query.index);
        const index = req.query.index;
        if (!index) {
            return res.status(404).json({ message: "Invalid index" });
        }
        const student = await Student.findOne({ where: { index: index } });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.send(student.photo);
    } catch (err) {
        return res.status(403).json({ message: "No index specified" });
    }
};