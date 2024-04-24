const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_user extends Model {}
cm_user.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_date: {
			type: DataTypes.DATE
		},
		departement: {
			type: DataTypes.STRING
		},
		division: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		name_pic: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		role_code: {
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
		modelName: 'cm_user',
		tableName: 'cm_user',
		schema: 'vms'
	}
);

module.exports = cm_user;
