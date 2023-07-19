const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      facultyId: {
        type: DataTypes.STRING,
        references: {
            model: 'faculty',
            key: 'id',
            onDelete: 'cascade',
          },
      },
      buildingId: {
        type: DataTypes.STRING,
        references: {
            model: 'building',
            key: 'id',
            onDelete: 'cascade',
          },
      },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'department', 
  }
);

module.exports = Department;
