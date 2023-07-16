const express = require("express");
const { isAuth } = require("./../../middleware/authorization");
const { formValidation } = require("./../../validation/form");
const RegistationForm = require("./../../dto/RegistationForm");
const router = express.Router();
const sequelize = require("./../../config/connection.js");

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

const { Sequelize, DataTypes } = require('sequelize');


const STUDENTS = sequelize.define('STUDENTS', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'STUDENTS', 
  timestamps: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    await STUDENTS.sync();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

router.get("/",(req, res) => {
  sequelize.sync().then(() => {
    STUDENTS.findAll().then(results => {
      console.log(results);
      res.status(200).json(results);
    }).catch((error) => {
      console.error('Failed to retrieve data : ', error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    });

  }).catch((error) => {
    console.error('SOMETHING WRONG : ', error);
  });

});


module.exports = router;
