const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class esd extends Model {}
esd.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
			// autoIncrement: true
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		department: {
			type: DataTypes.STRING
		},
		employee: {
			type: DataTypes.INTEGER
		},
		store: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'employee_store_department',
		tableName: 'employee_store_department',
		schema: 'vms'
	}
);

module.exports = esd;
