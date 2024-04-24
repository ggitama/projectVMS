const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const consSalesAnaylysisList = sequelize.define(
  "consSalesAnaylysisList",
  {
    // Define fields that match the columns in your view
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sales_date: {
      type: DataTypes.STRING,
    },
    site: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    supplier: {
      type: DataTypes.STRING,
    },
    barcode: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.STRING,
    },
    selling_price: {
      type: DataTypes.INTEGER,
    },
    sales_type: {
      type: DataTypes.STRING,
    },
    payment_media_promo: {
      type: DataTypes.STRING,
    },
    payment_type: {
      type: DataTypes.STRING,
    },
    sales_quantity: {
      type: DataTypes.INTEGER,
    },
    sub_total_sales_amount: {
      type: DataTypes.INTEGER,
    },
    return_quantity: {
      type: DataTypes.INTEGER,
    },
    sub_total_return_amount: {
      type: DataTypes.INTEGER,
    },
    sub_total_base_margin: {
      type: DataTypes.INTEGER,
    },
    sub_total_base_payable: {
      type: DataTypes.INTEGER,
    },
    supplierr: {
      type: DataTypes.INTEGER,
    },
    item_pro_sprt_supp_amt: {
      type: DataTypes.INTEGER,
    },
    supplierrr: {
      type: DataTypes.INTEGER,
    },
    pymt_pro_sprt_supp_amt: {
      type: DataTypes.INTEGER,
    },
    sub_total_support_promo: {
      type: DataTypes.INTEGER,
    },
    sub_total_payable: {
      type: DataTypes.INTEGER,
    },
    supplier_code: {
      type: DataTypes.STRING,
    },
    isactive: {
      type: DataTypes.STRING,
    },
  },
  {
    // Set the view name as the table name
    sequelize,
    tableName: "VMS_SALES_ANALYSIS",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = consSalesAnaylysisList;
