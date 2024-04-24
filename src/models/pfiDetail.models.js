const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const pfiDetail = sequelize.define('pfiDetail',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
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
	unit_price: {
		type: DataTypes.INTEGER
	},
	rai_id: {
		type: DataTypes.INTEGER
	},
    received_qty: {
		type: DataTypes.INTEGER
	},
    purchase_order_item: {
		type: DataTypes.STRING
	},
    receiving_advice_item: {
		type: DataTypes.INTEGER
	},
    pfii_id: {
		type: DataTypes.INTEGER
	},
	reconciled: {
		type: DataTypes.INTEGER
	},
	remarks: {
		type: DataTypes.STRING
	},
	pfi: {
		type: DataTypes.INTEGER
	},
	url: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_PFI_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = pfiDetail;
