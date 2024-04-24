const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const consNotaReturList = sequelize.define(
  "consNotaReturList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nomor_retur: {
      type: DataTypes.STRING,
    },
    nomor_pfi: {
      type: DataTypes.STRING,
    },
    supplier_code: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    pfi_date: {
      type: DataTypes.DATE,
    },
    download_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    business_unit: {
      type: DataTypes.STRING,
    },
    business_unit_code: {
      type: DataTypes.STRING,
    },
    search: {
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
    tableName: "VMS_NOTA_RETUR_CONS",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = consNotaReturList;
