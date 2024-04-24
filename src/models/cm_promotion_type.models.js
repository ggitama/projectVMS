const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cpt extends Model {}
cpt.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		created_date: {
			type: DataTypes.DATE
		},
		promotion_name: {
			type: DataTypes.STRING
		},
		promotion_type: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_promotion_type',
		tableName: 'cm_promotion_type',
		schema: 'vms'
	}
);

module.exports = cpt;
