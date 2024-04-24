const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class saLit extends Model {}
saLit.init(
	{
		id: {
			type: DataTypes.STRING,
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
		dept_code: {
			type: DataTypes.STRING
		},
		sales_date: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		submit_date: {
			type: DataTypes.DATE
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier: {
			type: DataTypes.INTEGER
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'sa_lit',
		tableName: 'sa_lit',
		schema: 'vms'
	}
);

module.exports = saLit;
