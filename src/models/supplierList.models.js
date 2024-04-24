const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const supplierList = sequelize.define('supplierList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	code: {
		type: DataTypes.INTEGER
	},
	local_name: {
		type: DataTypes.INTEGER
	},
	tax_id: {
		type: DataTypes.STRING
	},
    stop_business_date: {
		type: DataTypes.DATE
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_SUPPLIER_MASTER',
	schema: 'vms',
	timestamps: false
  });

module.exports = supplierList;
