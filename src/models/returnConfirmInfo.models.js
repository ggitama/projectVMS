const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rConfirmInfo = sequelize.define('rConfirmInfo',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	rtn_confirmation_number: {
		type: DataTypes.STRING
	},
	rtn_confirmation_date: {
		type: DataTypes.DATE
	},
    departemen: {
		type: DataTypes.STRING
	},
    store: {
		type: DataTypes.STRING
	},
    picked_up_date: {
		type: DataTypes.STRING
	},
    name: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
    phone: {
		type: DataTypes.STRING
	},
    fax: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_CONFIRMATION_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = rConfirmInfo;
