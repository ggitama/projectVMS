const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db.js");
const PO = require("./po.models.js");

class invoiceList extends Model {}
invoiceList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    purchase_order: {
      type: DataTypes.STRING,
    },
    supplier_code: {
      type: DataTypes.STRING,
    },
    total_net_amount: {
      type: DataTypes.FLOAT,
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
    revision: {
      type: DataTypes.INTEGER,
    },
    po_id: {
      type: DataTypes.STRING,
    },
    po_no: {
      type: DataTypes.STRING,
    },
    supplier_name: {
      type: DataTypes.STRING,
    },
    store_code: {
      type: DataTypes.STRING,
    },
    delivery_to: {
      type: DataTypes.STRING,
    },
    dept_code: {
      type: DataTypes.STRING,
    },
    business_unit_name: {
      type: DataTypes.STRING,
    },
    tax_serial_number: {
      type: DataTypes.STRING,
    },
    tax_invoice_date: {
      type: DataTypes.DATE,
    },
    harga_sebelum_pajak: {
      type: DataTypes.FLOAT,
    },
    harga_sesudah_pajak: {
      type: DataTypes.FLOAT,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    tableName: "VMS_INV_LIST",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = invoiceList;
