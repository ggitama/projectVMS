const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class ccc extends Model {}
ccc.init(
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
		city: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement_city',
		tableName: 'cm_agreement_city',
		schema: 'vms'
	}
);

module.exports = ccc;
