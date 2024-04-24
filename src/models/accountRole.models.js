const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class accountRole extends Model {}
accountRole.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'account_role',
		tableName: 'account_role',
		schema: 'vms'
	}
);

module.exports = accountRole;
