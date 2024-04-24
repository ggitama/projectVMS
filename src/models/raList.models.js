const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const raList = sequelize.define(
  "raList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    purchase_order: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    revision_number: {
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
    merchant: {
      type: DataTypes.STRING,
    },
    store: {
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
    tableName: "VMS_RA_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = raList;
