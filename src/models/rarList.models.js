const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const rarList = sequelize.define(
  "rarList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    purchase_order: {
      type: DataTypes.STRING,
    },
    receiving_advice_number: {
      type: DataTypes.STRING,
    },
    receiving_advice_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },
    business_unit_code: {
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
    tableName: "VMS_RAR_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = rarList;
