const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class ccs extends Model {}
ccs.init(
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
		site: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_site',
		tableName: 'cm_agreement_site',
		schema: 'vms'
	}
);

module.exports = ccs;
