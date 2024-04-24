const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const consLitigasiList = sequelize.define(
  "consLitigasiList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    supplier: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    sales_date: {
      type: DataTypes.DATE,
    },
    submit_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    supplier_code: {
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
    tableName: "VMS_ANALISIS_PENJUALAN_LIT",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = consLitigasiList;
