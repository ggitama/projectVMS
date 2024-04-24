const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

const consInvList = sequelize.define(
  "consInvList",
  {
    i_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    referensi: {
      type: DataTypes.STRING,
    },
    merchant: {
      type: DataTypes.STRING,
    },
    revisi: {
      type: DataTypes.INTEGER,
    },
    tanggal_ubah: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    toko: {
      type: DataTypes.STRING,
    },
    id_invoice: {
      type: DataTypes.STRING,
    },
    invoice_date: {
      type: DataTypes.DATE,
    },
    business_unit: {
      type: DataTypes.STRING,
    },
    supplier: {
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
    tableName: "VMS_CONS_INV",
    schema: "vms",
    timestamps: false,
  }
);

module.exports = consInvList;
