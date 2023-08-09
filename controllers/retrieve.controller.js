const Sequelize = require("sequelize");
const Student = require("../model/student.model");
const rolePrivileges = require("../config/roles");

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