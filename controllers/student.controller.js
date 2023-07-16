const {formValidation} = require("./../validation/form");
const RegistationForm = require("./../dto/RegistationForm");
const Student = require("../model/student.model");
const sequelize = require("../config/connection");

exports.registation = (req, res) => {
    let {index, email, firstName, lastName, faculty} = req.body;
    console.log(req.body);
    let registationForm = new RegistationForm(
        index,
        email,
        firstName,
        lastName,
        faculty
    );
    let isValid = formValidation(registationForm);
    console.log(isValid);
    if (isValid) {
        sequelize.sync().then(() => {
            Student.create({...registationForm}).then((student) => {
                res.status(201).json({data: student, msg: "Add new user"});
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

exports.getAll = (req, res) => {
    sequelize.sync().then(() => {
        Student.findAll().then(results => {
            console.log(results);
            res.status(200).json(results);
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            res.status(500).json({error: 'Failed to retrieve data'});
        });

    }).catch((error) => {
        console.error('SOMETHING WRONG : ', error.message);
    });
}

exports.getById = (req, res) => {
    let id = req.params.id;
    sequelize.sync().then(() => {
        Student.findByPk(id).then(results => {
            console.log(results);
            res.status(200).json(results);
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
            res.status(500).json({error: 'Failed to retrieve data'});
        });

    }).catch((error) => {
        console.error('SOMETHING WRONG : ', error.message);
    });
}

exports.deleteById = (req, res) => {
    const studentId = req.params.id;
    sequelize.sync().then(() => {
        Student.destroy({
            where: {
                id: studentId
            }
        }).then(results => {
            console.log(results);
            res.status(200).json(results);
        }).catch((error) => {
            res.status(500).json({error: error.message});
        });

    }).catch((error) => {
        console.error('SOMETHING WRONG : ', error.message);
    });
};