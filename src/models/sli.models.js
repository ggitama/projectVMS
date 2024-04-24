const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const sli = sequelize.define('sli',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
	},
	line_no: {
		type: DataTypes.INTEGER
	},
	margin: {
		type: DataTypes.INTEGER
	},
    margin_remarks: {
		type: DataTypes.STRING
	},
    qty: {
		type: DataTypes.FLOAT,
	},
    qty_remarks: {
		type: DataTypes.STRING
	},
    selling_price: {
		type: DataTypes.INTEGER
	},
	selling_price_remarks: {
		type: DataTypes.STRING
	},
	sa_litigation: {
		type: DataTypes.STRING
	},
    sales_analysis: {
		type: DataTypes.INTEGER
	}
  	}, 
  {
	sequelize,
	tableName: 'sa_lit_item',
	schema: 'vms',
	timestamps: false
  });

module.exports = sli;
