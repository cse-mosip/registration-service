const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class NonAcademicStaff extends Model { }

NonAcademicStaff.init(
  {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: true, // TODO: Change to false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, //TODO: Change to false and blob data type
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true, //TODO: Change to false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, //TODO: Change to false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true, //TODO: Change to false
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'nonAcademicStaff',
  }
);

module.exports = NonAcademicStaff;
