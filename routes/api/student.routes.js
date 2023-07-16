const express = require("express");
const { isAuth } = require("../../middleware/authorization");
const router = express.Router();
const studentController = require("../../controllers/student.controller");
const sequelize = require("../../config/connection");


router.post("/", [isAuth], studentController.registation);
router.get("/",[isAuth], studentController.getAll);
module.exports = router;
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
router.get("/:id",(req, res) => {
  sequelize.sync().then(() => {

    STUDENTS.findOne({
        where: {
            id : "1"
        }
    }).then(results => {
        console.log(results);
        res.status(200).json(results);
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});


});
