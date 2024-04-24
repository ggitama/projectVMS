const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const cnDetail = sequelize.define('cnDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	cn_id: {
		type: DataTypes.INTEGER
	},
	no: {
		type: DataTypes.STRING
	},
	barcode: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
    total_qty: {
		type: DataTypes.INTEGER
	},
    harga_unit: {
		type: DataTypes.FLOAT
	},
    harga_sebelum_pajak: {
		type: DataTypes.FLOAT
	},
    pajak: {
		type: DataTypes.STRING
	},
    harga_sesudah_pajak: {
		type: DataTypes.FLOAT
	},
    sub_total_return: {
		type: DataTypes.FLOAT
	},
    ppn_return: {
		type: DataTypes.FLOAT
	},
    total_amount: {
		type: DataTypes.FLOAT
	},
		isactive: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_CN_DETAIL1',
	schema: 'vms',
	timestamps: false
  });

module.exports = cnDetail;
