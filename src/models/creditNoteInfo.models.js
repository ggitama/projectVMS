const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const cnInfo = sequelize.define('cnInfo',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	tax_serial_number: {
		type: DataTypes.STRING
	},
	tax_inv_date: {
		type: DataTypes.STRING
	},
	return_number: {
		type: DataTypes.DATE
	},
    return_date: {
		type: DataTypes.STRING
	},
    store_code: {
		type: DataTypes.STRING
	},
    nama_perusahaan: {
		type: DataTypes.DATE
	},
    alamat_perusahaan: {
		type: DataTypes.STRING
	},
    npwp: {
		type: DataTypes.STRING
	},
    nama_perusahan_supplier: {
		type: DataTypes.DATE
	},
    npwp_supplier: {
		type: DataTypes.STRING
	},
    alamat_perusahaan_supplier: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
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
	tableName: 'VMS_CN_INFO1',
	schema: 'vms',
	timestamps: false
  });

module.exports = cnInfo;
