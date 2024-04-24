const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqNotifList = sequelize.define('rReqNotifList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	return_request_number: {
		type: DataTypes.STRING
	},
	request_created_date: {
		type: DataTypes.DATE
	},
	supplier: {
		type: DataTypes.STRING
	},
    notification: {
		type: DataTypes.STRING
	},
    read_date: {
		type: DataTypes.DATE
	},
    read_by: {
		type: DataTypes.STRING
	},
    action_date: {
		type: DataTypes.DATE
	},
    action_by: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
	},
	store: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST_NOTIFICATION',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqNotifList;
