const { formValidation } = require("./../validation/form");
const RegistationForm = require("./../dto/RegistationForm");
const Student = require("../model/student.model");

exports.registation = (req, res) => {
  let { index, email, firstName, lastName, faculty } = req.body;
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
    Student.create({...registationForm}).then((student) => {
        res.status(201).json({ data: student, msg: "Add new user" });
    }).catch((err) => {
      console.log(err);
      res.status(409).json({ data: {}, msg: err.message });
    });
  } else {
    //response
    res.status(400).json({ data: {}, msg: "Invalid form data" });
  }
};
