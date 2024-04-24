const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const ViewsInvoiceDetailItem = sequelize.define('invdetailitem',
	{
	// Define fields that match the columns in your view
	poi_id: {
		type: DataTypes.INTEGER
	},
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	kode_barang: {
		type: DataTypes.STRING
	},
	sub_code: {
		type: DataTypes.STRING
	},
	unit_code: {
		type: DataTypes.STRING
	},
    kapasitas_barcode: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
	sub_code_name_local: {
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
    harga_sesudah_pajak: {
		type: DataTypes.STRING
	},
    pajak: {
		type: DataTypes.STRING
	},
    ppn_bm: {
		type: DataTypes.STRING
	},
    koreksi_harga_beli: {
		type: DataTypes.STRING
    },
    koreksi_ppn: {
		type: DataTypes.STRING
    },
    pajak_barang_mewah: {
		type: DataTypes.STRING
    },
    nomor_order: {
		type: DataTypes.STRING
    },
    ii_id: {
		type: DataTypes.INTEGER
    },
    url: {
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
