const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const rarDetail = sequelize.define('rarDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey:true
	},
    line_no: {
		type: DataTypes.INTEGER
	},
    item_code: {
		type: DataTypes.STRING
	},
    sub_code: {
		type: DataTypes.STRING
	},
	unit_code: {
		type: DataTypes.STRING
	},
    capacity: {
		type: DataTypes.STRING
	},
    barcode: {
		type: DataTypes.STRING
	},
	item_name: {
		type: DataTypes.STRING
	},
	sub_code_name: {
		type: DataTypes.STRING
	},
    free_qty_insku: {
		type: DataTypes.INTEGER
	},
    order_qty_insku: {
		type: DataTypes.INTEGER
	},
	rri_id: {
		type: DataTypes.INTEGER
	},
    is_revised: {
		type: DataTypes.STRING
	},
    received_qty: {
		type: DataTypes.INTEGER
	},
	remarks: {
		type: DataTypes.STRING
	},
	is_accepted: {
		type: DataTypes.STRING
	},
	receiving_advice_response: {
		type: DataTypes.INTEGER
	},
	url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_RAR_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = rarDetail;
