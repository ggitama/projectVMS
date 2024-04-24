const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const dash_rar_aa2 = sequelize.define('dash_rar_aa2',
	{
	// Define fields that match the columns in your view
	count : {
		type: DataTypes.STRING
	},
    id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	url: {
		type: DataTypes.STRING
	},
	receiving_advice_date: {
		type: DataTypes.STRING
	},
	delivery_to: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	purchase_order: {
		type: DataTypes.STRING
	},
    }, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VIEW_DASH_DRAFT_RAR2',
	schema: 'vms',
	timestamps: false
  });

module.exports = dash_rar_aa2;
