const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const auList = sequelize.define(
  "auList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contact_person: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    additional_email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    supplier: {
      type: DataTypes.STRING,
    }
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_AU_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = auList;
