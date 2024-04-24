const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const findPP = sequelize.define(
  "findPP",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contract_code: {
      type: DataTypes.STRING,
    },
    contract_name: {
      type: DataTypes.STRING,
    },
    agreement_code: {
      type: DataTypes.STRING,
    },
    agreement_type: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    period_from: {
      type: DataTypes.DATE,
    },
    period_to: {
      type: DataTypes.DATE,
    },
    negotiator_name: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    division: {
      type: DataTypes.STRING,
    },
    departement: {
      type: DataTypes.STRING,
    },
    fax_number: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    supplier_code: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    supplier_tax_name: {
      type: DataTypes.STRING,
    },
    supplier_tax_id: {
      type: DataTypes.STRING,
    },
    // supplier_negotiator: {
    //   type: DataTypes.STRING,
    // },
    supplier_position: {
      type: DataTypes.STRING,
    },
    supp_phone_number: {
      type: DataTypes.STRING,
    },
    email1: {
      type: DataTypes.STRING,
    },
    email2: {
      type: DataTypes.STRING,
    },
    email3: {
      type: DataTypes.STRING,
    },
    // contract_type: {
    //   type: DataTypes.STRING,
    // },
    agreement_item_code: {
      type: DataTypes.STRING,
    },
    fee_amount: {
      type: DataTypes.FLOAT,
    },
    onbudget: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.STRING,
    },
    tg_tinggi: {
      type: DataTypes.INTEGER,
    },
    floor_display_tinggi: {
      type: DataTypes.INTEGER,
    },
    standing_display_tinggi: {
      type: DataTypes.INTEGER,
    },
    clip_strip_tinggi: {
      type: DataTypes.INTEGER,
    },
    chiller_cabinet_tinggi: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    }
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_FIND_PP",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = findPP;
