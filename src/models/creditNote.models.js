const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const cn = sequelize.define('cn',
	{
	// Define fields that match the columns in your view
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	created_by: {
		type: DataTypes.STRING
	},
	created_on: {
		type: DataTypes.DATE
	},
	last_updated_by: {
		type: DataTypes.STRING
	},
	last_updated_on: {
		type: DataTypes.DATE
	},
	mversion: {
		type: DataTypes.INTEGER
	},
	c4business_unit: {
		type: DataTypes.INTEGER
	},
	return_note_no: {
		type: DataTypes.STRING
	},
	return_reference_date: {
		type: DataTypes.DATE
	},
	return_reference_no: {
		type: DataTypes.STRING
	},
	scr: {
		type: DataTypes.INTEGER
	},
	status: {
		type: DataTypes.STRING
	},
	store_code: {
		type: DataTypes.STRING
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	supplier_id: {
		type: DataTypes.INTEGER
	},
	supplier_registration_no: {
		type: DataTypes.STRING
	},
	supplier_tax_address: {
		type: DataTypes.STRING
	},
	tax_inv_ref_date: {
		type: DataTypes.DATE
	},
	tax_inv_ref_no: {
		type: DataTypes.STRING
	},
	tax_inv_date: {
		type: DataTypes.DATE
	},
	tax_inv_no: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	},
	isactive: {
		type: DataTypes.STRING
	}
  	}, 
  {
	// Set the view name as the table name
		timestamps: false,
		sequelize,
		modelName: 'credit_note',
		tableName: 'credit_note',
		schema: 'vms'
  });

module.exports = cn;
