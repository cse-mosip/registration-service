const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Faculty extends Model { }

Faculty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        facultyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'faculty',
    }
);

module.exports = Faculty;
