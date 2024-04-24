const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqResponseDetail = sequelize.define('rReqResponseDetail',
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
    keterangan_1: {
		type: DataTypes.STRING
	},
	rrir_id: {
		type: DataTypes.INTEGER
	},
	url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST_RESPONSE_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqResponseDetail;
