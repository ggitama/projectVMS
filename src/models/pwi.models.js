const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const pwi = sequelize.define('pwi',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.STRING,
		primaryKey:true,
		autoIncrement: true
	},
	created_by: {
		type: DataTypes.STRING
	},
	created_on: {
		type: DataTypes.DATE
	},
    last_updated_by: {
		type: DataTypes.STRING
	},
    last_updated_on: {
		type: DataTypes.DATE,
	},
    mversion: {
		type: DataTypes.INTEGER
	},
    barcode: {
		type: DataTypes.STRING
	},
	deptcode: {
		type: DataTypes.STRING
	},
	deptname: {
		type: DataTypes.STRING
	},
    itemcode: {
		type: DataTypes.STRING
	},
	itemname: {
		type: DataTypes.STRING
	},
	storename: {
		type: DataTypes.STRING
	},
    currentpurchaseprice: {
		type: DataTypes.FLOAT
	},
    growth: {
		type: DataTypes.FLOAT,
	},
    new_purchase_price: {
		type: DataTypes.FLOAT
	},
    suppliercode: {
		type: DataTypes.STRING
	},
	worksheet: {
		type: DataTypes.STRING
	},
	is_approved_npp: {
		type: DataTypes.CHAR
	},
  	}, 
  {
	sequelize,
	tableName: 'pp_worksheet_item',
	schema: 'vms',
	timestamps: false
  });

module.exports = pwi;
