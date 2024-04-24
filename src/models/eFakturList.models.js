const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const eFakturList = sequelize.define('eFakturList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	namafile: {
		type: DataTypes.STRING
	},
	nomor_seri_pajak: {
		type: DataTypes.STRING
	},
	upload_date: {
		type: DataTypes.DATE
	},
    download_date: {
		type: DataTypes.DATE
	},
    status: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    supplier: {
		type: DataTypes.STRING
	},
    business_unit: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_E-FAKTUR',
	schema: 'vms',
	timestamps: false
  });

module.exports = eFakturList;
