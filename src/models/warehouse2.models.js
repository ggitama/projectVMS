const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class warehouse extends Model {}
warehouse.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		for_interface: {
			type: DataTypes.STRING
		},
		int_code: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		warehouse_code: {
			type: DataTypes.STRING
		},
		warehouse_name: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
	},
	{
		timestamps: false,
		sequelize,
		tableName: 'store_warehouse',
		schema: 'vms'
	}
);

module.exports = warehouse;
