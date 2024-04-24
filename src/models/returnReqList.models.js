const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqList = sequelize.define('rReqList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	return_request_number: {
		type: DataTypes.STRING
	},
	rtn_request_date: {
		type: DataTypes.DATE
	},
	store: {
		type: DataTypes.STRING
	},
    departemen: {
		type: DataTypes.STRING
	},
    status: {
		type: DataTypes.STRING
	},
    supplier: {
		type: DataTypes.STRING
	},
    business_unit: {
		type: DataTypes.STRING
	},
    supplier_code: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqList;
