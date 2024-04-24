const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_user_item extends Model {}
cm_user_item.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_date: {
			type: DataTypes.DATE
		},
		family_filter_code: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		},
		username: {
			type: DataTypes.STRING
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
		modelName: 'cm_user_to_item',
		tableName: 'cm_user_to_item',
		schema: 'vms'
	}
);

module.exports = cm_user_item;
