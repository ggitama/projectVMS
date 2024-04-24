const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class department extends Model {}
department.init(
	{
		code_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		local_name: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		last_update: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'department',
		tableName: 'department',
		schema: 'vms'
	}
);

module.exports = department;
