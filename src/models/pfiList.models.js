const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const pfiList = sequelize.define(
  "pfiList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    revision: {
      type: DataTypes.INTEGER,
    },
    date_updated: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.STRING,
    },
    purchase_order: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING,
    },
    business_unit: {
      type: DataTypes.STRING,
    },
    merchant: {
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
    tableName: "VMS_PFI_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = pfiList;
