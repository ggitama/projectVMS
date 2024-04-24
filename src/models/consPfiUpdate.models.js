const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');


const consPfiUpdate = sequelize.define('consPfiUpdate',
	{
		cdt: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		revision: {
			type: DataTypes.STRING
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.STRING
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		approved_by: {
			type: DataTypes.DATE
		},
		approved_date: {
			type: DataTypes.STRING
		},
		business_unit_address: {
			type: DataTypes.STRING
		},
		c4business_unit: {
			type: DataTypes.STRING
		},
		business_unit_registration: {
			type: DataTypes.STRING
		},
		business_unit_name: {
			type: DataTypes.STRING
		},
		con_margin_rate: {
			type: DataTypes.STRING
		},
		con_margin_value: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.DATE
		},
		dept_name: {
			type: DataTypes.STRING
		},
		first_approver: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		total_amount: {
			type: DataTypes.FLOAT
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		sequelize,
		tableName: 'vms_con_pfi',
		schema: 'vms',
		timestamps: false
	},
);

module.exports = consPfiUpdate;