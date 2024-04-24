const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rConfirmDetail = sequelize.define('rConfirmDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	no: {
		type: DataTypes.INTEGER
	},
	item_code: {
		type: DataTypes.STRING
	},
    nama_barang: {
		type: DataTypes.STRING
	},
    barcode: {
		type: DataTypes.STRING
	},
    qty_dikembalikan: {
		type: DataTypes.INTEGER
	},
    harga_unit: {
		type: DataTypes.INTEGER
	},
	nilai_pengembalian: {
		type: DataTypes.INTEGER
	},
    keterangan: {
		type: DataTypes.STRING
	},
    terima: {
		type: DataTypes.STRING
	},
    total_harga: {
		type: DataTypes.STRING
	},
    id_rr: {
		type: DataTypes.INTEGER
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_CONFIRMATION_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = rConfirmDetail;
