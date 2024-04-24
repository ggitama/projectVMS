const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const dash_inv_draft = sequelize.define('dash_inv_draft',
	{
	// Define fields that match the columns in your view
	count : {
		type: DataTypes.STRING
	},
    id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	purchase_order: {
		type: DataTypes.STRING
	},
	invoice_date: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	},
	status: {
		type: DataTypes.STRING
	},
	delivery_to: {
		type: DataTypes.STRING
	}
    }, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VIEW_DASH_DRAFT_INV',
	schema: 'vms',
	timestamps: false
  });

module.exports = dash_inv_draft;
