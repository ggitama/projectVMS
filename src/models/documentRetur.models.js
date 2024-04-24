const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const documentRetur = sequelize.define(
  "documentList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    rr_status: {
      type: DataTypes.STRING,
    },
    rr_date: {
      type: DataTypes.DATE,
    },
    rr_number: {
      type: DataTypes.STRING,
    },
    rc_id: {
      type: DataTypes.STRING,
    },
    rc_status: {
      type: DataTypes.STRING,
    },
    rc_date: {
      type: DataTypes.DATE,
    },
    rc_number: {
      type: DataTypes.STRING,
    },
    rr_url: {
      type: DataTypes.STRING,
    },
    rc_url: {
      type: DataTypes.STRING,
    },
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_DOCUMENT_RETUR_VIEW",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = documentRetur;
