const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const worksheetDetail = sequelize.define('worksheetDetail',
	{
	barcode: {
		type: DataTypes.STRING,
	},
	itemcode: {
		type: DataTypes.STRING
	},
	itemname: {
		type: DataTypes.STRING
	},
    currentpurchaseprice: {
		type: DataTypes.INTEGER
	},
    new_purchase_price: {
		type: DataTypes.INTEGER,
	},
    growth: {
		type: DataTypes.INTEGER
	},
    unitcode: {
		type: DataTypes.INTEGER
	},
	vat: {
		type: DataTypes.STRING
	},
	currentsellingprice: {
		type: DataTypes.INTEGER
	},
    suggested_selling_price: {
		type: DataTypes.INTEGER
	},
	highest_retail_price: {
		type: DataTypes.INTEGER,
	},
    new_selling_price: {
		type: DataTypes.INTEGER
	},
    currentmargin: {
		type: DataTypes.INTEGER
	},
	store_class: {
		type: DataTypes.STRING
	},
	worksheet_number: {
		type: DataTypes.STRING,
		primaryKey: true
	},
    pw_id: {
		type: DataTypes.INTEGER
	},
	swi_id: {
		type: DataTypes.INTEGER
	},
	aksi: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_WORKSHEET_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = worksheetDetail;
