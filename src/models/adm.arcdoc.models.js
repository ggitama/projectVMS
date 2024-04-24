const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const arcdocList = sequelize.define('arcdocList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	created_on: {
		type: DataTypes.DATE
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    store_code: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
	},
    search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_ADM_ARCDOC',
	schema: 'vms',
	timestamps: false
  });

module.exports = arcdocList;
