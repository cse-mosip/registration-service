const express = require("express");
const { isAuth } = require("./../../middleware/authorization");
const { formValidation } = require("./../../validation/form");
const RegistationForm = require("./../../dto/RegistationForm");
const router = express.Router();

router.post("/", [isAuth], (req, res) => {
  let { index, email, firstName, lastName, faculty } = req.body;
  let registationForm = new RegistationForm(
    index,
    email,
    firstName,
    lastName,
    faculty
  );
  let isValid = formValidation(registationForm);

  if (isValid) {
    //check is it exist
    let isExist = true;

    if (isExist) {
      //responce
      res.status(409).json({ data: {}, msg: "User already exist" });
    } else {
      //add body to database
      //responce
      res.status(201).json({ data: {}, msg: "Add new user" });
    }
  } else {
    //responce
    res.status(400).json({ data: {}, msg: "Invalid form data" });
  }
});
module.exports = router;
