const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const ViewsInvoiceDetailItem = sequelize.define('invdetailitem',
	{
	// Define fields that match the columns in your view
	nomor_order: {
		type: DataTypes.STRING
	},
	purchase_order: {
		type: DataTypes.STRING
	},
	kode_barang: {
		type: DataTypes.STRING
	},
    kapasitas_barcode: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
    total_qty: {
		type: DataTypes.STRING
	},
    harga_unit: {
		type: DataTypes.STRING
	},
    harga_sebelum_pajak: {
		type: DataTypes.STRING
	},
    harga_setelah_pajak: {
		type: DataTypes.STRING
	},
    persen_pajak: {
		type: DataTypes.STRING
	},
    ppn_bbm: {
		type: DataTypes.STRING
	},
    sub_total: {
		type: DataTypes.STRING

    }
    
    }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_INV_ITEM_DETAIL_',
	schema: 'vms',
	timestamps: false
  });

module.exports = ViewsInvoiceDetailItem;
