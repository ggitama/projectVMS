const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const documentRetur = sequelize.define(
  "documentList",
  {
    // Define fields that match the columns in your view
    cdt: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true
    },
    cpfi_status: {
      type: DataTypes.STRING,
    },
    cpfi_date: {
      type: DataTypes.DATE,
    },
    cpfi_revisi: {
      type: DataTypes.STRING,
    },
    ci_status: {
      type: DataTypes.STRING,
    },
    ci_date: {
      type: DataTypes.DATE,
    },
    ci_revisi: {
      type: DataTypes.STRING,
    },
    cpfi_url: {
      type: DataTypes.STRING,
    },
    ci_url: {
      type: DataTypes.STRING,
    },
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_DOCUMENT_CONSIGNMENT_VIEW",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = documentRetur;
