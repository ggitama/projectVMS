const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const suppRegDetail1 = sequelize.define('suppRegDetail1',
	{
	// Define fields that match the columns in your view
	s_id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	sd_id: {
		type: DataTypes.INTEGER
	},
	email_primary: {
		type: DataTypes.STRING
	},
	phone_primary: {
		type: DataTypes.STRING
	},
	fax_primary: {
		type: DataTypes.STRING
	},
	register_date: {
		type: DataTypes.DATE
	},
	b2b: {
		type: DataTypes.STRING
	},
	local_name: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	english_name: {
		type: DataTypes.STRING
	},
	tax_id: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
	sequelize,
	tableName: 'VMS_REG_SUPPLIER_DETAIL',
	schema: 'vms',
	timestamps: false
  });

module.exports = suppRegDetail1;
