const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fingerprint extends Model {}

Fingerprint.init(
  {
    fingerprintId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    fingerprint: { //TODO : Change to blob data type or serialized array 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'fingerprint', 
  }
);

module.exports = Fingerprint;
