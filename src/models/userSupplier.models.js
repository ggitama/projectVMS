const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const userSupplierList = sequelize.define('userSupplierList',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	username: {
		type: DataTypes.INTEGER
	},
	email: {
		type: DataTypes.INTEGER
	},
	enabled: {
		type: DataTypes.STRING
	},
    last_login: {
		type: DataTypes.DATE
	},
	additional_email: {
		type: DataTypes.STRING
	},
	code: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING
	},
	role_id: {
		type: DataTypes.INTEGER
	},
	address: {
		type: DataTypes.STRING
	},
	contact_person: {
		type: DataTypes.STRING
	},
	digital_inv_flag: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_USER_SUPPLIER',
	schema: 'vms',
	timestamps: false
  });

module.exports = userSupplierList;
