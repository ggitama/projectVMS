const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const pfirList = sequelize.define(
  "pfirList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    referensi: {
      type: DataTypes.STRING,
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
    tanggal_diterima: {
      type: DataTypes.DATE,
    },
    isactive: {
      type: DataTypes.STRING,
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
    store_code: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_PFIR_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = pfirList;
