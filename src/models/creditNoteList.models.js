const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const cnList = sequelize.define('cnList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	return_number: {
		type: DataTypes.STRING
	},
	return_date: {
		type: DataTypes.DATE
	},
    business_unit: {
		type: DataTypes.STRING
	},
    no_seri_pajak: {
		type: DataTypes.STRING
	},
    tanggal_faktur_pajak: {
		type: DataTypes.DATE
	},
    store: {
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
	tableName: 'VMS_CN',
	schema: 'vms',
	timestamps: false
  });

module.exports = cnList;
