const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const dash_pfi_new = sequelize.define('dash_pfi_new',
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
	pro_forma_invoice_date: {
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
	tableName: 'VIEW_DASH_NEW_PFI',
	schema: 'vms',
	timestamps: false
  });

module.exports = dash_pfi_new;
