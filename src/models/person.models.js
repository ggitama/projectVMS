const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class person extends Model {}
person.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		first_name: {
			type: DataTypes.STRING
		},
		last_name: {
			type: DataTypes.STRING
		},
		middle_name: {
			type: DataTypes.STRING
		},
		title: {
			type: DataTypes.STRING
		},
		account_user: {
			type: DataTypes.INTEGER
		},
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'person',
		tableName: 'person',
		schema: 'vms'
	}
);

module.exports = person;
