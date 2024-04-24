const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rReqResponseInfo = sequelize.define('rReqResponseInfo',
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
    departemen: {
		type: DataTypes.STRING
	},
    store: {
		type: DataTypes.STRING
	},
    pick_up_location: {
		type: DataTypes.STRING
	},
    supplier_name: {
		type: DataTypes.STRING
	},
	supplier_code: {
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
    rr_id: {
		type: DataTypes.STRING
	},
		url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RETUR_REQUEST_RESPONSE_INFO',
	schema: 'vms',
	timestamps: false
  });

module.exports = rReqResponseInfo;
