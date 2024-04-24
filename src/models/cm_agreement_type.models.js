const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cat extends Model {}
cat.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		agreement_name: {
			type: DataTypes.STRING
		},
		agreement_type: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		updated_date: {
			type: DataTypes.DATE
		},
		created_by: {
			type: DataTypes.STRING
		},
		updated_by: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_type',
		tableName: 'cm_agreement_type',
		schema: 'vms'
	}
);

module.exports = cat;
