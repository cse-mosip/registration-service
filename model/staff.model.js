const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Staff extends Model { 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Staff.init(
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
        nic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, //TODO: change to BLOB
            allowNull: false,
        },
        deptId:{
            type: DataTypes.STRING,
            references: {
                model: 'department',
                key: 'id',
                onDelete: 'cascade',
            },
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true, //TODO: Change to false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true, //TODO: Change to false
        },
        role :{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fingerprintId: {
            type: DataTypes.STRING,
            references: {
                model: 'fingerprint',
                key: 'fingerprintId',
                onDelete: 'cascade',
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'staff',
    }
);

module.exports = Staff;
