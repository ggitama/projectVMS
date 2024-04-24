const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cci extends Model {}
cci.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		agreement_code: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		island: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_island',
		tableName: 'cm_agreement_island',
		schema: 'vms'
	}
);

module.exports = cci;
