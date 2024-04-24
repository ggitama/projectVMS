const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const trfKwitansiList = sequelize.define('trfKwitansiList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	nomor_kwitansi: {
		type: DataTypes.STRING
	},
	created_date: {
		type: DataTypes.DATE
	},
    download_date: {
		type: DataTypes.DATE
	},
    supplier_code: {
		type: DataTypes.STRING
	},
	supplier_name: {
		type: DataTypes.STRING
	},
    business_unit: {
		type: DataTypes.STRING
	},
    supplier: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_TRF_KWITANSI',
	schema: 'vms',
	timestamps: false
  });

module.exports = trfKwitansiList;
