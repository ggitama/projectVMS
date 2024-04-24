const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class sg extends Model {}
sg.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
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
			type: DataTypes.DATE
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		description: {
			type: DataTypes.STRING
		},
		supplier_group_code: {
			type: DataTypes.STRING
		},
		primary_contact: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'supplier_group',
		tableName: 'supplier_group',
		schema: 'vms'
	}
);

module.exports = sg;
