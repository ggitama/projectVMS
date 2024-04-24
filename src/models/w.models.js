const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const w = sequelize.define('w',
	{
	// Define fields that match the columns in your view
	worksheet_number: {
		type: DataTypes.STRING,
		primaryKey:true,
		autoIncrement: true
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
		type: DataTypes.DATE,
	},
    mversion: {
		type: DataTypes.INTEGER
	},
    city: {
		type: DataTypes.STRING
	},
	dept_code: {
		type: DataTypes.STRING
	},
	effective_date: {
		type: DataTypes.DATE
	},
    family_code: {
		type: DataTypes.STRING
	},
	grp_family_code: {
		type: DataTypes.STRING
	},
	is_retracted: {
		type: DataTypes.CHAR
	},
    sp_effective_date: {
		type: DataTypes.DATE
	},
    status: {
		type: DataTypes.STRING,
	},
    sub_family_code: {
		type: DataTypes.STRING
	},
    submission_date: {
		type: DataTypes.DATE
	},
	supplier_code: {
		type: DataTypes.STRING
	},
	supplier_name: {
		type: DataTypes.STRING
	},
    approved_date: {
		type: DataTypes.DATE
	},
	temp_remarks: {
		type: DataTypes.STRING
	},
    is_logistics: {
		type: DataTypes.CHAR
	},
  	}, 
  {
	sequelize,
	tableName: 'worksheet',
	schema: 'vms',
	timestamps: false
  });

module.exports = w;
