const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_category extends Model {}
cm_category.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		category: {
			type: DataTypes.STRING
		},
		category_description: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		departement: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_category',
		tableName: 'cm_category',
		schema: 'vms'
	}
);

module.exports = cm_category;
