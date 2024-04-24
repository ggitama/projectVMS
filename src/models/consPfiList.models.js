const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const consPfiList = sequelize.define(
  "consPfiList",
  {
    // Define fields that match the columns in your view
    referensi: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    merchant: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },
    revisi: {
      type: DataTypes.INTEGER,
    },
    tanggal_pfi: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    business_unit: {
      type: DataTypes.STRING,
    },
    supplier_code: {
      type: DataTypes.STRING,
    },
    pfi_source: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_CONS_PFI",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = consPfiList;
