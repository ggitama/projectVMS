const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const dash_po_new = sequelize.define('dash_po_new',
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
	order_date: {
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

    }, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'view_dash_new_po',
	schema: 'vms',
	timestamps: false
  });

module.exports = dash_po_new;
