const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class ccp extends Model {}
ccp.init(
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
		province: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_province',
		tableName: 'cm_agreement_province',
		schema: 'vms'
	}
);

module.exports = ccp;
