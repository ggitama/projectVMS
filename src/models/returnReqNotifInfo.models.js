const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqNotifInfo = sequelize.define('rReqNotifInfo',
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
    status: {
		type: DataTypes.STRING
	},
    notification: {
		type: DataTypes.STRING
	},
    read_by: {
		type: DataTypes.STRING
	},
    read_date: {
		type: DataTypes.DATE
	},
	action_by: {
		type: DataTypes.STRING
	},
	action_date: {
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
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST_NOTIFICATION_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqNotifInfo;
