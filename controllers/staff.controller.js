const { staffFormValidation } = require("./../validation/form");
const StaffRegistationForm = require("./../dto/StaffRegistationForm");
const Student = require("../model/staff.model");
const sequelize = require("../config/connection");

exports.registation = (req, res) => {
  let { email, firstName, lastName, faculty, department } = req.body;
  console.log(req.body);
  let registationForm = new StaffRegistationForm(
    email,
    firstName,
    lastName,
    faculty,
    department
  );
  let isValid = staffFormValidation(registationForm);
  console.log(isValid);
  if (isValid) {
    sequelize
      .sync()
      .then(() => {
        Student.create({ ...registationForm })
          .then((student) => {
            res.status(201).json({ data: student, msg: "Add new user" });
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
