const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class store extends Model {}
store.init(
	{
		store_idx: {
			type: DataTypes.STRING,
			primaryKey: true
			// autoIncrement: true
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
		name: {
			type: DataTypes.STRING
		},
		storegln: {
			type: DataTypes.STRING
		},
		mversion: {
			type: DataTypes.STRING
		},
		c4business_unit: {
			type: DataTypes.STRING
		},
		logistic_flag: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'store',
		tableName: 'store',
		schema: 'vms'
	}
);

module.exports = store;
