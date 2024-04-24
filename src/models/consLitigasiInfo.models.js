const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consLitigasiInfo = sequelize.define('consLitigasiInfo',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	store: {
		type: DataTypes.INTEGER
	},
    department: {
		type: DataTypes.STRING
	},
    sales_date: {
		type: DataTypes.DATE
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
    supplier_phone: {
		type: DataTypes.STRING
	},
    supplier_fax: {
		type: DataTypes.STRING
	},
		status: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ANALISIS_PENJUALAN_LIT_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = consLitigasiInfo;
