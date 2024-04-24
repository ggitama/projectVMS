const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cct extends Model {}
cct.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		contract_name: {
			type: DataTypes.STRING
		},
		contract_type: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_contract_type',
		tableName: 'cm_contract_type',
		schema: 'vms'
	}
);

module.exports = cct;
