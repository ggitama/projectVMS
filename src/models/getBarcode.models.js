const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const getBarcode = sequelize.define('getBarcode',
	{
	store_code: {
		type: DataTypes.STRING,
	},
	barcode: {
		type: DataTypes.STRING,
	},
	itemname: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	dept_code: {
		type: DataTypes.STRING
	},
	currentpurchaseprice: {
		type: DataTypes.STRING
	},
	new_purchase_price: {
		type: DataTypes.STRING
	},
	worksheet_number: {
		type: DataTypes.STRING,
		primaryKey:true
	},
	cari: {
		type: DataTypes.STRING,
	},
	supplier_code: {
		type: DataTypes.STRING,
	},
	supplier_name: {
		type: DataTypes.STRING,
	},
	pw_id: {
		type: DataTypes.INTEGER,
	},
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_GET_BARCODE',
	schema: 'vms',
	timestamps: false
  });

module.exports = getBarcode;
