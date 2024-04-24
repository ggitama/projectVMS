const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const findScc = sequelize.define('findScc',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	contract_code: {
		type: DataTypes.STRING
	},
	contract_name: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	supplier_name: {
		type: DataTypes.STRING
	},
	supplier_negotiator: {
		type: DataTypes.STRING
	},
	position: {
		type: DataTypes.STRING
	},
	email1: {
		type: DataTypes.STRING
	},
	email2: {
		type: DataTypes.STRING
	},
	email3: {
		type: DataTypes.STRING
	},
	phone_number: {
		type: DataTypes.STRING
	},
	ct_name: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_FIND_SCC',
	schema: 'vms',
	timestamps: false
  });

module.exports = findScc;
