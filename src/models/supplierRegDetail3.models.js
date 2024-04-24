const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const suppRegDetail3 = sequelize.define('suppRegDetail3',
	{
	// Define fields that match the columns in your view
	id_accountuser: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	id_supp_contact: {
		type: DataTypes.INTEGER
	},
	s_id: {
		type: DataTypes.INTEGER
	},
	first_name: {
		type: DataTypes.STRING
	},
	last_name: {
		type: DataTypes.STRING
	},
	username: {
		type: DataTypes.STRING
	},
	account_enable: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_REG_SUPPLIER_DETAIL3',
	schema: 'vms',
	timestamps: false
  });

module.exports = suppRegDetail3;
