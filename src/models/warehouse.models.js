const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const admwarehouse = sequelize.define('admwarehouse',
	{
	// Define fields that match the columns in your view
	warehouse_code: {
		type: DataTypes.STRING
	},
	warehouse_name: {
		type: DataTypes.STRING
	},
	toko: {
		type: DataTypes.STRING
	},
    int_code: {
		type: DataTypes.STRING
	},
    for_interface: {
		type: DataTypes.STRING
	}
    
    }, {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_WAREHOUSE',
	schema: 'vms',
	timestamps: false
  });

module.exports = admwarehouse;
