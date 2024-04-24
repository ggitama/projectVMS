const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const suppRegDetail2 = sequelize.define('suppRegDetail2',
	{
	// Define fields that match the columns in your view
	vs_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	s_id: {
		type: DataTypes.INTEGER
	},
	department: {
		type: DataTypes.STRING
	},
	contact_person_md: {
		type: DataTypes.STRING
	},
	phone_md: {
		type: DataTypes.STRING
	},
	address_md: {
		type: DataTypes.STRING
	},
	suppliergln_md: {
		type: DataTypes.STRING
	},
	fax_md: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_REG_SUPPLIER_DETAIL2',
	schema: 'vms',
	timestamps: false
  });

module.exports = suppRegDetail2;
