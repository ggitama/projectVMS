const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_coverage extends Model {}
cm_coverage.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		coverage_city: {
			type: DataTypes.STRING
		},
		coverage_island: {
			type: DataTypes.STRING
		},
		coverage_province: {
			type: DataTypes.STRING
		},
		coverage_site: {
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
		modelName: 'cm_coverage',
		tableName: 'cm_coverage',
		schema: 'vms'
	}
);

module.exports = cm_coverage;
