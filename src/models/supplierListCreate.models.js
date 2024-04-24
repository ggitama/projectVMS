const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const supplierListCreate = sequelize.define('supplierListCreate',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	code: {
		type: DataTypes.INTEGER
	},
	nama: {
		type: DataTypes.INTEGER
	},
	search: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_Create_Supp_List',
	schema: 'vms',
	timestamps: false
  });

module.exports = supplierListCreate;
