const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const prdInfo = sequelize.define('prdInfo',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	atas_nama_pengirim: {
		type: DataTypes.STRING
	},
	nomor_rekening_pengirim: {
		type: DataTypes.STRING
	},
    nama_bank_pengirim: {
		type: DataTypes.STRING
	},
    alamat_pengirim: {
		type: DataTypes.STRING
	},
    cabang_pengirim: {
		type: DataTypes.STRING
	},
    payment_reference: {
		type: DataTypes.STRING
	},
	tanggal_pembayaran: {
		type: DataTypes.DATE
	},
	atas_nama_penerima: {
		type: DataTypes.STRING
	},
    nomor_rekening_penerima: {
		type: DataTypes.STRING
	},
    nama_bank_penerima: {
		type: DataTypes.STRING
	},
    alamat_penerima: {
		type: DataTypes.STRING
	},
    cabang_penerima: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PAYMENT_REFERENCE_D_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = prdInfo;
