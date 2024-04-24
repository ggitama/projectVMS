const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class sgmember extends Model {}
sgmember.init(
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
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier: {
			type: DataTypes.INTEGER
		},
		supplier_group: {
			type: DataTypes.INTEGER
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'supplier_group_member',
		tableName: 'supplier_group_member',
		schema: 'vms'
	}
);

module.exports = sgmember;
